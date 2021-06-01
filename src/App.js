import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";


import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import Dogs from "./components/Dogs";
import Cats from "./components/Cats";
import NewPet from "./components/NewPet";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (user) {
      setCurrentUser(user);
      console.log("user " +user)
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div>
      <nav id="navigation" className="navbar navbar-expand">
        <div className="navbar-nav navbar-dark mr-auto">

          <li>
            <Link to={"/home"} className="nav-link"> Home </Link>
          </li>

          <li>
            <Link to={"/dogs"} className="nav-link"> Dogs </Link>
          </li>

          <li>
            <Link to={"/cats"} className="nav-link"> Cats </Link>
          </li>

          {currentUser && (
            <li>
              <Link to={"/profile"} className="nav-link"> Profile </Link>
            </li>
          )}

          { currentUser && currentUser.admin && (
            <li>
              <Link to={"/add-pet"} className="nav-link"> Add pet </Link>
            </li>
          )}

        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li>
              <a href="/login" className="nav-link" onClick={logout}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li>
              <Link to={"/login"} className="nav-link"> Login </Link>
            </li>

            <li>
              <Link to={"/register"} className="nav-link"> Register </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Homepage} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dogs" component={Dogs} />
          <Route exact path="/cats" component={Cats} />
          <Route exact path="/add-pet" component={NewPet} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
