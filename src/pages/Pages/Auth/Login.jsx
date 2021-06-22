import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import ThirdPartyAuth from "./ThirdPartyAuth";
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

function ThirdParty() {
  const [opinsysEnabled, setOpinsysEnabled] = useState(false);

  const getData = async () => {
    const res = await axios.get(`${config.apiBase}/api/v1/info`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    console.log(res.data)
    setOpinsysEnabled(res.data.school.opinsysEnabled)
  }

  useEffect(()=>{
    getData()
  },[]);

  return (
    <>
    { opinsysEnabled ? <ThirdPartyAuth /> : <></>}
    </>
  )
}
async function login(username, password) {
  try {
    const res = await axios.post(`${config.apiBase}/api/v1/auth/login`,
    {
      username,
      password
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
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaToken, setMfaToken] = useState("");

  const form = <>
    <form
  method="POST"
  onSubmit={async (e) => {
    e.preventDefault();
    const res = await login(username, password);
    if (res.error) {
      
    } else {
      if(res.data.mfaToken) {
        setMfaToken(res.data.mfaToken);
      } else {
        localStorage.setItem('access', res.data.accessToken);
        localStorage.setItem('refresh', res.data.refreshToken);
        window.location.reload();
      }
    }
  }}
  noValidate
  className="needs-validation"
>
              <div className="form-group">
                <label htmlFor="username">Käyttäjänimi</label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  name="username"
                  tabIndex="1"
                  required
                  autoFocus
                  onChange={e => setUserName(e.target.value)}
                />
                <div className="invalid-feedback">
                  Virheellinen käyttäjänimi
                </div>
              </div>

              <div className="form-group">
                <div className="d-block">
                  <label htmlFor="password" className="control-label">
                    Salasana
                  </label>
                </div>
      <input
        id="password"
        type="password"
        className="form-control"
        name="password"
        tabIndex="2"
        required
        onChange={e => setPassword(e.target.value)}
      />
      <div className="invalid-feedback">
        Virheellinen salasana.
    </div>
  </div>
  <div className="form-group">
    <button
      type="submit"
      className="btn btn-primary btn-lg btn-block"
      tabIndex="4"
    >
      Kirjaudu
    </button>
  </div>
</form>
<ThirdParty />
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
      window.location.reload();
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
export class Login extends Component {  
  componentDidMount() {
    $(".needs-validation").submit(function(event) {
      let form = $(this);
      if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.addClass("was-validated");
    });
  }

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
                <div className="mt-5 text-muted text-center">
                  Mikäli unohdit salasanasi, ota yhteys oppilaitokseen.
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

export default Login;
