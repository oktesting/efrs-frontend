import React, { Component } from "react";
import SearchBox from "../common/searchBox";
import ReportsTable from "./reportsTable";
import {
  getAllReports,
  deleteReportAndItsFire,
} from "../../services/reportService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";
import loadingLogo from "../../media/fire.svg";
import LoadingScreen from "react-loading-screen";

class Reports extends Component {
  state = {
    reports: [],
    sortColumn: {
      path: "createdAt",
      order: "desc",
    },
    searchQuery: "",
    pageSize: 10,
    currentPage: 1,
    loading: true,
  };

  async componentDidMount() {
    const { data: reports } = await getAllReports();
    this.setState({ reports, loading: false });
  }

  handlePageChange = (newPage) => {
    const currentPage = newPage;
    this.setState({ currentPage });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleDelete = async (reportId) => {
    const originalReports = this.state.reports;
    let reports;
    try {
      reports = originalReports.filter((report) => reportId !== report._id);
      await deleteReportAndItsFire(reportId);
      toast("Báo cáo về vụ cháy đã xóa thành công", {
        type: toast.TYPE.SUCCESS,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Báo cáo về vụ cháy không tồn tại");
        reports = originalReports;
      }
    }
    this.setState({ reports });
  };

  handleEdit = (reportId) => {
    return window.open("/reports/edit/" + reportId);
  };

  getPagedData = () => {
    const {
      reports: allReports,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered;
    //filter by search box only
    if (searchQuery)
      filtered = allReports.filter((m) =>
        m.location.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else filtered = allReports;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const reports = paginate(sorted, currentPage, pageSize);
    return {
      itemsCount: filtered.length,
      reports,
    };
  };

  render() {
    const {
      sortColumn,
      pageSize,
      currentPage,
      searchQuery,
      loading,
    } = this.state;
    const { reports, itemsCount } = this.getPagedData();
    document.title = "Quản Lý Báo Cáo";
    return (
      <LoadingScreen
        loading={loading}
        bgColor="#f1f1f1"
        spinnerColor="#51c2e0"
        textColor="#676767"
        logoSrc={loadingLogo}
        text="Đang Tải Báo Cáo Trong Hệ Thống"
      >
        <div className="container mt-3">
          <h4>Có {itemsCount} báo cáo cháy trong hệ thống</h4>
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
      </LoadingScreen>
    );
  }
}

export default Reports;
