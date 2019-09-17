import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
/*
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})); */
class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete(
        "https://eventmanagerapi.herokuapp.com/api/events/" +
          this.props.obj.id +
          "?access_token=" +
          this.props.token
      )
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }
  render() {
    // const classes = useStyles();
    return (
      <tr>
        <td>{this.props.obj.eventname}</td>
        <td>{this.props.obj.eventdate.slice(0, 10)}</td>
        <td>{this.props.obj.eventloc}</td>
        <td>{this.props.obj.eventdes}</td>
        <td>
          <Button
            variant="contained"
            color="primary"
            // className={classes.button}
          >
            <Link to={"/edit/" + this.props.obj.id}>Edit</Link>
          </Button>
        </td>
        <td>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //  className={classes.submit}
            onClick={this.delete}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
