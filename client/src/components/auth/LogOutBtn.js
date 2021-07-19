import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Store from "../Redux/Store";

function LogOutBtn() {
  const history = useHistory();
  async function logOut() {
    await axios.get("http://localhost:5000/auth/logout");
    const loggedInRes = await axios
      .get("http://localhost:5000/auth/loggedIn")
      .then((data) => data.data);
    Store.dispatch({ type: "log", payload: loggedInRes });
    history.push("/");
    Store.dispatch({ type: "title", payload: "Note System" });
  }

  return <button onClick={logOut}>Log out</button>;
}

export default LogOutBtn;
