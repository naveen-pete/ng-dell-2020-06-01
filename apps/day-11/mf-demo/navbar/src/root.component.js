import React from "react";
import { Link } from "@reach/router";

import NavLink from './nav-link.component';

const navbarStyle = {
  backgroundColor: "#e3f2fd",
};

export default function Root(props) {
  return (
    <>
      <nav className="navbar navbar-light" style={navbarStyle}>
        <Link className="navbar-brand" to="/">
          <img
            src="https://single-spa.js.org/img/logo-white-bgblue.svg"
            className="d-inline-block align-top mr-2"
            height="30"
            width="30"
            alt=""
          />
          Micro Frontends Demo
        </Link>
        <em>{props.name} using React</em>
      </nav>

      <div className="bg-light p-2">
        <ul className="nav nav-pills justify-content-center">
          <li className="nav-item">
            <NavLink to="/">
              Home
          </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users">
              Users
          </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
