import { Router } from "express";
import { body, query } from "express-validator";
import { CreateRide, GetFare, ConfirmRide, StartRide, EndRide } from "../controllers/ride.controller.js";
import { verifycaptainJWT, verifyJWT } from "../middlewares/auth.middleware.js";


const routerR = Router()

routerR.post('/create', verifyJWT,
    body('pickup').isString().isLength({ min : 3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min : 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle type'),
    CreateRide
)

routerR.get('/get-fare', 
    verifyJWT,
    query('pickup').isString().isLength({min: 3}).withMessage("Pickup less in size"),
    query('destination').isString().isLength({min: 3}).withMessage("Destination less in size"),
    GetFare
)

routerR.post('/confirm',
    verifycaptainJWT,
    body('rideId').isMongoId().withMessage("Invale ride id"),
    // body('otp').isString({min:6, max:6}).withMessage("OTP should be of 6 digit"),
    ConfirmRide
)

routerR.get('/start-ride',
    verifycaptainJWT,
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    query('otp').isLength({min:6, max:6}).withMessage("OTP should be of 6 digit"),
    StartRide
)

routerR.post('/end-ride',
    verifycaptainJWT,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    EndRide
)

export default routerR;