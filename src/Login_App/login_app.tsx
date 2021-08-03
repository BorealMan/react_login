import React, { useState , useEffect} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './login_app.css'
import Login from './Login/login'
import Create_Account from './CreateAccount/create_account';
import Session from './Config/session'
import Timer from './Config/Timer/timer'
import LOGIN_STATE from './enum/login_enum'
import API from './Axios/api'

const Login_App = () => {

        const [logged_in, set_logged_in] = useState(LOGIN_STATE.not_logged_in)
        const check_login_status = async () => {
            const instance = Session.get_login_status()
            while(instance === Session.get_login_status()) {
                let timer = new Timer()
                await timer.sleep(500)
                if (Session.get_login_status() === true) {
                    set_logged_in(LOGIN_STATE.logged_in)
                } else {
                    set_logged_in(LOGIN_STATE.not_logged_in)
                }
            }
            return 
        };

        useEffect(() => {
            check_login_status()
            return 
        }, [logged_in])

        if (logged_in === LOGIN_STATE.logged_in) {
  
            return (
                <div>
                    Thank Goodness
                    Welcome to my App! 
                    This will be the chat app
                    <button onClick={() => API.login_api.refresh_refreshToken()}>Extend Session</button>
                </div>
            )
        }
        else {
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
        }
};

export default Login_App;
