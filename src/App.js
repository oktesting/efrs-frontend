import React, { Component } from "react";
import NavBar from "./components/navBar.jsx";
import auth from "./services/authService";
import LoginForm from "./components/loginForm";
import mapContainer from "./components/mapContainer";
import registerForm from "./components/registerForm";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import ProfileForm from "./components/profileForm";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import Homepage from "./components/homepage.jsx";

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
            <Route path="/signin" exact component={LoginForm} />
            <Route path="/signup" exact component={registerForm} />
            <Route path="/signout" exact component={Logout} />
            <Route path="/homepage" exact component={Homepage} />
            <ProtectedRoute path="/map" exact component={mapContainer} />
            <ProtectedRoute path="/profile" exact component={ProfileForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/map" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
