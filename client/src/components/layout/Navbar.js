import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";

function Navbar() {
  const { loggedIn, userName } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="nav_item text-start col-sm-6 col-md-6">
        <Link to="/">Home</Link>
        {loggedIn === "user" && (
          <>
            <Link to="/todos">Todos </Link>
          </>
        )}
        {loggedIn === "admin" && (
          <>
            <Link to="/manage">manage </Link>
          </>
        )}
      </div>
      <div className="nav_item text-end col-sm-6 col-md-6">
        {loggedIn === "none" && (
          <>
            <Link to="/register" userName={userName}>
              Register
            </Link>
            <Link to="/login" userName={userName}>
              Log in
            </Link>
          </>
        )}
        {loggedIn !== "none" && (
          <>
            <div className="welcome col-sm-6 col-md-6">
              <span>Hi,{userName}</span>
            </div>
            <LogOutBtn />
          </>
        )}
      </div>
      <div className="title col-sm-12">
        <h1>Note System</h1>
      </div>
    </div>
  );
}

export default Navbar;
