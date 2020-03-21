import React, { Component } from "react";
import SearchBox from "../common/searchBox";
import UsersTable from "./usersTable";
import { getAllUsers } from "../../services/userService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

class Users extends Component {
  state = {
    users: [],
    sortColumn: {
      path: "username",
      order: "asc"
    },
    searchQuery: "",
    pageSize: 10,
    currentPage: 1
  };

  async componentDidMount() {
    const { data: users } = await getAllUsers();
    this.setState({ users });
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
      users: allUsers,
      pageSize,
      currentPage,
      //   selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered;
    //filter by search box only
    if (searchQuery)
      filtered = allUsers.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    //filter by genre only
    //if selected genre and its id is truthy then filter by genre
    // else if (selectedGenre && selectedGenre._id)
    //   filtered = allUsers.filter(m => m.genre._id === selectedGenre._id);
    //otherwise => all genres => all movies
    else filtered = allUsers;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);
    return {
      itemsCount: filtered.length,
      users
    };
  };

  render() {
    const { sortColumn, pageSize, currentPage, searchQuery } = this.state;
    const { users, itemsCount } = this.getPagedData();
    return (
      <div className="container mt-3">
        <h4>Showing {itemsCount} users in the database</h4>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <UsersTable
          users={users}
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

export default Users;
