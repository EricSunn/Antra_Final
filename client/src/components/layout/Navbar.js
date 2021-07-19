import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutBtn from "../auth/LogOutBtn";
import Store from "../Redux/Store";

function Navbar() {
  const [update, forceupdate] = useState(0);
  Store.subscribe(() => {
    forceupdate(update + 1);
  });

  return (
    <div className="header">
      <div className="nav_item text-start col-sm-6 col-md-6">
        <Link
          to="/"
          onClick={(e) => {
            Store.dispatch({ type: "title", payload: "Note System" });
          }}
        >
          Home
        </Link>
        {Store.getState().role === "user" && (
          <>
            <Link
              to="/todos"
              onClick={(e) => {
                Store.dispatch({ type: "title", payload: "Todos" });
              }}
            >
              Todos{" "}
            </Link>
          </>
        )}
        {Store.getState().role === "admin" && (
          <>
            <Link
              to="/manage"
              onClick={(e) => {
                Store.dispatch({ type: "title", payload: "Manage User" });
              }}
            >
              manage{" "}
            </Link>
          </>
        )}
      </div>
      <div className="nav_item text-end col-sm-6 col-md-6">
        {Store.getState().role === "none" && (
          <>
            <Link
              to="/register"
              onClick={(e) => {
                Store.dispatch({ type: "title", payload: "Sign up" });
              }}
            >
              Register
            </Link>
            <Link
              to="/login"
              onClick={(e) => {
                Store.dispatch({ type: "title", payload: "Sign in" });
              }}
            >
              Log in
            </Link>
          </>
        )}
        {Store.getState().role !== "none" && (
          <>
            <div className="welcome col-sm-6 col-md-6">
              <span>Hi,{Store.getState().user}</span>
            </div>
            <LogOutBtn />
          </>
        )}
      </div>
      <div className="title col-sm-12">
        <h1>{Store.getState().title}</h1>
      </div>
    </div>
  );
}

export default Navbar;
