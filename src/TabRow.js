import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete(
        "https://eventmanagerapi.herokuapp.com/api/events/" +
          this.props.events.id +
          "?access_token=" +
          this.props.token
      )
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <tr>
        <td>{this.props.events.eventname}</td>
        <td>{this.props.events.eventdate}</td>
        <td>{this.props.events.eventloc}</td>
        <td>{this.props.events.id}</td>
        <td>
          <Link
            to={"/edit/" + this.props.events.id}
            className="btn btn-primary"
          >
            Edit
          </Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
