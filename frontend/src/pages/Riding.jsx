import React, {useEffect, useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContet'
import { Navigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = (props) => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()
    console.log("Ride Data:", ride)

    socket.on('ride-ended', () => {
        navigate('/home')
    })

  return (
    
    <div className='h-screen'>
        <Link to={'/home'}  className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-xl font-bold ri-home-5-line"></i>
        </Link>

        <div className='h-1/2'>
            <LiveTracking />
        </div>

        <div className='h-1/2 p-4'>
            <div className='flex items-center justify-between'>
             <img className='h-12'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s" alt="" />
            <div className='text-right'>
                
                <h2 className='text-xl font-medium capitalize'>{ride?.captain?.fullName?.firstName}</h2>
                <h4 className='text-lg font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                <p className='text-sm text-gray-600'>lord alto</p>
            </div>

        </div>

        <div className='flex gap-5 flex-col items-center justify-between'>
            
            <div className='w-full mt-5'>

                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-xl ri-map-pin-user-line"></i>
                    <div>
                        <h3 className='text-lg font-medium capitalize'>{ride?.status}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-xl ri-hand-coin-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
                
            </div>
        </div>
            <button className='w-full mt-5 bg-green-500 text-red font-semibold p-2 rounded-lg'>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding