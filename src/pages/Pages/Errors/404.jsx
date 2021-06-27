import React, { Component } from "react";
import { Link } from "react-router-dom";
import globalData from '../../../config.json';

export class Error404 extends Component {
  render() {
    return (
      <div id="app">
        <section class="section">
          <div class="container mt-5">
            <div class="page-error">
              <div class="page-inner">
                <h1>404</h1>
                <div class="page-description">
                  Sivua ei löytynyt
                </div>
                <div class="page-search">
                  <div class="mt-3">
                    <Link to="/">Takaisin etusivulle</Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="simple-footer mt-5">Copyright &copy; <a href="https://ritta.pw">Ritta</a> 2021</div>

          </div>
        </section>
      </div>
    );
  }
}

export default Error404;
