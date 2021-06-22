import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { loginUser } from '../../redux/UserReducer';
import './Login.css';

const Login = ({
  user,
  history,
  loginUser
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loggedIn, isAdmin } = user
  
  useEffect(() => {
    if (loggedIn) {
      if (isAdmin) {
        history.push('/admin')
    } 
    else {
        history.push('/services')
    }
    }
  },[history, isAdmin, loggedIn])

	const login = (e) => {
		e.preventDefault();

		axios
			.post('/user/login', { email, password })
			.then((res) => {
				loginUser(res.data);
				if (res.data.isAdmin) {
          history.push('/admin')
        }
        else {
          history.push('/services')
        }
			})
			.catch((err) => {
				alert('Incorrect Username or Password');
			});
	};

  return (
      <div className='login'>
        <h1>Login</h1>
        <form className='form' onSubmit={(e) => login(e)}>
          <div className='user-info'>
            <input
              className='email'
              type='text'
              placeholder='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='password'
              type='password'
              placeholder='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input className='submit' type='submit' />

          <Link className='toggle' to='/register'>
            click here to register
          </Link>
        </form>
      </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { loginUser })(Login);
