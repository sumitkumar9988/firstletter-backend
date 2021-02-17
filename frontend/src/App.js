import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro";
import Login from './Dashboard/Views/Login'
import UserProfileData from './Dashboard/Views/UserData'
import Register from './Dashboard/Views/Register'
import LandingPage from './LandingPage/Index'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div >
        <Router >

      <Switch>
          <Route path='/login' component={Login} />  
          <Route path='/register' component={Register} />  
          <Route path='/profileInfo' component={UserProfileData}/>
          <Route path='/' component={LandingPage} />  
      </Switch>

      </Router>
     
    </div>
  );
}

export default App;
