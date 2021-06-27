/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Search from "./Search";
import UserDropdown from "./UserDropdown";
import axios from 'axios';
import config from '../../../config.json'
import runScripts from '../../../js/js/scripts';
import { Link } from "react-router-dom";

const Header = ({ hideNav }) => {
  const [userDetail, setUserDetail] = React.useState("");

  const getData = async () => {
    const res = await axios.post(`${config.apiBase}/api/v1/user/info`, {}, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
    setUserDetail(res.data)
  }

  React.useEffect(()=>{
    getData()
  }, []);

  return (
    <div>
      <div className="navbar-bg"></div>
      <nav className="navbar navbar-expand-lg main-navbar">
        <a href="/" className="navbar-brand sidebar-gone-hide">
          <img onLoad={() => {runScripts()}} src={require('../../../assets/ritta.svg')} height={50} alt="Ritta logo" />
        </a>
        <div className="navbar-nav">
          <a href="#" className="nav-link sidebar-gone-show" data-toggle="sidebar"><i className="fas fa-bars"></i></a>
        </div>
        <form className="form-inline ml-auto">
          <ul className="navbar-nav">
            <li><a href="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none"><i className="fas fa-search"></i></a></li>
          </ul>
          <Search />
        </form>
        <ul className="navbar-nav navbar-right">
          <UserDropdown userDetail={userDetail} />
        </ul>
      </nav>
      <nav className="navbar navbar-secondary navbar-expand-lg">
        <div className="container">
          <ul className="navbar-nav" style={{
        display: hideNav ? 'none': null
      }}>
            <li className="nav-item">
              <Link
                to="/messages"
                className="nav-link"
              >
                <i className="fas fa-envelope"></i>
                <span>Viestit</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    );
};

export default Header;
