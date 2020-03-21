import React, { Component } from "react";
import FiresTable from "./firesTable";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

class FiresHistoryTab extends Component {
  state = {
    pageSize: 5,
    currentPage: 1,
    sortColumn: {
      path: "createdAt",
      order: "desc"
    }
  };

  handlePageChange = newPage => {
    const currentPage = newPage;
    this.setState({ currentPage });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { firesHistory } = this.props;
    const sorted = _.orderBy(
      firesHistory,
      [sortColumn.path],
      [sortColumn.order]
    );
    const fires = paginate(sorted, currentPage, pageSize);
    return {
      itemsCount: firesHistory.length,
      fires
    };
  };

  render() {
    const { sortColumn, pageSize, currentPage } = this.state;
    const { fires, itemsCount } = this.getPagedData();
    return (
      <div className="col shadow pt-3">
        <h4>Showing {itemsCount} fires in the database</h4>
        <FiresTable
          fires={fires}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={itemsCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default FiresHistoryTab;
