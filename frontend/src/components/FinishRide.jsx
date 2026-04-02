import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

    const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        if(response.status === 200) {
            // props.setFinishRidePanel(false)
            // props.setRidePopupPanel(false)
            navigate('/captain-home')
        }
    }

  return (
    <div className='h-screen'>
        <h5 onClick={() => {
            props.setFinishRidePanel(false)
        }}
          className='p-1 text-center w-[93%] absolute top-0'><i className="text-2xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

        <div className='flex border-yellow-400 border-2 items-center justify-between rounded-2xl p-4 mt-4'>
            <div className='flex  items-center gap-3 rounded-lg mt-2'>
                <img className='w-12 h-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIyTZVXyb90oYHRiiX6YkNUc0CnzGwWjI3Q&s" alt="" />
                <h2 className='text-lg font-medium'>{props.ride?.user.fullName.firstName}</h2>
            </div>
            <h5 className='text-lg font-semibold'>{props.ride?.distance || 2.2} KM</h5>
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
                        <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
                
            </div>

            <div className='w-full mt-6 gap-5'>
                <button onClick={endRide}
                 className='w-full flex justify-center text-lg mt-5 text-white p-2 rounded-xl bg-green-500 font-semibold'>Finish Ride</button>

                <p className='text-red-500 text-center mt-10 text-xs'>Click on finish ride button if ride completed</p>
            </div>
        </div>

    </div>
  )
}

export default FinishRide