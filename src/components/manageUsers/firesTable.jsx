import React, { Component } from "react";
import Table from "../common/table";
import "@github/time-elements";
import { Link } from "react-router-dom";

class FiresTable extends Component {
  columns = [
    {
      path: "status",
      label: "Trạng Thái",
    },
    {
      path: "longtitude",
      label: "Kinh Độ",
    },
    { path: "latitude", label: "Vĩ Độ" },
    {
      path: "evidences",
      label: "Bằng Chứng",
      content: (fire) => (
        <Link to={`/evidences/${fire._id}`}>Có {fire.evidences.length}</Link>
      ),
    },
    {
      path: "createdAt",
      label: "Thời Điểm Cháy",
      content: (fire) => (
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
      ),
    },
  ];

  render() {
    const { fires, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={fires}
        onSort={onSort}
        sortColumn={sortColumn}
        shadow={false}
      />
    );
  }
}

export default FiresTable;
