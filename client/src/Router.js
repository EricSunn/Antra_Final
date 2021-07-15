import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthContext from "./context/AuthContext";

function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>
        {loggedIn === false && (
          <>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </>
        )}

        {loggedIn === true && (
          <>
            <Route path="/customers">
              <div>Customers</div>
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
