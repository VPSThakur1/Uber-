import React ,{ useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import WaitingForDriver from '../components/WaitingForDriver'
import LookingForDriver from '../components/LookingForDriver'
import { SocketContext } from '../context/SocketContet'
import { UserDataContext } from "../context/UserContext"
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ vehiclePanel, setVehiclePanel ] = useState(false)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)


  const navigate = useNavigate()
  const {socket} = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  console.log("waitingForDriver:", waitingForDriver)
  console.log("ride:", ride)

  useEffect(() => {
    console.log(user)

    socket.emit("join", { userType: "user", userId: user._id })
  }, [user]);

  socket.on('ride-confirmed', (ride) => {
    console.log("Ride Confirmed:", ride)

    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    navigate('/riding', {state: {ride}})
  })

//   useEffect(() => {
//   socket.on('ride-confirmed', (ride) => {
//     console.log("Ride Confirmed Event:", ride)

//     setRide(ride)
//     setVehicleFound(false)
//     setWaitingForDriver(true)
//   })

//   return () => {
//     socket.off('ride-confirmed')
//   }
// }, [socket])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : 0,
      padding: panelOpen? 24 : 0,
      opacity: panelOpen ? 1 : 0,
      duration: 0.4,
      ease: "power2.out"
    })
  }, [panelOpen])

  useGSAP(() => {
    gsap.to(panelCloseRef.current, {
    opacity: panelOpen ? 1 : 0,
    y: panelOpen ? 0 : -10,
    duration: 0.3,
    ease: "power2.out",
    delay: panelOpen ? 0.2 : 0
  })
  })

  useGSAP(() => {
    if(vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(() => {
    if(confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(() => {
    if(waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  useGSAP(() => {
    if(vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  async function findTrip() {
    try {
      setVehiclePanelOpen(true);
      setPanelOpen(false);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );

      setFare(response.data.data)

      console.log("Get Fare:", response.data);
      console.log("Fare Data:", response.data.data);

    } catch (error) {
      console.log("Frontend Get Fare Error:", error.response?.data || error.message);
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      console.log(response.data.data)
    } catch (error) {
      console.log("Maa ka bhosda create ride frontend", error)
    }
  }

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {params: {input: e.target.value},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      // console.log("Vedpal", response.data.data);
      // console.log("Vedpal SIngh", response.data);
      setPickupSuggestions(response.data.data);

    } catch (error) {
      console.log("Error in pickupchange fxn")
      console.log(error);
    }
  }

  const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setDestinationSuggestions(response.data.data || response.data)
        } catch(error) {
            console.log(error)
        }
    }

  return (
    <div>
      <div className='h-screen relative overflow-hidden'>
        <img className='w-16 absolute top-5 left-5'
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <div
         className='h-screen w-screen'>
          <LiveTracking />
        </div>

        <div className='flex flex-col justify-end h-screen absolute top-0 w-full '>
          <div className='h-[30%] p-5 bg-white relative'>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>

            <h5 ref={panelCloseRef} onClick={() => {
              setPanelOpen(false)
            }} 
            className='text-2xl absolute opacity-0 top-6 right-6'>
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <form onSubmit={(e) => {
              submitHandler(e)
            }}>

              <div className='line absolute h-15 w-0.5 top-[39%] left-9 bg-gray-600 rounded-full'></div>
              <input className='bg-[#eee] px-8 py-2 text-base rounded-lg border-1 w-full mt-2 mb-2' 
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              // onChange={(e) => {
              //   setPickup(e.target.value)
              // }}
              onChange={handlePickupChange}
              type="text" 
              placeholder='Add a pick-up location'
              />
              <input className='bg-[#eee] px-8 py-2 text-base border-1 rounded-lg w-full mb-2' 
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              // onChange={(e) => {
              //   setDestination(e.target.value)
              // }}
              onChange={handleDestinationChange}
              type="text" 
              placeholder='Enter your destination'
              />
            </form>

            <button
                  onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                  </button>
          </div>

          <div ref={panelRef} className='h-0 bg-white'>
              {/* <LocationSearchPanel  setPanelOpen={setPanelOpen}  setVehiclePanelOpen={setVehiclePanelOpen} /> */}
              <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
          </div>
        </div>

        <div ref={vehiclePanelRef} className='w-full fixed z-10 translate-y-full bottom-0 px-3 py-8 bg-white'>
          <VehiclePanel 
          selectVehicle={setVehicleType}
          fare={fare} 
          setConfirmRidePanel={setConfirmRidePanel} 
          setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>

        <div ref={confirmRidePanelRef}   className='w-full fixed z-10 translate-y-full bottom-0 px-3 py-6 pt-12 bg-white'>
          <ConfirmRide
          fare = {fare}
          pickup={pickup}
          destination={destination}
          vehicleType = {vehicleType}
          // passenger={passenger}
          createRide={createRide}
          setVehicleFound={setVehicleFound} 
          setConfirmRidePanel={setConfirmRidePanel}/>
        </div>

        <div ref={vehicleFoundRef}  className='w-full fixed z-10 translate-y-full bottom-0 px-3 py-6 pt-12 bg-white'>
          <LookingForDriver
          fare = {fare}
          createRide={createRide}
          vehicleType= {vehicleType}
          pickup = {pickup}
          destination = {destination}
          setVehicleFound={setVehicleFound} />
        </div>

        <div ref={waitingForDriverRef}  className='w-full fixed z-10 translate-y-full bottom-0 px-3 py-6 pt-12 bg-white'>
          <WaitingForDriver 
          ride={ride}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver} />
        </div>
      </div>
    </div>
  )
}

export default Home