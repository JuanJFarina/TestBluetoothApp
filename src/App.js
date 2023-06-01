import './App.css';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "861812571546-ku3g7ltrpvdpb0d5pj8s7luo6e1672pl.apps.googleusercontent.com";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    };
    gapi.load('client:auth2', start);
  });

  return (
    <div className="App">
      <div className="box">
        Login with your Google Account:
        <Login />
        <Logout />
      </div>
    </div>
  );
}

export default App;