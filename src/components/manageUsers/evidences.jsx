import React, { Component } from "react";
import { getFireById } from "../../services/fireService";
import { getResizedImage } from "../../utils/getImage";
import loadingLogo from "../../media/fire.svg";
import LoadingScreen from "react-loading-screen";

class Evidences extends Component {
  state = {
    images: [],
    videos: [],
    loading: true,
  };

  async populatingEvidences() {
    try {
      const fireId = this.props.match.params.id;
      const { data: fire } = await getFireById(fireId);
      this.setState({
        images: fire.evidences.filter(
          (evidence) => evidence.mimetype !== "video/mp4"
        ),
        videos: fire.evidences.filter(
          (evidence) => evidence.mimetype === "video/mp4"
        ),
      });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populatingEvidences();
    this.setState({ loading: false });
  }

  render() {
    const { images, videos, loading } = this.state;
    document.title = "Bằng Chứng Vụ Cháy";
    return (
      <LoadingScreen
        loading={loading}
        bgColor="#f1f1f1"
        spinnerColor="#51c2e0"
        textColor="#676767"
        logoSrc={loadingLogo}
        text="Đang Tải Bằng Chứng Vụ Cháy"
      >
        <div className="userInfo myShadow text-center pt-4 pb-4">
          <h3>Ảnh</h3>
          {images != null && images.length !== 0 ? (
            <div className="row">
              <div className="col">
                {images.map((item, i) => (
                  <button
                    key={i}
                    className="btn btn-link"
                    onClick={() => window.open(item.location)}
                  >
                    <img
                      alt="evidence"
                      width="250"
                      src={getResizedImage(item.location, 250, false)}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <h6> Không có bằng chứng ảnh nào cho vụ cháy này </h6>
          )}
          <h3>Video</h3>
          {videos != null && videos.length !== 0 ? (
            <div className="row">
              <div className="col">
                {videos.map((item, i) => (
                  <video
                    width="250"
                    className="m-1"
                    key={i}
                    src={item.location}
                    controls
                  />
                ))}
              </div>
            </div>
          ) : (
            <h6 className="text-center">
              Không có bằng chứng video nào cho vụ cháy này
            </h6>
          )}
        </div>
      </LoadingScreen>
    );
  }
}

export default Evidences;
