import React from "react";
import { withContext } from "./AppContext";
//import Button from "@material-ui/core/Button";

const Welcome = props => {
  // This is a dumb "stateless" component
  return (
    <div className="white-text">
      <Events />
    </div>
  );
};

export default withContext(Welcome);
