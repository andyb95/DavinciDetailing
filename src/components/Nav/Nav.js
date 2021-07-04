import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import './Nav.css'

const Nav = ({ user }) => {

  return (
    <div className='nav'>
      <Link className='logoText' to='/'>
        <img src='NavLogo.jpg' alt='logo' className='logo' />
        Davinci Detailing
      </Link>
      {/* make this shit a muthfuckn HAMBURGER menu */}
      <div className='links'>
        {user && user.isAdmin ? (
        <Link className='link' to='/admin'>Admin</Link>
        ) : null}
        <Link className='link' to='/login'>Login</Link>
        <Link className='link' to='/account'>Account</Link>
        <Link className='link' to='/services'>Services</Link>
        <Link className='link' to='/contact'>Contact Us</Link>
        <Link className='link' to='/cart'>Cart</Link>
      </div>
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps)(Nav)
