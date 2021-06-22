import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../redux/UserReducer';
import './Register.css';

const Register = ({
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
    },[loggedIn, isAdmin, history])

	const registerUser = (e) => {
		e.preventDefault();
		axios
			.post('/user/register', { email: email, password: password })
			.then((res) => {
                console.log(res)
				loginUser(res.data);
				history.push(`/services`);
			})
			.catch((err) => {
				alert(err);
			});
	}
    
    return (
        <div className='register'>
            <h1>Register</h1>
            <form className='form' onSubmit={(e) => registerUser(e)}>
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
                        type='text'
                        placeholder='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input className='submit' type='submit' value='Register' />

                <Link className='toggle' to='/'>
                    click here to login
                </Link>
            </form>
        </div>
    );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { loginUser })(Register);
