import React, { Component } from "react";
import Table from "../common/table";

class FireStationsTable extends Component {
  columns = [
    {
      path: "address",
      label: "Station"
    },
    {
      path: "lat",
      label: "Latitude"
    },
    { path: "lng", label: "Longitude" },
    { path: "province", label: "Province" },
    { path: "district", label: "District" },
    {
      label: "Delete",
      content: station => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onItemDelete(station._id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      )
    }
  ];
  // constructor() {
  //   super();
  // const user = auth.getCurrentUser();
  // if (user && user.isAdmin) this.columns.push(this.deleteColum);
  // }
  render() {
    const { fireStations, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={fireStations}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default FireStationsTable;
