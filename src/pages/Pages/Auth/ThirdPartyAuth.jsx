import React, { Component } from "react";

export class ThirdPartyAuth extends Component {
  render() {
    return (
      <>
        <div className="text-center mt-4 mb-3">
          <div className="text-job text-muted">
            Tunnistaudu käyttäen
          </div>
        </div>
        <div className="row sm-gutters">
          <div className="col-12">
            <a class="btn btn-primary btn-lg btn-block" tabindex="4" href="https://api.opinsys.fi/v3/sso?organisation=demo.opinsys.fi&amp;return_to=http://rittademo.herokuapp.com/account/opinsys">
              <img src={require('../../../assets/img/logo/opinsys.svg')} height="30" alt="Opinsys logo" />
            </a>
          </div>
        </div>
      </>
    )
  }
}

export default ThirdPartyAuth;