import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={() => {
            props.setVehiclePanelOpen(false)
          }}
          className='p-1 text-center w-[93%] absolute top-0'><i className="text-2xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
          <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

          <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('motorcycle')
          }}
          className='w-full mb-3 border-2 active:border-black rounded-xl p-3 flex items-center justify-between '>
            <img className='h-20 w-20'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s" alt="" />

            <div className='w-1/2'>
              <h4 className='font-normal text-base text-gray-800'>MotoGo <span><i className="ri-user-fill"></i>1</span></h4>
              <h5 className='font-normal text-xs text-gray-800'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-800'>Affordable Motorcycle ride</p>
            </div>
            <h2 className='text-lg font-semibold'>${props.fare.motorcycle}</h2>
          </div>

          <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('auto')
          }}
          className='w-full mb-3 border-2 border-black rounded-xl px-3 py-5 flex items-center justify-between '>
            <img className='h-12 w-20'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s" alt="" />

            <div className='w-1/2'>
              <h4 className='font-normal text-base text-gray-800'>thakurAuto <span><i className="ri-user-fill"></i>3</span></h4>
              <h5 className='font-normal text-xs text-gray-800'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-800'>Affordable, compact rides</p>
            </div>
            <h2 className='text-lg font-semibold'>${props.fare.auto}</h2>
          </div>

          <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('car')
          }}
          className='w-full mb-3 border-2 border-black rounded-xl px-3 py-5 flex items-center justify-between '>
            <img className='h-12 w-20'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s" alt="" />

            <div className='w-1/2'>
              <h4 className='font-normal text-base text-gray-800'>thakurGo Car <span><i className="ri-user-fill"></i>4</span></h4>
              <h5 className='font-normal text-xs text-gray-800'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-800'>Affordable, compact rides</p>
            </div>
            <h2 className='text-lg font-semibold'>${props.fare.car}</h2>
          </div>
    </div>
  )
}

export default VehiclePanel