import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Todo from "./components/todo/Todo";
import Manage from "./components/manage/Manage";
import Home from "./components/manage/Home";
import Store from "./components/Redux/Store";

function Router() {
  const [role, setRole] = useState(0);
  Store.subscribe(() => {
    setRole(role + 1);
  });

  return (
    <BrowserRouter>
      <Navbar />
      <div className="main">
        <div className="container-fluid text-center  col-sm-6 col-2 offset-4 offset-sm-3">
          <Switch>
            <Route exact path="/">
              <div>
                <Home />
              </div>
            </Route>
          </Switch>
          {Store.getState().role === "none" && (
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          )}

          {Store.getState().role === "user" && (
            <Switch>
              <Route path="/todos">
                <Todo />
              </Route>
            </Switch>
          )}

          {Store.getState().role === "admin" && (
            <Switch>
              <Route path="/manage">
                <Manage />
              </Route>
            </Switch>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Router;
