import { GoogleLogin } from 'react-google-login';
import React from 'react';

const clientId = "861812571546-ku3g7ltrpvdpb0d5pj8s7luo6e1672pl.apps.googleusercontent.com";

const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user:", res.profileObj);
}

const onFailure = (res) => {
    console.log("LOGIN FAILED! Res:", res);
}

export default function Login() {
  return (
    <div id="signInButton">
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </div>
  )
}