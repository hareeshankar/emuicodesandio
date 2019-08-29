import React from "react";
import ReactDOM from "react-dom";
import AppBar from "./AppBar.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Home from "./home.js";
import ProtectedRoute from "./ProtectedRoute.js";
//import { Route, Switch, Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import "./styles.css";

const NoMatch = ({ location }) => {
  return (
    <div>
      <br /> <br /> <br />
      <h1>
        No match for <code>{location.pathname}</code>
      </h1>
    </div>
  );
};
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={SignIn} />
            <ProtectedRoute path="/home" component={Home} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
