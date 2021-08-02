import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './login.css'
import LOGIN_STATE from '../enum/login_enum'
import SWITCH from '../enum/switch_enum'
import Feedback from './FeedBack/feedback'
import Session from '../Config/session'
import Timer from '../Config/Timer/timer'

const jwt_timer = new Timer

const Login = (props: any) => {

    const [username, set_username] = useState("");
    const [password, set_password] = useState("");
    const [logged_in, set_logged_in]= useState(LOGIN_STATE.not_logged_in);
    const [jwt_authToken_delay, set_jwt_authToken_delay] = useState(SWITCH.OFF)
    const [has_actvity, set_has_activity] = useState(SWITCH.OFF)

    const handleLogin = async () => {
        if (username === '' || password === ''){
            set_logged_in(LOGIN_STATE.input_required)
            return
        }
        await axios.post(`${props.api}/auth/login`, {username: username, password: password}).then((res: any) => {
            // console.log(res.data)
            if (res.data.message === 'Sucessfully Logged In') {
                Session.get_auth_token().set_token(res.data.jwt.auth_token)
                Session.get_refresh_token().set_token(res.data.jwt.refresh_token)
                validate_auth_token();
            }
            else if (res.data === 'Invalid Password'){
                set_logged_in(LOGIN_STATE.invalid_password)
            }
            else if (res.data === "User Doesn't Exist"){
                set_logged_in(LOGIN_STATE.invalid_username)
            };
        });
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
    }

    // const jwt_refreshToken_handler = async () => {
    //     if (jwt_authToken_delay == SWITCH.OFF) {
    //         set_jwt_refreshToken_delay(SWITCH.ON)
    //         await jwt_timer.sleep(60000)
    //         set_jwt_refreshToken_delay(SWITCH.OFF)
    //     } else {
    //         return
    //     }
    // }

    const logout = () => {
        set_logged_in(LOGIN_STATE.not_logged_in)
        Session.clear_session()
        set_username("")
        set_password("")
    }

    const login = (username: string) => {
        jwt_authToken_handler()
        set_logged_in(LOGIN_STATE.logged_in)
        Session.start_session()
        Session.set_username(username)
    }

    const refresh_accessToken = async () => {
        // I need to verify with the refresh token and send a new acesstoken
        try {
            axios.get(`${Session.get_local_api()}/auth/refresh-access-token`,
             {headers: {authorization: `Bearer ` + Session.get_refresh_token().get_token()}})
             .then(res => {
                // axios.defaults.headers.common['authorization'] = `Bearer ${Session.auth_token.get_token()}`
                // console.log(res.data)
                // Session.print_session_details()
                if (res.data.jwt === undefined){
                    console.log("Refresh Token Expired")
                }
                else {
                    console.log("Refreshed correctly")
                    Session.get_auth_token().set_token(res.data.jwt.auth_token)
                    // Session.get_refresh_token().set_token(res.data.jwt.refresh_token)
                    // Session.print_session_details()
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const validate_auth_token = async () => {
        try {
            // axios.defaults.headers.common['authorization'] = `Bearer ${Session.auth_token.get_token()}`
            axios.get(`${Session.get_local_api()}/auth/check-token`, 
            {headers: {Authorization: `Bearer ${Session.get_auth_token().get_token()}`}}
            )
            .then(async res => {
                console.log(res.data)
                // Session.print_session_details()
                // THIS TRIGGERS WHEN A TOKEN EXPIRES
                if (res.data.auth_token === undefined){
                    console.log(`inside logout`)
                    logout()
                } 
                else if (res.data.auth_token !== undefined) {
                    login(res.data.auth_token.username)
                }
                else {
                    console.log("Validation error occcured")
                }
            });
        } catch (err) {
            console.log(err)
            set_logged_in(LOGIN_STATE.not_logged_in)
        }

    };

    useEffect(() => {
    }, [logged_in]);


    if (logged_in === LOGIN_STATE.logged_in) {
        return (
            <div>
                <h3>Premium Content</h3>
                <button onClick={() => {validate_auth_token()}}>Validate Token</button>
                <button onClick={() => {refresh_accessToken()}}>Refresh Token</button>
            </div>
        )
    }
    else  {
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
    }
};

export default Login;