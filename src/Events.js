import React, { Component } from "react";
import axios from "axios";
//import TableRow from "./TableRow";
import Typography from "@material-ui/core/Typography";
import { withContext } from "./AppContext";

class Events extends Component {
  /*
  tabRow() {
    return this.state.business.map(function(object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }
*/
  render() {
    return !this.props.events ? (
      <div>
        <h3 align="center">Business List</h3>
        <Typography variant="body1" gutterBottom>
          {JSON.stringify(this.props.events)}
        </Typography>
      </div>
    ) : (
      <div>
        <h3 align="center">Business List</h3>
        <Typography variant="body1" gutterBottom>
          No Events Added. Please add events !
        </Typography>
      </div>
    );
  }
}
export default withContext(Events);
