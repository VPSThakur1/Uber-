import React, { useRef, useState , useEffect , useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import ConfirmRidePopUp from "../components/ConfirmRidePopUp.jsx"
import { SocketContext } from '../context/SocketContet'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null)
  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType : 'captain'
    });

    const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                  console.log({
                    userId: captain._id,
                    location: {
                      ltd: position.coords.latitude,
                      lng: position.coords.longitude
                    }
                  });

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
              }
    }

    const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()

    return () => clearInterval(locationInterval)

  })

  socket.on('new-ride', (data) => {
    console.log("Data of new ride", data)
    setRide(data)
    setRidePopUpPanel(true)
  })

  async function confirmRide() {
    // socket.emit('confirm-ride', {
    //   userId: captain._id,
    //   rideId: ride._id
    // })
    console.log("Ride before confirm:", ride)
    console.log("Ride ID before confirm:", ride?._id)

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      
      rideId: ride._id,
      captainId: captain._id,

    }, {
      headers : {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    console.log("Confirm API Response:", response.data)
    console.log("Confirm API Response 2:", response.data.data)

    setRidePopUpPanel(false)
    setConfirmRidePopUpPanel(true)
  }

  // async function confirmRide() {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
  //       {
  //         rideId: ride._id,
  //         captainId: captain._id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  //         }
  //       }
  //     );

  //     console.log("Ride Confirmed Response:", response.data);

  //     setRidePopUpPanel(false);
  //     setConfirmRidePopUpPanel(true);
  //   } catch (error) {
  //     console.log("Confirm Ride Error:", error.response?.data || error.message);
  //   }
  // }

  useGSAP(() => {
    if(ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

  useGSAP(() => {
    if(confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])

  return (
    <div className='h-screen'>
        <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
          <img className='w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s"/>
          <Link to={'/captain-login'}  className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-xl font-bold ri-logout-box-line"></i>
          </Link>
        </div>

        <div className='h-3/5'>
            <img className='h-full w-full object-cover'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s" alt="" />
        </div>

        <div className='h-2/5 p-6'>
          <CaptainDetails />
        </div>

        <div ref={ridePopUpPanelRef} className='w-full translate-y-full fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white'>
          <RidePopUp 
          ride = {ride}
          setRidePopUpPanel = {setRidePopUpPanel} 
          confirmRide={confirmRide}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>

        <div ref={confirmRidePopUpPanelRef} className='w-full h-screen translate-y-full fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white'>
          <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}  
          setRidePopUpPanel={setRidePopUpPanel} />
        </div>
    </div>
  )
}

export default CaptainHome
