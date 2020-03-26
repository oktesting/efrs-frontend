import React, { Component } from "react";
import SearchBox from "../../common/searchBox";
import { getAllSupervisors } from "../../../services/supervisorService";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import _ from "lodash";
import SupervisorsTable from "./supervisorsTable";

class Supervisors extends Component {
  state = {
    supervisors: [],
    sortColumn: {
      path: "username",
      order: "asc"
    },
    searchQuery: "",
    pageSize: 10,
    currentPage: 1
  };

  async componentDidMount() {
    const { data: supervisors } = await getAllSupervisors();
    this.setState({ supervisors });
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

  getPagedData = () => {
    const {
      supervisors: allSupervisors,
      pageSize,
      currentPage,
      //   selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered;
    //filter by search box only
    if (searchQuery)
      filtered = allSupervisors.filter(m =>
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
      supervisors
    };
  };

  render() {
    const { sortColumn, pageSize, currentPage, searchQuery } = this.state;
    const { supervisors, itemsCount } = this.getPagedData();
    return (
      <div className="container mt-3">
        <h4>Showing {itemsCount} supervisors in the database</h4>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <SupervisorsTable
          supervisors={supervisors}
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

export default Supervisors;
