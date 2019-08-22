import React from "react";
import ReactDOM from "react-dom";
import AppBar from "./AppBar.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Home from "./home.js";
import Typography from "@material-ui/core/Typography";
import ProtectedRoute from "./ProtectedRoute.js";
import { Route, Switch, Redirect } from "react-router-dom";

import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={SignIn} />
          <ProtectedRoute path="/home" component={Home} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
