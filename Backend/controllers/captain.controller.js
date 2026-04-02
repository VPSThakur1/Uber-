import { validationResult } from "express-validator";
import { CaptainModel } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";

const registerCaptain = asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        throw new ApiError(400, JSON.stringify(error.array()))
    }

    const {fullName, email, password, vehicle} = req.body;

    const isCaptainAlreadyExisted = await CaptainModel.findOne({ email });

    if(isCaptainAlreadyExisted) {
        throw new ApiError(400, "Captain Already existed")
    }

    const hashedPassword = await CaptainModel.hashPassword(password);

    const captain = await createCaptain({
        // firstName : fullName.firstName,
        // lastName : fullName.lastName,
        // email,
        // password : hashedPassword,
        // color: vehicle.color,
        // plate: vehicle.plate,
        // capacity: vehicle.capacity,
        // vehicleType: vehicle.vehicleType

        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    })
    // const captain = await createCaptain(req.body)

    const token = captain.generateAccessToken();

    return res.status(200).json(
        new ApiResponse(200, {token, captain} , "Captain created Successfully")
    )
})

const loginCaptain = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        // return res.status(400).json({errors : errors.array() });
        throw new ApiError(400, errors.array()[0].msg);
    }

    const {email , password} = req.body;
    console.log(req.body.email);

    const captain = await CaptainModel.findOne( {email}).select('+password')

    if(!captain) {
        throw new ApiError(402, "Cannot find captain / invalid email or password")
    }

    const isMatch = await captain.isPasswordCompare(password);

    if(!isMatch) {
        throw new ApiError(403, "PASSWORD WRONG")
    }

    const token = captain.generateAccessToken();
    res.cookie('token', token) ;

    return res.status(200).json(
        new ApiResponse(200,{captain, token}, "Captain Logged in Successfully")
    )
})

const getCaptainProfile = asyncHandler(async(req, res, next) => {
    return res.status(200).json(
        new ApiResponse(200, req.captain, "user")
    )
})

const logoutCaptain = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if(!token) {
        throw new ApiError(400, "TOken not found")
    }

    await BlacklistToken.create({
        token,  
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // match JWT expiry
    })

    res.clearCookie('token');
    return res.status(200).json(
        new ApiResponse(200, "logout out successfully")
    )
})

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain }