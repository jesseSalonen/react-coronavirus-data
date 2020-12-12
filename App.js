import React from 'react';
import './App.css';
import Nav from './Nav';
import Data from './Data';
import About from './About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Interesting from './Interesting';

function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      'div',
      { className: 'App' },
      React.createElement(Nav, null),
      React.createElement(
        Switch,
        null,
        React.createElement(Route, { path: '/', exact: true, component: About }),
        React.createElement(Route, { path: '/p\xE4\xE4data', component: Data }),
        React.createElement(Route, { path: '/mielenkiintoinen', component: Interesting })
      )
    )
  );
}

export default App;