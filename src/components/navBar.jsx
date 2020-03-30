import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../media/fire-station1.svg";
import auth from "../services/authService";
import { getSquareImage } from "../utils/getImage";

const NavBar = ({ acc }) => {
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
        {!acc && (
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <li className="nav-item active row">
              <React.Fragment>
                <NavLink className="nav-link" to="/signin">
                  Sign In
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </React.Fragment>
            </li>
          </ul>
        )}
        {acc && (
          <React.Fragment>
            {auth.isSupervisor() && (
              <ul className="navbar-nav mr-4">
                <li className="nav-item active row">
                  <React.Fragment>
                    <NavLink className="nav-item nav-link" to="/map">
                      Supervise Map
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/reports">
                      Fire Reports
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/users">
                      Manage Users
                    </NavLink>
                    <NavLink
                      className="nav-item nav-link"
                      to="/emergency-alert"
                    >
                      Emergency Alert
                    </NavLink>
                  </React.Fragment>
                </li>
              </ul>
            )}
            {auth.isAdmin() && (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active row">
                  <React.Fragment>
                    <NavLink className="nav-item nav-link" to="/fire-station">
                      Fire Station
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/supervisors">
                      Manage Supervisors
                    </NavLink>
                  </React.Fragment>
                </li>
              </ul>
            )}
            <ul className="navbar-nav ml-auto nav-flex-icons">
              {acc.supervisor ? (
                <div className="row">
                  <img
                    src={getSquareImage(acc.supervisor.avatar, 300)}
                    className="rounded-circle img-thumbnail d-block"
                    alt="avatar"
                    style={{ width: "64px" }}
                  ></img>
                  <NavLink className="nav-item nav-link p-3" to="/profile">
                    {acc.name}
                  </NavLink>
                </div>
              ) : (
                <div className="row">
                  <img
                    src="https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/profile-avatar/male-avatar.png"
                    className="rounded-circle img-thumbnail d-block"
                    alt="avatar"
                    style={{ width: "64px" }}
                  ></img>
                  <span className="nav-item nav-link p-3" to="/profile">
                    {acc.name}
                  </span>
                </div>
              )}

              <NavLink className="nav-item nav-link p-3" to="/signout">
                Sign out
              </NavLink>
            </ul>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
