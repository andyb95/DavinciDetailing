import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {

  return (
    <div className='nav'>
      <Link className='logo' to='/'>Davinci Detailing</Link>
      <div className='links'>
        <Link className='link' to='/account'>Account</Link>
        <Link className='link' to='/services'>Services</Link>
        <Link className='link' to='/contact'>Contact Us</Link>
        <Link className='link' to='/cart'>Cart</Link>
      </div>
    </div>
  )
}

export default Nav