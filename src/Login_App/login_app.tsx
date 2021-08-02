import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './login_app.css'
import Login from './Login/login'
import Create_Account from './CreateAccount/create_account';
import Session from './Config/session'
import LOGIN_STATE from './enum/login_enum'



const Login_App = () => {
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
