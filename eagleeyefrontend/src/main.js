import React from 'react';
import ReactDOM from 'react-dom';

import CustomRouter from "./components/Router.jsx" ;
import Login from "./components/Login.jsx" ; 
import Register from "./components/Register.jsx" ;  
import HomePage from "./components/HomePage.jsx" ;
import EventCal from "./components/EventCal.jsx" ;

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const App = () => (
  <MuiThemeProvider>
    <CustomRouter />
  </MuiThemeProvider>
);

ReactDOM.render(<App/>,document.getElementById('app'));
