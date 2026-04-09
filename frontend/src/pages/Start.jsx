import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://cbx-prod.b-cdn.net/COLOURBOX69681400.jpg?width=800&height=800&quality=70)] h-screen pt-8 flex flex-col justify-between w-full bg-red-400'>
            <img className='w-16 ml-8'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AvLAhtGjwHzY9fVkt8ps3gtgqzke1U6RgQ&s" alt="" />
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'>Get Started with CAR drive</h2>
                <Link to='/user-login'
                className='flex items-center justify-center w-full bg-black text-red py-3 mt-2 rounded-xl mt-4'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start