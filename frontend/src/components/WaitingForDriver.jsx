import React from 'react'

const WaitingForDriver = (props) => {

    console.log("WaitingForDriver ride:", props.ride)

  return (
    <div>
        <h5 onClick={() => {
            props.setConfirmRidePanel(false)
            props.setWaitingForDriver(false)
          }}
          className='p-1 text-center w-[93%] absolute top-0'><i className="text-2xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
        
        <div className='flex items-center justify-between'>
             <img className='h-12'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPsZ40PoKtuhkIRk8QC8fqmKbTkZxKJtcNLBL5biSojttSGQNSUdy8lxrLxFTJfXwkIWMKRs9t-aM_BpccWO6l&s&ec=121528429" alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium'>{props.ride?.captain?.fullName?.firstName}</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain?.vehicle?.plate}</h4>
                <p className='text-sm text-gray-600'>lord alto</p>
                <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
            </div>

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
        </div>

    </div>
  )
}

export default WaitingForDriver