import React, { useState, useEffect } from "react";
import Nav from "./navbar";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginfail, setSetLoginFail] = useState('')
  const [emailValidation, setEmailValidation] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')
  const [token, setToken] = useState('')


  const login = () => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.length == 0) {
      setEmailValidation(
        <p class="pull-right" style={{ marginLeft: 150, color: 'red', position: 'absolute' }}>
          Please enter a email.
        </p>
      )
      setTimeout(() => { setEmailValidation(''); }, 2000);

    }
    else if (!email.match(validRegex)) {
      setEmailValidation(
        <p style={{ marginLeft: 100, color: 'red', position: 'absolute' }}>
          Please Enter a valid email
        </p>
      )
      setTimeout(() => { setEmailValidation(''); }, 2000);

    }
    else if (password.length == 0) {
      setPasswordValidation(
        <p style={{ marginLeft: 80, color: 'red', position: 'absolute' }}>
          Please enter your password.
        </p>
      )
      setTimeout(() => { setPasswordValidation(''); }, 2000);
    }
    else {
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
      })
        .then(res => res.json())
        .then((res) => {
          if (res.msg == "true") {
            setToken(res.token)
            setLoggedIn(true)

          }
          else {
            setSetLoginFail(
              <p style={{ color: 'red' ,position: 'absolute',marginLeft : 20}}>
                Your Email Or Password Is Incorrect!
              </p>)
              setTimeout(() => { setSetLoginFail(''); }, 2000);
          }

        })
    }
  }

  if (loggedIn == true) {
    return (
      <div className="container-fluid">
        <div className="main-app" >
          <Nav token={token} />
        </div>
      </div>
    );

  }
  else {
    return (
      <div className="login" >
        <div className="login-box" style={{margin : 'auto', padding : '10px', width : '320px', backgroundColor : 'white', height : '370px', borderRadius : '5%'}}>
          <img src="img/download.png" style={{ marginLeft: 100 }} width="100px" height="30px" /><br />
          {loginfail}
          <label style={{ marginTop: 30 }}>Email</label>
          <input type="email" className="form-control" value={email} onChange={event => setEmail(event.target.value)}  />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16" style={{marginTop : -65, marginLeft:280}}> 
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
</svg>
<br />
          {emailValidation}

          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={event => setPassword(event.target.value)} 
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-lock" viewBox="0 0 16 16" style={{marginTop : -65, marginLeft:280}}>
  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
  <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
</svg>
          <br />
          {passwordValidation}
          <button style={{ marginLeft: 90, marginTop: 30, width:'40%' }} onClick={login} className="btn btn-success">Login</button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-joystick" viewBox="0 0 16 16" style={{marginTop : -65, marginLeft:180, color:'whitesmoke'}}>
  <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"/>
  <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"/>
</svg>
          
        </div>
      </div>

    );
  }


}

