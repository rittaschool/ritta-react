import React, { Component, useState, useEffect } from "react";
import config from '../../../config.json';
import axios from "axios";

function Link() {
  const [opinsysOrganization, setOpinsysOrganization] = useState("");

  const getData = async () => {
    const res = await axios.get(`${config.apiBase}/api/v1/info`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    setOpinsysOrganization(res.data.school.opinsysOrganization)
  }

  useEffect(()=>{
    getData()
  },[]);

  return (
    opinsysOrganization === "" ? <> </> :
    <a class="btn btn-primary btn-lg btn-block" tabindex="4" href={`https://api.opinsys.fi/v3/sso?organisation=${opinsysOrganization}&return_to=${window.location.origin}/opinsys`}>
      <img src={require('../../../assets/img/logo/opinsys.svg')} height="30" alt="Opinsys logo" />
    </a>
  );
}

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
            <Link />
          </div>
        </div>
      </>
    )
  }
}

export default ThirdPartyAuth;