import React, { Component } from "react";
import auth from "./services/authService";
import NavBar from "./components/navBar.jsx";
import LoginForm from "./components/account/loginForm";
import MapContainer from "./components/superviseMap/mapContainer";
import RegisterForm from "./components/account/registerForm";
import EmergencyAlertForm from "./components/emergencyAlert/emergencyAlertForm";
import FireStationForm from "./components/admin/fireStationForm";
import NotFound from "./components/notFound";
import Logout from "./components/account/logout";
import ProfileForm from "./components/account/profileForm";
import Homepage from "./components/homepage.jsx";
import Users from "./components/manageUsers/users.jsx";
import FireStations from "./components/admin/fireStations";
import UserInfo from "./components/manageUsers/userInfo";
import Evidences from "./components/manageUsers/evidences";
import ProtectedRoute from "./components/common/protectedRoute";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main>
          <Switch>
            <Route path="/homepage" exact component={Homepage} />
            <Route path="/signin" exact component={LoginForm} />
            <Route path="/signup" exact component={RegisterForm} />
            <Route path="/signout" exact component={Logout} />
            <ProtectedRoute
              path="/fire-station/new"
              exact
              component={FireStationForm}
            />
            <ProtectedRoute path="/map" exact component={MapContainer} />
            <ProtectedRoute path="/profile" exact component={ProfileForm} />
            <ProtectedRoute
              path="/emergency-alert"
              exact
              component={EmergencyAlertForm}
            />
            <ProtectedRoute path="/users/:id" exact component={UserInfo} />
            <ProtectedRoute path="/users" exact component={Users} />
            <ProtectedRoute
              path="/fire-station"
              exact
              component={FireStations}
            />
            <ProtectedRoute path="/evidences/:id" exact component={Evidences} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/homepage" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
