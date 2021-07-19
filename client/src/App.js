import React, { useEffect } from "react";
import Router from "./Router";
import axios from "axios";
import Store from "./components/Redux/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

axios.defaults.withCredentials = true;

function App() {
  async function init() {
    const loggedInRes = await axios
      .get("http://localhost:5000/auth/loggedIn")
      .then((data) => data.data);
    Store.dispatch({ type: "log", payload: loggedInRes });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
