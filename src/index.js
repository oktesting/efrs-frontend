import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import LoginForm from './components/loginForm';
import mapContainer from './components/mapContainer';
import registerForm from './components/registerForm';

const routing = (
    <Router>
        <div>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/map" component={mapContainer}></Route>
            <Route path="/signup" component={registerForm}></Route>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
