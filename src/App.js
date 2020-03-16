import React, { Component } from "react";
import NavBar from "./components/navBar.jsx";
import auth from "./services/authService";
import LoginForm from "./components/loginForm";
import mapContainer from "./components/mapContainer";
import registerForm from "./components/registerForm";
import ProfileForm from "./components/profileForm";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
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
            <Route path="/map" component={mapContainer}></Route>
            <Route path="/signout" component={Logout} />
            <Route path="/signin" component={LoginForm} />
            <Route path="/signup" component={registerForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/profile" component={ProfileForm} />
            <Redirect from="/" exact to="/map" />
            <Redirect to="/map" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
