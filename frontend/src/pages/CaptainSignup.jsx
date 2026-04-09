import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from "axios"

const CaptainSignup = () => {
  const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})

    const [ vehicleColor, setVehicleColor ] = useState('')
    const [ vehiclePlate, setVehiclePlate ] = useState('')
    const [ vehicleCapacity, setVehicleCapacity ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')

    const {captain, setCaptain} = useContext(CaptainDataContext)
  
    const submitHandler = async (e) => {
          e.preventDefault();
          console.log(userData)
          const captainData = {
            fullName : {
              firstName: firstName,
              lastName: lastName
            },
            password: password,
            email : email,
            vehicle : {
              color : vehicleColor,
              plate : vehiclePlate,
              capacity : vehicleCapacity,
              vehicleType : vehicleType
            }
          }

          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

          if(response.status === 201) {
            const data = response.data.data
            
            setCaptain(data.captain)
            localStorage.setItem('accessToken', data.token)
            navigate('/captain-home')
          }

          setFirstName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setVehicleCapacity('');
          setVehicleColor(''),
          setVehiclePlate(''),
          setVehicleType('')
      }

  return (
    <div className='px-4 py-5 h-screen flex-col flex justify-between'>
        <div>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}>
                 <img className='w-16 mb-4'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s" alt="thakur captain logo" />

                <h3 className='text-xl mb-2 font-medium'>What's your Name</h3>
                <div className='flex gap-1'>
                  <input className='bg-[#eeeeee] w-1/2 mb-2 rounded px-4 py-2 border text-lg placeholder:text-base'
                  required 
                  type="text" 
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                  />
                  <input className='bg-[#eeeeee] w-1/2 mb-2 rounded px-4 py-2 border text-lg placeholder:text-base'
                  required 
                  type="text" 
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                  />
                </div>

                <h3 className='text-xl mb-2 font-medium'>What's your email</h3>
                <input className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                required 
                type="email" 
                placeholder='user@example.com'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                />

                <h3 className='text-xl mb-2 font-medium'>Enter your Password</h3>

                <input className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="password" 
                placeholder='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                />

                <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
                </div>

                <div className='flex gap-4 mb-7'>
                <input
                required
                 className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="number"
                placeholder='Vehicle Capacity'
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value)
                }}
                />
                <select
                required
                 className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'  
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value)
                }}
                >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
          </div>

                <button className='bg-[#111] text-red font-semibold mb-2 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base'
                >Create Captain Account</button>
            </form>
            <p className='text-center pb-4'>Already Registered ? <Link to='/captain-login'
            className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
            <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Guugle Privacy Policy</span> and <span className='underline'>Terms of Service apply</span></p>
        </div>
    </div>
  )
}

export default CaptainSignup