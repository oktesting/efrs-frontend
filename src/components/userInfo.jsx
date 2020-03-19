import React, { Component } from "react";
import { getUser } from "../services/userService";

class UserInfo extends Component {
  state = {
    data: {
      isVerified: "",
      name: "",
      email: "",
      isActivated: "",
      gender: "",
      fullname: "",
      phone: "",
      age: "",
      avatar: ""
    }
  };
  async populatingUser() {
    try {
      const accountId = this.props.match.params.id;
      const { data: acc } = await getUser(accountId);
      this.setState({ data: this.mapToViewModel(acc) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populatingUser();
  }

  mapToViewModel(acc) {
    return {
      isVerified: acc.isVerified,
      name: acc.name,
      email: acc.email,
      isActivated: acc.user.isActivated,
      fullname: acc.user.fullname,
      phone: acc.user.phone,
      gender: acc.user.gender,
      age: acc.user.age,
      avatar: acc.user.avatar
    };
  }

  render() {
    return (
      <div className="userInfo">
        <div className="row">
          <div className="col-3">
            <a href="#" class="list-group-item list-group-item-action active">
              User Information
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              Fire report history
            </a>
          </div>

          <div className="col shadow">
            <div className="row mt-3">
              <div className="col">
                <div className="row">
                  <div className="col-9">
                    <h4>User Information</h4>
                  </div>
                  <div class="col-3">
                    <button
                      name="submit"
                      type="submit"
                      className="btn btn-danger"
                    >
                      Deactivate user
                    </button>
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
                      src={
                        this.state.data.avatar
                          ? this.state.data.avatar
                          : "https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/profile-avatar/male-avatar.png"
                      }
                      className="image-preview rounded-circle img-thumbnail mx-auto d-block"
                      alt="avatar"
                    />
                  </div>

                  <div className="form-group row">
                    <label className="col-4 col-form-label">Email</label>
                    <div className="col-8">
                      <input
                        placeholder="Email"
                        value={this.state.data.email}
                        className="form-control here"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-4 col-form-label">Username</label>
                    <div className="col-8">
                      <input
                        placeholder="Name"
                        value={this.state.data.name}
                        className="form-control here"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-4 col-form-label">Full Name</label>
                    <div className="col-8">
                      <input
                        placeholder="Full Name"
                        value={this.state.data.fullname}
                        className="form-control here"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-4 col-form-label">Gender</label>
                    <div className="col-8">
                      <input
                        placeholder="Gender"
                        value={this.state.data.gender}
                        className="form-control here"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-4 col-form-label">Phone</label>
                    <div className="col-8">
                      <input
                        placeholder="Phone"
                        value={this.state.data.phone}
                        className="form-control here"
                        type="number"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-4 col-form-label">Age</label>
                    <div className="col-8">
                      <input
                        placeholder="Age"
                        value={this.state.data.age}
                        className="form-control here"
                        type="number"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-4 col-form-label">Is Verified</label>
                    <div className="col-8">
                      <input
                        placeholder="True"
                        value={this.state.data.isVerified}
                        className="form-control here"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-4 col-form-label">Is Activated</label>
                    <div className="col-8">
                      <input
                        placeholder="True"
                        value={this.state.data.isActivated}
                        className="form-control here"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
