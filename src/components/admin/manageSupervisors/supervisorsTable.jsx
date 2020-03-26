import React, { Component } from "react";
import Table from "../../common/table";
import { Link } from "react-router-dom";
import { getAllFireStation } from "../../../services/locationService";
class SupervisorsTable extends Component {
  async componentDidMount() {
    await this.populateStation();
  }
  populateStation = async () => {
    const { data: stations } = await getAllFireStation();
    this.setState({ stations });
  };

  columns = [
    {
      path: "name",
      label: "Username",
      content: acc => <Link to={`/supervisors/${acc._id}`}>{acc.name}</Link>
    },
    {
      path: "email",
      label: "Email",
      content: acc => <a href={"mailto:" + acc.email}>{acc.email}</a>
    },
    { path: "supervisor.fullname", label: "Full Name" },
    { path: "supervisor.gender", label: "Gender" },
    {
      path: "supervisor.location",
      label: "Station",
      content: acc => (
        <div>
          {
            this.state.stations.find(
              station => station._id === acc.supervisor.location
            )["address"]
          }
        </div>
      )
    },
    {
      path: "supervisor.isActivated",
      label: "Is Activated",
      content: acc =>
        acc.supervisor.isActivated ? (
          <i className="fa fa-check" />
        ) : (
          <i className="fa fa-times" />
        )
    }
  ];
  // constructor() {
  //   super();
  // const user = auth.getCurrentUser();
  // if (user && user.isAdmin) this.columns.push(this.deleteColum);
  // }
  render() {
    const { supervisors, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={supervisors}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default SupervisorsTable;
