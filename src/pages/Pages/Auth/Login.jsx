import React, { Component } from "react";
import $ from "jquery";
import ThirdPartyAuth from "./ThirdPartyAuth";
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
                    src="../assets/img/stisla-fill.svg"
                    alt="logo"
                    width="100"
                    className="shadow-light rounded-circle"
                  />
                </div>

                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Login</h4>
                  </div>

                  <div className="card-body">
                    <form
                      method="POST"
                      action="#"
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
                    <ThirdPartyAuth />
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
