import { validationResult } from "express-validator";
import { createRide, endRide, getFare, startRide } from "../services/ride.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { getCaptainInTheRadius, getAddressCoordinate} from "../services/maps.service.js"
import { sendMessageToSocketId } from "../socket.js";
import { RideModel } from "../models/ride.model.js";
import { confirmRide } from "../services/ride.service.js";


const CreateRide = asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()})
    }
    
    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRide({user : req.user._id, pickup, destination, vehicleType });
        // res.status(201).json(
        //     new ApiResponse(201, ride, "Success Create Ride controller")
        // )

        const pickupCoordinates = await getAddressCoordinate(pickup);
        console.log(pickupCoordinates)

        const captainInRadius = await getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10)
        ride.otp = ""
        console.log("Captain In Radius:", captainInRadius);

        const rideWithUser = await RideModel.findOne({ _id: ride._id}).populate('user');

        captainInRadius.map(captain => {
            console.log(captain, ride)

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

        return res.status(201).json(
            new ApiResponse(201, ride, "Success Create Ride controller")
        );
    } catch (err) {
        return res.status(500).json({ message : err.message});
    }
})

const GetFare = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()})
    }

    const {pickup, destination} = req.query;
    try {
        const fare = await getFare(pickup, destination);
        return res.status(201).json(
            new ApiResponse(201, fare, "Fare calculated")
        )
    } catch (error) {
        throw new ApiError(401, "Error in controller GetFare")
    }
})

const ConfirmRide = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    console.log("ConfirmRide Validation Errors:", errors.array());
    return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
    });
}

    const { rideId } = req.body;

    try {
        const ride = await confirmRide({rideId, captain: req.captain})

        console.log("req.body:", req.body)
        console.log("rideId from body:", req.body.rideId)
        console.log("Confirmed Ride:", ride);
        console.log("Ride User:", ride.user);
        console.log("Ride Captain:", ride.captain);
        console.log("User socketId:", ride.user?.socketId);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(
            new ApiResponse(200, ride, 'Suuceess of Confirm ride controller')
        )
    } catch(err) {
        console.log(err)
        throw new ApiError(401, 'Eror')
    }
})

const StartRide = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    console.log("ConfirmRide Validation Errors:", errors.array());
    return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
    })
    }

    const {rideId, otp} = req.query;

    console.log("StartRide req.query:", req.query);
    console.log("rideId:", rideId);
    console.log("otp:", otp);
    console.log("req.captain:", req.captain);

    try {
        const ride = await startRide({rideId, otp, captain: req.captain})

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
})

const EndRide = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("ConfirmRide Validation Errors:", errors.array());
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array()
        })
    }

    const { rideId } = req.body;

    try {
        const ride = await endRide({rideId, captain: req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

export { CreateRide, GetFare, ConfirmRide, StartRide, EndRide }