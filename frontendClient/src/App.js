import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';

import React from 'react';

function App() {
  return (
    <div className="container">
      <GoogleOAuthProvider clientId="352293678404-mcpshroa3jhnkjlarln5jbjs9mcl8h7t.apps.googleusercontent.com">
        <GoogleLogin
          buttonText="Login"
          onSuccess={(response) => {
            console.log(response);
            fetch('http://localhost:3000/auth/google-auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: response.credential,
              }),
            })
              .then((response) => console.log(response))
              .then((data) => console.log(data));
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
