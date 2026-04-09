import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { CaptainDataContext } from "../context/CaptainContext"

const Captainlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const {captain , setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            email: email,
            password : password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

        console.log("FULL RESPONSE:", response.data.data.captain)
        console.log("TOKEN:", response.data.data.token)

        if(response.status === 200) {
            const data = response.data.data

            localStorage.setItem('accessToken', data.token)

            setCaptain(data.captain)
            navigate('/captain-home')
        }

        setEmail('')
        setPassword('')
    }


  return (
    <div>
    <div className='p-7 h-screen flex-col flex justify-between'>
        <div>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}>
                <img className='w-16 mb-8'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s" alt="thakur captain logo" />
                <h3 className='text-xl mb-2 font-medium'>What's your email</h3>
                <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                required 
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                type="email" 
                placeholder='captain@example.com'
                />

                <h3 className='text-xl mb-2 font-medium'>Enter your Password</h3>

                <input className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                type="password" 
                placeholder='password'
                />
                <button className='bg-[#111] text-red font-semibold mb-2 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base'
                >Login</button>
            </form>
            <p className='text-center pb-4'>Want to join a fleet? <Link to='/captain-signup'
            className='text-blue-600'>Register as a captain</Link></p>
        </div>
        <div>
            <Link to='/user-login'
             className='bg-[#c96309] text-black flex items-center justify-center font-semibold mb-7 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base'>
            Sign in as User</Link>
        </div>
    </div>
    </div>
  )
}

export default Captainlogin