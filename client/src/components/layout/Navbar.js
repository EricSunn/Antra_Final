import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";

function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">Home</Link>
      {loggedIn === "none" && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Log in</Link>
        </>
      )}
      {loggedIn === "user" && (
        <>
          <Link to="/todos">Todos </Link>
          <LogOutBtn />
        </>
      )}
    </div>
  );
}

export default Navbar;
