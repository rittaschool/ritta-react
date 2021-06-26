import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import axios from 'axios';
import config from '../../../config.json';

function SchoolName() {
  const [data, setData] = useState({
    name: '?',
    city: '?'
  });

  const getData = async () => {
    const res = await axios.get(`${config.apiBase}/api/v1/info`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    setData(res.data.school)
  }

  useEffect(()=>{
    getData()
  },[]);

  return (
    <span>{ data.name }, { data.city }</span>
  );
}

async function login(jwt) {
  try {
    const res = await axios.post(`${config.apiBase}/api/v1/auth/opinsys`,
    {
      jwt
    });
    return { error: false, data: res.data }; 
  } catch(e) {
    return { error: true, message: e.response.data.message }
  }
 }

 async function mfaVerify(mfaToken, mfaCode) {
  try {
    const res = await axios.post(`${config.apiBase}/api/v1/auth/mfa/verify`,
    {
      mfa_code: mfaCode
    },
    {
      headers: {
        'Authorization': 'Bearer ' + mfaToken
      }
    }
    );
    return { error: false, data: res.data }; 
  } catch(e) {
    return { error: true, message: e.response.data.message };
  }
 }

 function LoginForm() {
  const [mfaCode, setMfaCode] = useState("");
  const [mfaToken, setMfaToken] = useState("");
  const [message, setMessage] = useState("Odota hetki");
  useEffect(() => {
    const doIt = async () => {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let jwt = params.get('jwt');
      const res = await login(jwt);
      if (res.error) {
        let message = res.message;
        switch(message) {
          case 'No user found':
            message = 'Mikään käyttäjä ei vastaa Puavo-IDtä. Ota yhteys oppilaitokseen'
            break;
          default:
            break;
        }
        setMessage(message)
      } else {
        if(res.data.mfaToken) {
          setMfaToken(res.data.mfaToken);
        } else {
          localStorage.setItem('access', res.data.accessToken);
          localStorage.setItem('refresh', res.data.refreshToken);
          window.location.replace('/');
        }
      }
    }
    doIt();
  })
  const form = <>
    <p>{message}</p>
  </>;
  const mfaForm = <form
  method="POST"
  onSubmit={async (e) => {
    e.preventDefault();
    const res = await mfaVerify(mfaToken, mfaCode);
    if (res.error) {
      
    } else {
      localStorage.setItem('access', res.data.accessToken);
      localStorage.setItem('refresh', res.data.refreshToken);
      window.location.replace('/');
    }
  }}
  noValidate
  className="needs-validation"
  >
              <div className="form-group">
                <label htmlFor="username">2FA-koodi</label>
                <input
                  id="mfa"
                  type="text"
                  autoComplete="false"
                  autoCorrect="false"
                  className="form-control"
                  name="mfa"
                  tabIndex="1"
                  required
                  autoFocus
                  placeholder="XXXXXX"
                  onChange={e => setMfaCode(e.target.value)}
                />
                <div className="invalid-feedback">
                  Virheellinen koodi
                </div>
              </div>
  <div className="form-group">
    <button
      type="submit"
      className="btn btn-primary btn-lg btn-block"
      tabIndex="4"
    >
      Vahvista
    </button>
  </div>
  </form>;
    return (
      <>
        {mfaToken === "" ? form : mfaForm}
      </>
    )
}

export class LoginOpinsys extends Component {  
  currentYear() {
    return new Date().getFullYear();
  }

  render() {
    return (
      <div id="app">
        <section className="section">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="login-brand">
                  <img
                    src={require("../../../assets/img/ritta.svg")}
                    alt="logo"
                    width="175"
                  />
                </div>

                <div className="card card-primary">
                  <div className="card-header">
                    <h4><SchoolName /></h4>
                  </div>

                  <div className="card-body">
                    <LoginForm />
                  </div>
                </div>
                <div className="simple-footer">
                  Copyright &copy; Ritta {this.currentYear()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LoginOpinsys;
