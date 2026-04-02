import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
        <h5 onClick={() => {
            props.setConfirmRidePanel(false)
            // props.setVehiclePanelOpen(false)
          }}
          className='p-1 text-center w-[93%] absolute top-0'><i className="text-2xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

        <div className='flex gap-5 flex-col items-center justify-between'>
            <img className='h-20'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPsZ40PoKtuhkIRk8QC8fqmKbTkZxKJtcNLBL5biSojttSGQNSUdy8lxrLxFTJfXwkIWMKRs9t-aM_BpccWO6l&s&ec=121528429" alt="" />

            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-xl ri-map-pin-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-xl ri-map-pin-user-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-xl ri-hand-coin-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
                
            </div>

            <div className='w-full'>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }}
                className='w-full mt-5 text-white p-2 rounded-xl bg-green-500 font-semibold'>Confirm Ride</button>
            </div>
        </div>

    </div>
  )
}

export default ConfirmRide