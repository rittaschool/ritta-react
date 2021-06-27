/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { searchResultData } from "./Data";
import Search from "./Search";
import UserDropdown from "./UserDropdown";
import axios from 'axios';
import config from '../../../config.json'
// import Auth from '../../../../config/auth';
import runScripts from '../../../js/js/scripts';

const Header = () => {
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
  },[]);

  return (
    <div>
      <div className="navbar-bg"></div>
      <nav className="navbar navbar-expand-lg main-navbar">
        <a href="/" className="navbar-brand sidebar-gone-hide">
          <img onLoad={() => {runScripts()}} src={require('../../../assets/ritta-white.png')} height={50} alt="Ritta logo" />
        </a>
        <div className="navbar-nav">
          <a href="#" className="nav-link sidebar-gone-show" data-toggle="sidebar"><i className="fas fa-bars"></i></a>
        </div>
        <form className="form-inline ml-auto">
          <ul className="navbar-nav">
            <li><a href="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none"><i className="fas fa-search"></i></a></li>
          </ul>
          <Search searchResultData={searchResultData} />
        </form>
        <ul className="navbar-nav navbar-right">
          <UserDropdown userDetail={userDetail} />
        </ul>
      </nav>

      <nav className="navbar navbar-secondary navbar-expand-lg">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a data-toggle="dropdown" className="nav-link has-dropdown"><i className="fas fa-fire"></i><span>Ritta</span></a>
              <ul className="dropdown-menu">
                <li className="nav-item"><a href="index-0.html" className="nav-link">General Dashboard</a></li>
                <li className="nav-item"><a href="index.html" className="nav-link">Ecommerce Dashboard</a></li>
              </ul>
            </li>
            <li className="nav-item active">
              <a href="/" className="nav-link"><i className="far fa-heart"></i><span>Top Navigation</span></a>
            </li>
            <li className="nav-item dropdown">
              <a href="/" data-toggle="dropdown" className="nav-link has-dropdown"><i className="far fa-clone"></i><span>Multiple Dropdown</span></a>
              <ul className="dropdown-menu">
                <li className="nav-item"><a href="/" className="nav-link">Not Dropdown Link</a></li>
                <li className="nav-item dropdown"><a href="/" className="nav-link has-dropdown">Hover Me</a>
                  <ul className="dropdown-menu">
                    <li className="nav-item"><a href="/" className="nav-link">Link</a></li>
                    <li className="nav-item dropdown"><a href="/" className="nav-link has-dropdown">Link 2</a>
                      <ul className="dropdown-menu">
                        <li className="nav-item"><a href="/" className="nav-link">Link</a></li>
                        <li className="nav-item"><a href="/" className="nav-link">Link</a></li>
                        <li className="nav-item"><a href="/" className="nav-link">Link</a></li>
                      </ul>
                    </li>
                    <li className="nav-item"><a href="/" className="nav-link">Link 3</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    );
};

export default Header;
