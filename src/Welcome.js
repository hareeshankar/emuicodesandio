import React from "react";
import ReactDOM from "react-dom";
import { withContext } from "./AppContext";
import Button from "@material-ui/core/Button";
import { MaterialTable } from "./Materialtable";

const Welcome = props => {
  // This is a dumb "stateless" component
  return (
    <div className="white-text">
      Welcome <strong>{props.user.username}</strong>! <br />
      <br />
      <p>{JSON.stringify(props.user)}</p> <br />
      <br />
      <p>Token : {props.token} </p>
      <br />
      <Button variant="contained" color="primary" onClick="props.logout">
        Sign Out
      </Button>
      <MaterialTable />
    </div>
  );
};

export default withContext(Welcome);
