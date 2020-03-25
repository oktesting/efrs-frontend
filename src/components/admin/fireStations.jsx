import React, { Component } from "react";
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";
import FireStationsTable from "./fireStationsTable";
import {
  getAllFireStation,
  deleteFireStation
} from "../../services/locationService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";

class FireStation extends Component {
  constructor() {
    super();
    const tabs = [
      { _id: "", name: "All Province" },
      { _id: 2, name: "Hà Nội" },
      { _id: 3, name: "TP Hồ Chí Minh" }
    ];
    this.state.tabs = tabs;
    this.state.selectedTab = tabs[0];
  }

  state = {
    fireStations: [],
    sortColumn: {
      path: "address",
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
    this.setState({
      selectedTab: this.state.tabs[0],
      searchQuery: query,
      currentPage: 1
    });
  };

  handleTabSelect = tab => {
    this.setState({ selectedTab: tab, searchQuery: "", currentPage: 1 });
  };

  handleDelete = async stationId => {
    const originalFireStations = this.state.fireStations;
    let stations;
    try {
      stations = originalFireStations.filter(
        station => stationId !== station._id
      );
      await deleteFireStation(stationId);
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
      selectedTab,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered;
    if (searchQuery)
      filtered = allStations.filter(m =>
        m.address.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedTab && selectedTab._id)
      filtered = allStations.filter(m => m.province === selectedTab.name);
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
      <div className="userInfo">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.tabs}
              selectedItem={this.state.selectedTab}
              onItemSelect={this.handleTabSelect}
            />
          </div>
          <div className="col-9 shadow">
            <div className="row mt-3">
              <div className="col-8">
                <h4>Showing {itemsCount} stations in the database</h4>
              </div>
              <div className="col-4">
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
        </div>
      </div>
    );
  }
}

export default FireStation;
