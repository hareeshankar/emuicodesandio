import React from "react";
import MaterialTable from "material-table";

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Event Name", field: "eventname" },
      { title: "Date", field: "eventdate" },
      { title: "Location", field: "eventloc" },
      { title: "Description", field: "eventdes" }
    ],
    data: [
      { eventname: "Mehmet", eventdate: "Baran", eventloc: 1987, eventdes: 63 },
      {
        eventname: "Hospitality",
        eventdate: "2019-08-27",
        eventloc: "Chennai",
        eventdes: "Manage hospitality for Shravans Wedding"
      }
    ]
  });

  return (
    <MaterialTable
      title="Events"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
}
