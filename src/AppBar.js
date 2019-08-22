import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import indigo from "@material-ui/core/colors/indigo";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { withContext } from "./AppContext";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 0
  }
};
const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: deepPurple
  }
});
const SignOutBtn = ({ token, logout }) => {
  // This is a dumb "stateless" component
  return token ? (
    <div className="buttonnavbar">
      <Button variant="contained" color="secondary">
        <span href="javascript:;" onClick={logout}>
          Sign out
        </span>
      </Button>
    </div>
  ) : null;
};
function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar>
          <div className="flexbox">
            <div className="typonav" color="inherit">
              <span>Event Manager</span>
            </div>
            <SignOutBtn token={props.token} logout={props.logout} />
          </div>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const sabwst = withStyles(styles)(SimpleAppBar);
export default withContext(sabwst);
