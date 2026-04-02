import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import { CaptainModel } from "../models/captain.model.js";
import { RideModel } from "../models/ride.model.js";

const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            
            console.log(location)
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else  {
            throw new ApiError(402, "Unable to fetch Coordinates");
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(401, "Error in maps.service");
    }
}

const getDistanceTime = async(origin, destination) => {
    if(!origin || !destination) {
        throw new ApiError(403, "Origin and destination are required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origins)}&key=${apiKey}`

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new ApiError('No routes found');
            }

            return response.data.rows[0].elements[0];
        } else {
            throw new ApiError(403, `unavle to fetch distance and time`)
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getAutoCompleteSuggestions = async(input) => {
    if(!input || input.trim().length < 3) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new ApiError(401, 'Unable to fetch suggestions');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// const getCaptainInTheRadius = async(ltd , lng, radius) => {
//     const captains = await CaptainModel.find({
//         location: {
//             $geoWithin: {
//                 $centerSphere: [[ltd, lng], radius/6371]
//             }
//         }
//     })

//     return captains
// }

const getCaptainInTheRadius = async (lat, lng, radius) => {
    const captains = await CaptainModel.find({
        "location.ltd": {
            $gte: lat - radius / 111,
            $lte: lat + radius / 111
        },
        "location.lng": {
            $gte: lng - radius / 111,
            $lte: lng + radius / 111
        }
    });

    return captains;
};


export { getAddressCoordinate , 
    getDistanceTime, 
    getAutoCompleteSuggestions, 
    getCaptainInTheRadius,
}