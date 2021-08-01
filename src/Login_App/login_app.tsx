import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import './login_app.css'
import Login from './Login/login'
import Create_Account from './CreateAccount/create_account';
import Session from './Config/session'
import LOGIN_STATE from './enum/login_enum'



const Login_App = () => {

    const [login_state, set_login_state] = useState(LOGIN_STATE.not_logged_in)

    useEffect(() => {
        if (Session.sessionTimer.get_alarm() === false){

        }
    }, [login_state])

        return (
            <div className='login-app'>
                <BrowserRouter>
                <div className="App">
                    <Switch>
                    <Route path='/create-account'>
                        <Create_Account api={Session.get_local_api()}/>
                    </Route>
                    <Route path='/'>
                        <Login api={Session.get_local_api()} /> 
                    </Route>
                    </Switch>
                </div>
                </BrowserRouter>
            </div>
        );
};

export default Login_App;
