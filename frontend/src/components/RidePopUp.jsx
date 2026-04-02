import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 onClick={() => {
            props.setRidePopUpPanel(false)
        }}
          className='p-1 text-center w-[93%] absolute top-0'><i className="text-2xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>

        <div className='flex items-center justify-between bg-yellow-300 rounded-2xl p-3 mt-4'>
            <div className='flex items-center gap-3 '>
                <img className='w-12 h-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIyTZVXyb90oYHRiiX6YkNUc0CnzGwWjI3Q&s" alt="" />
                <h2 className='text-lg font-medium'>{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
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
                        <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
                
            </div>

            <div className='w-full flex gap-5'>
                <button onClick={() => {
                    props.setConfirmRidePopUpPanel(true)
                    props.confirmRide()
                }}
                className='w-full mt-5 text-white p-2 rounded-xl bg-green-500 font-semibold'>Accept Ride</button>

                <button onClick={() => {
                    props.setRidePopUpPanel(false)
                }}
                className='w-full mt-5 text-gray-700 p-2 rounded-xl bg-gray-400 font-semibold'>Ignore</button>
            </div>
        </div>

    </div>
  )
}

export default RidePopUp