import React, { Component } from "react";
import Table from "../common/table";
import { Link } from "react-router-dom";

class UsersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Username",
      content: acc => <Link to={`/users/${acc._id}`}>{acc.name}</Link>
    },
    {
      path: "email",
      label: "Email",
      content: acc => <a href={"mailto:" + acc.email}>{acc.email}</a>
    },
    { path: "user.fullname", label: "Full Name" },
    {
      path: "isVerified",
      label: "Is Verified",
      content: acc =>
        acc.isVerified ? (
          <i className="fa fa-check" />
        ) : (
          <i className="fa fa-times" />
        )
    },
    {
      path: "user.isActivated",
      label: "Is Activated",
      content: acc =>
        acc.user.isActivated ? (
          <i className="fa fa-check" />
        ) : (
          <i className="fa fa-times" />
        )
    }
  ];

  render() {
    const { users, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={users}
        onSort={onSort}
        sortColumn={sortColumn}
        shadow={true}
      />
    );
  }
}

export default UsersTable;
