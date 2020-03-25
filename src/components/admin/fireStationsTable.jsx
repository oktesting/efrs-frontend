import React, { Component } from "react";
import Table from "../common/table";

class FireStationsTable extends Component {
  columns = [
    {
      path: "address",
      label: "Fire Station"
    },
    { path: "district", label: "District" },
    {
      key: "delete",
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
