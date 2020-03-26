import React, { Component } from "react";
import auth from "./services/authService";
import NavBar from "./components/navBar.jsx";
import LoginForm from "./components/account/loginForm";
import MapContainer from "./components/superviseMap/mapContainer";
import RegisterForm from "./components/account/registerForm";
import EmergencyAlertForm from "./components/emergencyAlert/emergencyAlertForm";
import NotFound from "./components/notFound";
import Logout from "./components/account/logout";
import ProfileForm from "./components/account/profileForm";
import Homepage from "./components/homepage.jsx";
import Users from "./components/manageUsers/users.jsx";
import Supervisors from "./components/admin/manageSupervisors/supervisors.jsx";
import SupervisorsInfo from "./components/admin/manageSupervisors/supervisorsInfo.jsx";
import FireStationForm from "./components/admin/fireStationForm";
import FireStations from "./components/admin/fireStations";
import UserInfo from "./components/manageUsers/userInfo";
import Evidences from "./components/manageUsers/evidences";
import Reports from "./components/manageReports/reports";
import ProtectedRoute from "./components/common/protectedRoute";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReportForm from "./components/manageReports/reportForm";

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
            <ProtectedRoute path="/profile" exact component={ProfileForm} />
            <ProtectedRoute path="/map" exact component={MapContainer} />
            <ProtectedRoute path="/reports" exact component={Reports} />
            <ProtectedRoute path="/reports/new" exact component={ReportForm} />
            <ProtectedRoute
              path="/emergency-alert"
              exact
              component={EmergencyAlertForm}
            />
            <ProtectedRoute path="/users/:id" exact component={UserInfo} />
            <ProtectedRoute path="/users" exact component={Users} />
            <ProtectedRoute path="/supervisors" exact component={Supervisors} />
            <ProtectedRoute
              path="/supervisors/:id"
              exact
              component={SupervisorsInfo}
            />
            <ProtectedRoute
              path="/fire-station/new"
              exact
              component={FireStationForm}
            />
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
