import React, { Component } from "react";
import SearchBox from "../common/searchBox";
import ReportsTable from "./reportsTable";
import {
  getAllReports,
  deleteReportAndItsFire
} from "../../services/reportService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";

class Reports extends Component {
  state = {
    reports: [],
    sortColumn: {
      path: "createdAt",
      order: "desc"
    },
    searchQuery: "",
    pageSize: 10,
    currentPage: 1
  };

  async componentDidMount() {
    const { data: reports } = await getAllReports();
    this.setState({ reports });
  }

  handlePageChange = newPage => {
    const currentPage = newPage;
    this.setState({ currentPage });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleDelete = async reportId => {
    const originalReports = this.state.reports;
    let reports;
    try {
      reports = originalReports.filter(report => reportId !== report._id);
      await deleteReportAndItsFire(reportId);
      toast("Report and its fire is deleted.", {
        type: toast.TYPE.SUCCESS
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Station is already deleted");
        reports = originalReports;
      }
    }
    this.setState({ reports });
  };

  handleEdit = reportId => {
    return window.open("/reports/edit/" + reportId);
  };

  getPagedData = () => {
    const {
      reports: allReports,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered;
    //filter by search box only
    if (searchQuery)
      filtered = allReports.filter(m =>
        m.location.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else filtered = allReports;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const reports = paginate(sorted, currentPage, pageSize);
    return {
      itemsCount: filtered.length,
      reports
    };
  };

  render() {
    const { sortColumn, pageSize, currentPage, searchQuery } = this.state;
    const { reports, itemsCount } = this.getPagedData();
    return (
      <div className="container mt-3">
        <h4>Showing {itemsCount} fire reports in the database</h4>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <ReportsTable
          onItemDelete={this.handleDelete}
          onItemEdit={this.handleEdit}
          reports={reports}
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

export default Reports;
