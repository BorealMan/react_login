import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Login/login'
import Create_Account from './CreateAccount/create_account';
import Config from './Config/Config'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/create-account'>
            <Create_Account api={Config.api.local}/>
          </Route>
          <Route path='/'>
            <Login api={Config.api.local} /> 
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
