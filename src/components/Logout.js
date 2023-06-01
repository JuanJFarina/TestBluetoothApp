import { GoogleLogin } from 'react-google-login';
import React from 'react';

const clientId = "861812571546-ku3g7ltrpvdpb0d5pj8s7luo6e1672pl.apps.googleusercontent.com";

const onSuccess = () => {
    console.log("Logout successful!");
}

export default function Logout() {
  return (
    <div id="signOutButton">
        <GoogleLogin
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
        />
    </div>
  )
}