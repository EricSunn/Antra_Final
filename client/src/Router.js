import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthContext from "./context/AuthContext";
import Todo from "./components/todo/Todo";
import Manage from "./components/manage/Manage";

function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="main">
        <div className="container-fluid text-center  col-sm-6 col-2 offset-4 offset-sm-3">
          <Switch>
            <Route exact path="/">
              <div>Home</div>
            </Route>
            {loggedIn === "none" && (
              <>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </>
            )}

            {loggedIn === "user" && (
              <>
                <Route path="/todos">
                  <Todo />
                </Route>
              </>
            )}

            {loggedIn === "admin" && (
              <>
                <Route path="/manage">
                  <Manage />
                </Route>
              </>
            )}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Router;
