import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    // const submitHandler = async(e) => {
    //     e.preventDefault()

    //     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
    //         params: {
    //             rideId: props.ride._id,
    //             otp: otp
    //         },
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })

    //     if (response.status === 200) {
    //         props.setConfirmRidePopupPanel(false)
    //         props.setRidePopupPanel(false)
    //         navigate('/captain-riding', { state: { ride: props.ride } })
    //     }
    // }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            console.log("Ride in popup:", props.ride);
            console.log("Ride ID:", props.ride?._id);
            console.log("OTP:", otp);

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: props.ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            console.log("Start Ride Response:", response.data);

            if (response.status === 200) {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
                console.log("Navigating to /captain-riding")
                navigate('/captain-riding', { state: { ride: props.ride } });
            }
        } catch (error) {
            console.log("Start Ride Error:", error.response?.data || error.message);
        }
    };

  return (
    <div className='h-screen'>
        <h5 onClick={() => {
            props.setRidePopUpPanel(false)
        }}
          className='p-1 text-center w-[93%] absolute top-0'><i className="text-2xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm this Ride to Start</h3>

        <div className='flex items-center justify-between bg-yellow-300 rounded-2xl p-3 mt-4'>
            <div className='flex items-center gap-3 '>
                <img className='w-12 h-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIyTZVXyb90oYHRiiX6YkNUc0CnzGwWjI3Q&s" alt="" />
                <h2 className='text-lg font-medium capitalize'>{props.ride?.user?.fullName.firstName}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>

        <div className='flex gap-5 flex-col items-center justify-between'>
            
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-xl ri-map-pin-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-xl ri-map-pin-user-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-xl ri-hand-coin-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹193.20</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
                
            </div>

            <div className='w-full mt-6 gap-5'>
                <form onSubmit={submitHandler}>

                    <input value={otp} onChange={(e) => {
                        setOtp(e.target.value)
                    }} type="text" placeholder='otp daal na'
                    className='bg-[#eee] font-mono px-6 py-4 text-lg rounded-xl w-full mt-3'/>


                    <button type='submit'
                    className='w-full flex justify-center text-lg mt-5 text-white p-2 rounded-xl bg-green-500 font-semibold'>Confirm Ride</button>

                    <button onClick={() => {
                        props.setConfirmRidePopUpPanel(false)
                        props.setRidePopUpPanel(false)
                    }}
                    className='w-full text-lg mt-5 text-gray-700 p-2 rounded-xl bg-red-500 font-semibold'>Cancel Ride</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default ConfirmRidePopUp