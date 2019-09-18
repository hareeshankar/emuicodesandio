import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import indigo from "@material-ui/core/colors/indigo";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { withContext } from "./AppContext";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  root: {
    flexGrow: 1,
    position: "absolute",
    zIndex: 0
  }
};
const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: deepPurple
  }
});

const SignOutBtn = ({ token, logout, usern }) => {
  // This is a dumb "stateless" component
  return token ? (
    //    <div>
    //     <Typography component="h1" variant="h5">
    //        Welcome {this.props.user.username} !
    //</Typography>
    <div className="buttonnavbar">
      <Typography component="h1" variant="h5">
        Hello {usern} !{" "}
      </Typography>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={logout}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </div>
  ) : //    </div>
  null;
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
            <SignOutBtn
              token={props.token}
              logout={props.logout}
              usern={props.user.username}
            />
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
