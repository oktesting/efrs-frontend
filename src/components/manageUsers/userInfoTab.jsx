import React, { Component } from "react";
import { getSquareImage } from "./../../utils/getImage";
import Popup from "reactjs-popup";

class UserInfoTab extends Component {
  renderUserInfo(label, data) {
    return (
      <div className="form-group row">
        <label className="col-4 col-form-label">{label}</label>
        <div className="col-8">
          <input
            placeholder={label}
            value={data}
            className="form-control here"
            type="text"
            disabled
          />
        </div>
      </div>
    );
  }

  render() {
    const {
      avatar,
      age,
      gender,
      phone,
      fullname,
      isActivated,
      email,
      name,
    } = this.props.user;

    return (
      <div className="col myShadow">
        <div className="row mt-3">
          <div className="col">
            <div className="row">
              <div className="col-8">
                <h4>Thông Tin Về Người Dùng</h4>
              </div>
              <div className="col-4">
                <Popup
                  trigger={
                    <button
                      className={
                        (isActivated ? "btn btn-danger" : "btn btn-success") +
                        " float-right"
                      }
                    >
                      {isActivated ? (
                        <span>
                          Chặn&nbsp;
                          <i className="fa fa-times" />
                        </span>
                      ) : (
                        <span>
                          Bỏ Chặn&nbsp;
                          <i className="fa fa-check" />
                        </span>
                      )}
                    </button>
                  }
                  modal
                  closeOnDocumentClick
                >
                  {(close) => (
                    <div className="text-center">
                      <br />
                      <h5>Bạn Có Chắc Chắn Muốn Thực Hiện Hành Động Này?</h5>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.props.handleChangeActivation();
                          close();
                        }}
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
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form>
              <div className="form-group row">
                <img
                  src={getSquareImage(avatar, 300)}
                  className="image-preview rounded-circle img-thumbnail mx-auto d-block"
                  alt="avatar"
                />
              </div>
              {this.renderUserInfo("Địa Chỉ Email", email)}
              {this.renderUserInfo("Username", name)}
              {this.renderUserInfo("Họ Và Tên", fullname)}
              {this.renderUserInfo("Số Điện Thoại", phone)}
              {this.renderUserInfo("Giới Tính", gender)}
              {this.renderUserInfo("Tuổi", age)}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfoTab;
