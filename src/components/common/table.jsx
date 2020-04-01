import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { columns, data, onSort, sortColumn, shadow } = this.props;
    return (
      <table
        className={"table " + (shadow ? "myShadow" : "")}
        style={{ backgroundColor: "#ffffff" }}
      >
        <TableHeader
          onSort={onSort}
          columns={columns}
          sortColumn={sortColumn}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
