import React, { Component } from "react";
import { Link } from "react-router-dom";

export class UserDropdown extends Component {
  render() {
    const { userDetail } = this.props;
    return (
      Object.keys(userDetail).length === 0 ? <></> :
      <li className="dropdown">
        <a
          href="/"
          data-toggle="dropdown"
          className="nav-link dropdown-toggle nav-link-lg nav-link-user"
        >
          <div className="d-sm-none d-lg-inline-block">
            {userDetail.user.firstName} {userDetail.user.lastName}
          </div>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <div className="dropdown-title">
            Pikavaihda käyttäjää
          </div>

          {userDetail.accounts.map((data, idata) => {
            return (
              <Link
                key={idata}
                onClick={() => {
                  localStorage.setItem('currentUser', data.id)
                  window.location.replace('/home')
                }}
                to="#"
                activeStyle={{
                  color: "#20bba6",
                }}
                exact
                className="dropdown-item has-icon"
              >
                <i className="far fa-user"></i> {data.firstName} {data.lastName}
              </Link>
            );
          })}

          <div className="dropdown-divider" />
          <a
            href="/"
            className="dropdown-item has-icon text-danger"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <i className='fas fa-sign-out-alt' /> Kirjaudu ulos
          </a>
        </div>
      </li>
    );
  }
}

export default UserDropdown;
