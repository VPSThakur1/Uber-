import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import  React,{ useState } from 'react'
import { useContext } from 'react'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const {user , setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
          fullName : {
            firstName: firstName,
            lastName: lastName
          },
          password: password,
          email : email
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
        console.log("FULL RESPONSE 👉", response)
        console.log("RESPONSE.DATA 👉", response.data)

        if(response.status === 201) {
          const data = response.data

          setUser(data.user)
          localStorage.setItem('accessToken', data.token)
          navigate('/home')
        }
        
        setFirstName('')
        setLastName('')
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
                <button className='bg-[#111] text-red font-semibold mb-2 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base'
                >Create Account</button>
            </form>
            <p className='text-center pb-4'>Already Registered ? <Link to='/user-login'
            className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
            <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, whatsapp or sms messages, including by automated means, from thakur and its affiliated to the number provided</p>
        </div>
    </div>
  )
}

export default UserSignup