import React, { Component } from "react";
import Table from "../../common/table";
import Popup from "reactjs-popup";

class FireStationsTable extends Component {
  columns = [
    {
      path: "address",
      label: "Địa Chỉ",
    },
    { path: "district", label: "Quận/Huyện" },
    {
      key: "delete",
      label: "Xóa",
      content: (station) => (
        <Popup
          trigger={
            <button className="btn btn-danger">
              <i className="fa fa-trash"></i>
            </button>
          }
          modal
          closeOnDocumentClick
        >
          {(close) => (
            <div>
              <br />
              <h5>Bạn Có Chắc Chắn Muốn Xóa Cơ Sở PCCC Này?</h5>
              <button
                className="btn btn-danger"
                onClick={() => this.props.onItemDelete(station._id)}
              >
                Có, Tôi Chắc Chắn
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => {
                  close();
                }}
              >
                Hủy Bỏ
              </button>
              <br />
              <br />
            </div>
          )}
        </Popup>
      ),
    },
  ];

  render() {
    const { fireStations, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={fireStations}
        onSort={onSort}
        sortColumn={sortColumn}
        shadow={false}
      />
    );
  }
}

export default FireStationsTable;
