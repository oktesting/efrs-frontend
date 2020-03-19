import React, { Component } from "react";
import NavBar from "./components/navBar.jsx";
import auth from "./services/authService";
import LoginForm from "./components/loginForm";
import MapContainer from "./components/mapContainer";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import ProfileForm from "./components/profileForm";
import Homepage from "./components/homepage.jsx";
import Users from "./components/users.jsx";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";

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
            <ProtectedRoute path="/map" exact component={MapContainer} />
            <ProtectedRoute path="/profile" exact component={ProfileForm} />
            <ProtectedRoute path="/users" exact component={Users} />
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
