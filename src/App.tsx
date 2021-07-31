import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Login/login'
import Create_Account from './CreateAccount/create_account';
import Auth_Config from './Config/auth_config'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/create-account'>
            <Create_Account api={Auth_Config.api.local}/>
          </Route>
          <Route path='/'>
            <Login api={Auth_Config.api.local} /> 
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
