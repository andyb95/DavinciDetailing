import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {

  return (
    <div className='home'>
      <div className='carousel'>
        <button className='chapters'>
          <Link className='link' to='/services'>View Services</Link>
        </button>
        <button className='chapters'>
          <Link className='link' to='/services'>Schedule Appt</Link>
        </button>
      </div>
    </div>
  )
}

export default Home