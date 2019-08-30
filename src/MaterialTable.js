import React from "react";
import MaterialTable from "material-table";
import withStyles from "@material-ui/core/styles/withStyles";
import { withContext } from "./AppContext";

const styles = theme => ({});

class MaterialTableE extends React.Component {
  constructor(props) {
    super(props);
    this.props.getEvents(this.props.user.userId);
    this.state = {
      columns: this.props.eventscols,
      data: this.props.eventsdata
    };
  }

  render() {
    return (
      <MaterialTable
        title="Editable Example"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data.push(newData);
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data[data.indexOf(oldData)] = newData;
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data.splice(data.indexOf(oldData), 1);
                this.setState({ ...this.state, data });
              }, 600);
            })
        }}
      />
    );
  }
}
const MaterialTableStyles = withStyles(styles)(MaterialTableE);

export default withContext(MaterialTableStyles);
