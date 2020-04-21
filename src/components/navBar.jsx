import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../media/fire-station1.svg";
import auth from "../services/authService";
import { getResizedImage } from "../utils/getImage";

const NavBar = ({ acc }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-info ">
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
          <React.Fragment>
            <ul className="navbar-nav mr-4">
              <li className="nav-item active row">
                <span className="nav-link">
                  &nbsp;Hệ Thống Tiếp Nhận Báo Cháy Khẩn Cấp
                </span>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto nav-flex-icons pr-2">
              <li className="nav-item active row">
                <NavLink className="nav-link btn btn-info" to="/signin">
                  <span>Đăng Nhập</span>
                </NavLink>
                &nbsp;
                <NavLink className="nav-link btn btn-warning" to="/signup">
                  <span className="text-dark">&nbsp;Đăng Ký&nbsp;</span>
                </NavLink>
              </li>
            </ul>
          </React.Fragment>
        )}
        {acc && (
          <React.Fragment>
            {auth.isSupervisor() && (
              <ul className="navbar-nav mr-4">
                <li className="nav-item active row">
                  <React.Fragment>
                    &nbsp;
                    <NavLink
                      className="nav-item nav-link btn btn-info"
                      to="/map"
                    >
                      Giám Sát Bản Đồ
                    </NavLink>
                    &nbsp;
                    <NavLink
                      className="nav-item nav-link btn btn-info"
                      to="/reports"
                    >
                      Quản Lý Báo Cáo
                    </NavLink>
                    &nbsp;
                    <NavLink
                      className="nav-item nav-link btn btn-info"
                      to="/users"
                    >
                      Quản Lý Người Dùng
                    </NavLink>
                    {/* <NavLink
                      className="nav-item nav-link btn btn-info"
                      to="/emergency-alert"
                    >
                      Emergency Alert
                    </NavLink> */}
                  </React.Fragment>
                </li>
              </ul>
            )}
            {auth.isAdmin() && (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active row">
                  <React.Fragment>
                    &nbsp;
                    <NavLink
                      className="nav-item nav-link btn btn-info"
                      to="/fire-station"
                    >
                      Cơ Sở PCCC
                    </NavLink>
                    &nbsp;
                    <NavLink
                      className="nav-item nav-link btn btn-info"
                      to="/supervisors"
                    >
                      Quản Lý Cán Bộ PCCC
                    </NavLink>
                  </React.Fragment>
                </li>
              </ul>
            )}
            <ul className="navbar-nav ml-auto nav-flex-icons">
              {acc.supervisor ? (
                <li className="nav-item active row mr-3">
                  <img
                    src={getResizedImage(acc.supervisor.avatar, 70, true)}
                    className="rounded-circle d-block"
                    alt="avatar"
                    style={{ width: "40px" }}
                  ></img>
                  &nbsp;
                  <NavLink
                    className="nav-item nav-link btn btn-info"
                    to="/profile"
                  >
                    {acc.name}
                  </NavLink>
                  &nbsp;
                </li>
              ) : (
                <li className="nav-item active row mr-3">
                  <img
                    src="https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/profile-avatar/male-avatar.png"
                    className="rounded-circle d-block"
                    alt="avatar"
                    style={{ width: "40px" }}
                  ></img>
                  &nbsp;
                  <span
                    className="nav-item nav-link btn btn-info"
                    to="/profile"
                  >
                    {acc.name}
                  </span>
                  &nbsp;
                </li>
              )}
              <li className="nav-item active row">
                <NavLink
                  className="nav-item nav-link btn btn-warning mr-2"
                  to="/signout"
                >
                  <span className="text-dark">Đăng Xuất</span>
                </NavLink>
              </li>
            </ul>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
