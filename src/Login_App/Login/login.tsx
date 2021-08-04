import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import LOGIN_STATE from '../enum/login_enum'
import SWITCH from '../enum/switch_enum'
import Feedback from './FeedBack/feedback'
import Session from '../Config/session'
import Timer from '../Config/Timer/timer'
import API from '../Axios/api'

const jwt_timer = new Timer
const login_api = API.login_api

const Login = (props: any) => {

    const [username, set_username] = useState("");
    const [password, set_password] = useState("");
    const [logged_in, set_logged_in]= useState(LOGIN_STATE.not_logged_in);
    const [jwt_authToken_delay, set_jwt_authToken_delay] = useState(SWITCH.OFF);
    const [has_actvity, set_has_activity] = useState(SWITCH.OFF);

    const handleLogin = async () => {
        if (username === '' || password === ''){
            set_logged_in(LOGIN_STATE.input_required);
            return
        }
        try {
            await login_api.login(username, password).then((res:any) => {
                console.log(res.data)
                if (res.data.message === 'Sucessfully Logged In') {
                    Session.get_auth_token().set_token(res.data.jwt.auth_token);
                    Session.get_refresh_token().set_token(res.data.jwt.refresh_token);
                    validate_auth_token();
                }
                else if (res.data === 'Invalid Password'){
                    set_logged_in(LOGIN_STATE.invalid_password);
                }
                else if (res.data === "User Doesn't Exist"){
                    set_logged_in(LOGIN_STATE.invalid_username);
                } 
                else if (res.data.message === `Already Logged In`){
                    set_logged_in(LOGIN_STATE.user_logged_in)
                }
            })
        } catch (err) {
            return console.log(err)
        }
    };

    const jwt_authToken_handler = async () => {
        if (jwt_authToken_delay === SWITCH.OFF){
            set_jwt_authToken_delay(SWITCH.ON)
            await refresh_accessToken()
            await jwt_timer.sleep(14000)
            set_jwt_authToken_delay(SWITCH.OFF)
            validate_auth_token()
        } else {
            return
        }
    };

    const logout = () => {
        set_logged_in(LOGIN_STATE.not_logged_in)
        set_username("")
        set_password("")
        Session.set_login_status(false)
    };

    const login = (username: string) => {
        if (logged_in !== LOGIN_STATE.logged_in){
            jwt_authToken_handler()
            set_logged_in(LOGIN_STATE.logged_in)
            set_password("")
            Session.set_username(username)
            Session.set_login_status(true)
        }
    };

    const refresh_accessToken = async () => {
        try {
            login_api.refresh_accessToken()
        } catch (err) {
            console.log(err)
        }
    };

    const validate_auth_token = async () => {
        try {
            login_api.validate_auth_token()
            .then(async (res:any) => {
                // THIS TRIGGERS WHEN A TOKEN EXPIRES
                if (res.data.auth_token === undefined){
                    logout()
                } 
                else if (res.data.auth_token !== undefined) {
                    login(res.data.auth_token.username)
                }
                else {
                    console.log("Validation error occcured")
                    logout()
                }
            });
        } catch (err) {
            console.log(err)
            set_logged_in(LOGIN_STATE.not_logged_in)
        }

    };

    useEffect(() => {
        return
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