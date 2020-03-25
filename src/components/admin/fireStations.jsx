import React, { Component } from "react";
import SearchBox from "../common/searchBox";
import FireStationsTable from "./fireStationsTable";
import { getAllFireStation } from "../../services/locationService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";

class FireStation extends Component {
  state = {
    fireStations: [],
    sortColumn: {
      path: "name",
      order: "asc"
    },
    searchQuery: "",
    pageSize: 10,
    currentPage: 1
  };

  async componentDidMount() {
    const { data: fireStations } = await getAllFireStation();
    this.setState({ fireStations });
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

  handleDelete = async stationId => {
    const originalFireStations = this.state.fireStations;
    let stations;
    try {
      stations = originalFireStations.filter(
        station => stationId !== station._id
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Station is already deleted");
        stations = originalFireStations;
      }
    }
    this.setState({ fireStations: stations });
  };

  getPagedData = () => {
    const {
      fireStations: allStations,
      pageSize,
      currentPage,
      //   selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered;
    //filter by search box only
    if (searchQuery)
      filtered = allStations.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    //filter by genre only
    //if selected genre and its id is truthy then filter by genre
    // else if (selectedGenre && selectedGenre._id)
    //   filtered = allUsers.filter(m => m.genre._id === selectedGenre._id);
    //otherwise => all genres => all movies
    else filtered = allStations;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const fireStations = paginate(sorted, currentPage, pageSize);
    return {
      itemsCount: filtered.length,
      fireStations
    };
  };

  render() {
    const { sortColumn, pageSize, currentPage, searchQuery } = this.state;
    const { fireStations, itemsCount } = this.getPagedData();
    return (
      <div className="container mt-3 p-3 shadow">
        <div className="row">
          <div className="col-9">
            <h4>Showing {itemsCount} stations in the database</h4>
          </div>
          <div className="col-3">
            <button
              className="btn btn-primary float-right"
              onClick={() => {
                this.props.history.push("/fire-station/new");
              }}
            >
              Create New Station
            </button>
          </div>
        </div>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <FireStationsTable
          fireStations={fireStations}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onItemDelete={this.handleDelete}
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

export default FireStation;
