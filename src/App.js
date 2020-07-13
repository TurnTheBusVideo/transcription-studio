import Amplify, { Auth } from 'aws-amplify';
import React from 'react';
import Routes from "./Routes";
import './App.css';

Amplify.configure({
  Auth: {
    region: '',
    userPoolId: '',
    userPoolWebClientId: ''
  }
});

const App = () => (
  <Routes />
);



// You can get the current config object
const currentConfig = Auth.configure();

export default App;
