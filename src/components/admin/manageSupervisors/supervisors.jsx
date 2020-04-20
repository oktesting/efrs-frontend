import React, { Component } from "react";
import SearchBox from "../../common/searchBox";
import { getAllSupervisors } from "../../../services/supervisorService";
import { getAllFireStation } from "../../../services/locationService";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import _ from "lodash";
import SupervisorsTable from "./supervisorsTable";
import loadingLogo from "../../../media/profile.svg";
import LoadingScreen from "react-loading-screen";

class Supervisors extends Component {
  state = {
    supervisors: [],
    stations: [],
    sortColumn: {
      path: "username",
      order: "asc",
    },
    searchQuery: "",
    pageSize: 10,
    currentPage: 1,
    loading: true,
  };

  async componentDidMount() {
    const { data: supervisors } = await getAllSupervisors();
    const { data: stations } = await getAllFireStation();
    this.setState({ supervisors, stations, loading: false });
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

  getPagedData = () => {
    const {
      supervisors: allSupervisors,
      pageSize,
      currentPage,
      //   selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered;
    //filter by search box only
    if (searchQuery)
      filtered = allSupervisors.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    //filter by genre only
    //if selected genre and its id is truthy then filter by genre
    // else if (selectedGenre && selectedGenre._id)
    //   filtered = allUsers.filter(m => m.genre._id === selectedGenre._id);
    //otherwise => all genres => all movies
    else filtered = allSupervisors;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const supervisors = paginate(sorted, currentPage, pageSize);
    return {
      itemsCount: filtered.length,
      supervisors,
    };
  };

  render() {
    const {
      sortColumn,
      pageSize,
      currentPage,
      searchQuery,
      stations,
      loading,
    } = this.state;
    const { supervisors, itemsCount } = this.getPagedData();
    document.title = "Quản Lý Cán Bộ PCCC";
    return (
      <LoadingScreen
        loading={loading}
        bgColor="#f1f1f1"
        spinnerColor="#51c2e0"
        textColor="#676767"
        logoSrc={loadingLogo}
        text="Đang Tải Cán Bộ PCCC Trong Hệ Thống"
      >
        <div className="container mt-3">
          <h4>Có {itemsCount} cán bộ trong hệ thống</h4>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <SupervisorsTable
            supervisors={supervisors}
            stations={stations}
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

export default Supervisors;
