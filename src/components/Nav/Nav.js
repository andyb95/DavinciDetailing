import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {

  return (
    <div className='nav'>
      <div className='logo'>Cascade Networking</div>
      <div className='links'>
        <Link className='link' to='/account'>Account</Link>
        <Link className='link' to='/referrals'>Referrals</Link>
        <Link className='link' to='/chat'>Chat</Link>
        <Link className='link' to='/professionals'>Professionals</Link>
        <Link className='link' to='/login'>Login</Link>
        <Link className='link' to='/feed'>Feed</Link>
      </div>
    </div>
  )
}

export default Nav