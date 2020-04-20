import React, { Component } from "react";
import notFound from "../media/page-not-found.svg";
class NotFound extends Component {
  state = {};
  render() {
    document.title = "Không Tồn Tại Hoặc Không Có Quyền Truy Cập";
    return (
      <React.Fragment>
        <br />
        <div className="row justify-content-md-center">
          <h3 className="col-md-auto">
            Trang bạn đang tìm không tồn tại hoặc bạn không có quyền truy cập
          </h3>
        </div>
        <br />
        <div className="row justify-content-md-center">
          <img src={notFound} alt="not found" width="300" />
        </div>
      </React.Fragment>
    );
  }
}

export default NotFound;
