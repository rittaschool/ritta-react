import React from "react";
import globalData from '../../../globalData';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-left">
        Copyright &copy; <a href="https://ritta.pw">Ritta</a> 2021<div className="bullet" /> Template (Stisla) By Muhamad Nauval Azhar{" "}
      </div>{" "}
      <div className="footer-right">{globalData.version}</div>{" "}
    </footer>
  );
}
