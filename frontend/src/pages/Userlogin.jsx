import React, { useState, useContext } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const Userlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user, setUser } = useContext(UserDataContext)
    const navigate = useNavigate()
    

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            email : email,
            password : password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

        // if(response.status === 200) {
        //     const data = response.data.data
        //     setUser(data.user)
        //     navigate('/home')
        //     localStorage.setItem('accessToken', data.token)
        // }

        if(response.status === 200) {
            const data = response.data.data
            console.log("LOGIN RESPONSE USER:", data.user)   // <-- ye lagao
            setUser(data.user)
            navigate('/home')
            localStorage.setItem('accessToken', data.token)
        }

        console.log(userData)
        setEmail('')
        setPassword('')
    }

  return (
    <div className='p-7 h-screen flex-col flex justify-between'>
        <div>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}>
                <img className='w-16 mb-8'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s" alt="" />
                <h3 className='text-xl mb-2 font-medium'>What's your email</h3>
                <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                required 
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                type="email" 
                placeholder='user@example.com'
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
            <p className='text-center pb-4'>New here? <Link to='/user-signup'
            className='text-blue-600'>Create new Account</Link></p>
        </div>
        <div>
            <Link to='/captain-login'
             className='bg-[#10b461] text-black flex items-center justify-center font-semibold mb-7 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default Userlogin