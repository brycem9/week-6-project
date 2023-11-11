import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/solid'

function Navbar() {
  let navigate = useNavigate()
  return (
    <nav className="flex items-center p-3 justify-between text-white z-10">
        <figure>
          <img onClick={() => navigate('/')} className="w-44 nav__logo cursor-pointer" src="\assets\cineonogo.png" alt="" />
        </figure>
        <div>
          <Bars3Icon className='w-8 menu__icon'/>
        </div>
        <ul className="flex nav__links space-x-3">
          <li className="">Home</li>
          <li>Movies</li>
          <li>Subscription</li>
          <button className="">
            <li className="bg-[#D334AB] rounded-full p-3 w-12 h-6 flex items-center justify-center">
              Login
            </li>
          </button>
        </ul>
      </nav>
  )
}

export default Navbar