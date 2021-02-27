import React from 'react';
import LandingPage from './LandingPage/Index';
import PortfolioPage from './PortfolioPage/Index';
import './styles/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/user" component={PortfolioPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
