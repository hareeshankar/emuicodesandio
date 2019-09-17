import React, { Component } from "react";
//import TableRow from "./TableRow";
import Typography from "@material-ui/core/Typography";
import { withContext } from "./AppContext";
import TableRow from "./TabRow";
//import axios from "axios";

//const eAxios = axios.create();
class Events extends Component {
  /* constructor() {
    super();
    //  NProgress.configure({ showSpinner: false });
    this.state = {
      eventsst: [],
      showevents: false
    };
  }
  componentDidMount() {
    let getEventsURL =
      'https://eventmanagerapi.herokuapp.com/api/events?filter={"where" : {"userId" : "' +
      this.props.user.userId +
      '" }}&access_token=' +
      this.props.token;
    eAxios
      .get(getEventsURL)
      .then(response => {
        this.setState({ eventsst: response.data });
        console.log("response received:", response);
        console.log("events retrieved: ", this.state.eventsst);
        if (
          typeof this.state.eventsst != "undefined" &&
          this.state.eventsst != null &&
          this.state.eventsst.length != null &&
          this.state.eventsst.length > 0
        ) {
          console.log("Entered If block true");
          this.setState({ showevents: true });
        } else {
          console.log("Entered If block false");
          this.setState({ showevents: false });
        }
      })
      .catch(function(error) {
        console.log("AXIOS ERROR: ", error);
      });
  }
   */
  tabRow(events, token1) {
    return events.map(function(object, i) {
      return <TableRow obj={object} key={i} token={token1} />;
    });
  }

  render() {
    return this.props.showevents ? (
      <div>
        <table style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Event Location</th>
              <th colSpan="2">Event Description</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.tabRow(this.props.events, this.props.token)}</tbody>
        </table>
        {JSON.stringify(this.props.events)}
        <br />
        {JSON.stringify(this.props.showevents)}
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
