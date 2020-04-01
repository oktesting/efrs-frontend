import React, { Component } from "react";
import Table from "../common/table";
import { Link } from "react-router-dom";

class ReportsTable extends Component {
  columns = [
    {
      path: "location",
      label: "Location",
      content: report => (
        <Link to={`/reports/${report._id}`}>{report.location}</Link>
      )
    },
    { path: "duration", label: "Processing Time" },
    {
      path: "evidences",
      label: "Evidences",
      content: report => (
        <Link to={`/evidences/${report.fire._id}`}>
          {report.fire.evidences.length} evidence(s)
        </Link>
      )
    },
    {
      path: "createdAt",
      label: "Created At",
      content: report => (
        <local-time
          month="long"
          day="numeric"
          year="numeric"
          hour="numeric"
          minute="numeric"
          time-zone-name="short"
          datetime={report.createdAt}
        >
          {report.createdAt}>
        </local-time>
      )
    },
    {
      label: "Edit",
      key: "edit",
      content: report => (
        <button
          className="btn btn-primary"
          onClick={() => this.props.onItemEdit(report._id)}
        >
          <i className="fa fa-pencil"></i>
        </button>
      )
    },
    {
      label: "Delete",
      key: "delete",
      content: report => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onItemDelete(report._id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      )
    }
  ];

  render() {
    const { reports, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={reports}
        onSort={onSort}
        sortColumn={sortColumn}
        shadow={true}
      />
    );
  }
}

export default ReportsTable;
