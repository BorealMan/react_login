import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import './login_app.css'
import Login from './Login/login'
import Create_Account from './CreateAccount/create_account';
import Config from './Config/session'
import LOGIN_STATE from './enum/login_enum'

function Login_App() {

    const [login_state, set_login_state] = useState(LOGIN_STATE.not_logged_in)

    const log_jwt = () => {
        console.log(`Auth Token: ${Config.get_jwt_auth()}`)
        console.log(`Refresh Token: ${Config.get_jwt_refresh()}`)
    };

    const validate_auth_token = () => {
        axios.post(`${Config.get_local_api()}/auth/check-token`, {auth_token: Config.get_jwt_auth()}).then(res => {
            console.log(res.data)
            Config.set_username(res.data.username)
            Config.print_session_details()
            if (Config.get_username() === undefined){
                set_login_state(LOGIN_STATE.not_logged_in)
            } 
            else 
            {
                set_login_state(LOGIN_STATE.logged_in)
            }
        });
    };

    if (login_state === LOGIN_STATE.not_logged_in){
        return (
            <div className='login-app'>
                <BrowserRouter>
                <div className="App">
                    <Switch>
                    <Route path='/create-account'>
                        <Create_Account api={Config.get_prod_api()}/>
                    </Route>
                    <Route path='/'>
                        <Login api={Config.get_prod_api()} /> 
                        <button onClick={() => {log_jwt()}}>Log JWT</button>
                        <button onClick={() => {validate_auth_token()}}>Validate Token</button>
                    </Route>
                    </Switch>
                </div>
                </BrowserRouter>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Premium WEBSITE DUDE</h1>
                <h3>Welcome {Config.get_username()} !</h3>
                <button onClick={() => {log_jwt()}}>Log JWT</button>
                <button onClick={() => {validate_auth_token()}}>Validate Token</button>
            </div>

        )
    }
};

export default Login_App;
