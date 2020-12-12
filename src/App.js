import React from 'react';
import './App.css';
import Nav from './Nav';
import Data from './Data';
import About from './About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Interesting from './Interesting';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact component={About}/>
        <Route path="/päädata" component={Data}/>
        <Route path="/mielenkiintoinen" component={Interesting}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
