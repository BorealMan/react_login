import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './login.css'
import LOGIN_STATE from '../enum/login_enum'
import Feedback from './FeedBack/feedback'
import { Link } from 'react-router-dom'

const Login = (props: any) => {
    const [username, set_username] = useState("");
    const [password, set_password] = useState("");
    const [logged_in, set_logged_in]= useState(LOGIN_STATE.not_logged_in);

    const handleLogin = async () => {
        if (username === '' || password === ''){
            return
        }
        await axios.post(`${props.api}/auth/login`, {username: username, password: password}).then((res: any) => {
                console.log(res.data)
                if (res.data.message === 'Sucessfully Logged In') {
                    set_logged_in(LOGIN_STATE.logged_in);
                }
                else if (res.data === 'Invalid Password'){
                    set_logged_in(LOGIN_STATE.invalid_password)
                }
                else if (res.data === "User Doesn't Exist"){
                    set_logged_in(LOGIN_STATE.invalid_username)
                };
            });
    };
    useEffect(() => {

    }, [logged_in]);

    return (
        <div>
            <div className='form-container'>
                <div className='login-form'>
                    <label className='login-form-label' >Username</label>
                    <input className='login-form-input' onChange={(e:any) => set_username(e.target.value)} placeholder='UserName...'></input>
                    <label className='login-form-label'>Password</label>
                    <input className='login-form-input' type="password" onChange={(e:any) => set_password(e.target.value)} placeholder='Password...'></input>
                    <button className='login-form-button' onClick={() => {handleLogin()}} type="submit">Login</button>
                    <Link to='/create-account' className='login-create-account'>Create Account</Link>
                </div>
                <small onClick={() => {console.log("Forgot Password")}} className='forgot-password'>
                    Forgot Password?
                </small>
            </div>
            <div className='test'>
                    <Feedback status={logged_in} username={username}/>
            </div>
        </div>
    );
};

export default Login;