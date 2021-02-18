import React from "react";
import LandingPage from './LandingPage/Index'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div >
        <Router >
            <Switch>
              <LandingPage/>
            </Switch>
      </Router>
     
    </div>
  );
}

export default App;
