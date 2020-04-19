import React, { Component } from "react";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

class ReportsTable extends Component {
  columns = [
    {
      path: "location",
      label: "Địa Điểm",
      content: (report) => (
        <Link to={`/reports/${report._id}`}>{report.location}</Link>
      ),
    },
    { path: "duration", label: "THời Gian Xử Lý" },
    {
      path: "evidences",
      label: "Bằng Chứng",
      content: (report) => (
        <Link to={`/evidences/${report.fire._id}`}>
          {report.fire.evidences.length} evidence(s)
        </Link>
      ),
    },
    {
      path: "createdAt",
      label: "Thời Điểm Xảy Ra",
      content: (report) => (
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
      ),
    },
    {
      label: "Sửa",
      key: "edit",
      content: (report) => (
        <button
          className="btn btn-primary"
          onClick={() => this.props.onItemEdit(report._id)}
        >
          <i className="fa fa-pencil"></i>
        </button>
      ),
    },
    {
      label: "Xóa",
      key: "delete",
      content: (report) => (
        <Popup
          trigger={
            <button className="btn btn-danger">
              <i className="fa fa-trash"></i>
            </button>
          }
          modal
          closeOnDocumentClick
        >
          {(close) => (
            <div>
              <br />
              <h5>Bạn Có Chắc Chắn Muốn Xóa Bản Báo Cáo Về Vụ Cháy Này?</h5>
              <button
                className="btn btn-danger"
                onClick={() => this.props.onItemDelete(report._id)}
              >
                Có, Tôi Chắc Chắn
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => {
                  close();
                }}
              >
                Hủy Bỏ
              </button>
              <br />
              <br />
            </div>
          )}
        </Popup>
      ),
    },
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
