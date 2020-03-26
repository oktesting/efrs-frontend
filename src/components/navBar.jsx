import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../media/fire-station1.svg";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <NavLink className="navbar-brand" to="/homepage">
        <img src={logo} alt="logo" height="40" />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/signin">
                Sign In
              </NavLink>
              <NavLink className="nav-item nav-link" to="/signup">
                Sign Up
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              {user.supervisor && (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/map">
                    Supervise Map
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/users">
                    Manage Users
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/emergency-alert">
                    Emergency Alert
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/reports">
                    Fire Reports
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/fire-station">
                    Fire Station
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/supervisors">
                    Manage Supervisors
                  </NavLink>
                </React.Fragment>
              )}
              <NavLink className="nav-item nav-link pull-right" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link pull-right" to="/signout">
                Sign out
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
