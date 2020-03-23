import React, { Component } from "react";
import Table from "../common/table";
import "@github/time-elements";
import { Link } from "react-router-dom";

class FiresTable extends Component {
  columns = [
    {
      path: "status",
      label: "Status"
    },
    {
      path: "longtitude",
      label: "Longtitude"
    },
    { path: "latitude", label: "Latitude" },
    {
      path: "evidences",
      label: "Evidences",
      content: fire => (
        <Link to={`/evidences/${fire._id}`}>
          {fire.evidences.length} evidence(s)
        </Link>
      )
    },
    {
      path: "createdAt",
      label: "Created At",
      content: fire => (
        <local-time
          month="long"
          day="numeric"
          year="numeric"
          hour="numeric"
          minute="numeric"
          time-zone-name="short"
          datetime={fire.createdAt}
        >
          {fire.createdAt}>
        </local-time>
      )
    }
  ];

  render() {
    const { fires, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={fires}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default FiresTable;
