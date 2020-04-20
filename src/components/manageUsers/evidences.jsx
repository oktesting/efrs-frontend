import React, { Component } from "react";
import { getFireById } from "../../services/fireService";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import loadingLogo from "../../../media/fire.svg";
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
          <h4 className="mb-4 mt-2">Ảnh</h4>
          <div>
            {images != null && images.length !== 0 ? (
              <AwesomeSlider cssModule={AwesomeSliderStyles}>
                {images.map((item, i) => (
                  <div key={i} data-src={item.location} />
                ))}
              </AwesomeSlider>
            ) : (
              <h6> Không có bằng chứng ảnh nào cho vụ cháy này </h6>
            )}
          </div>
          <div>
            <h4 className="mb-4 mt-5">Video</h4>
            {videos != null && videos.length !== 0 ? (
              <div>
                {videos.map((item, i) => (
                  <video
                    className="evidenceVideo"
                    key={i}
                    src={item.location}
                    controls
                  />
                ))}
              </div>
            ) : (
              <h6> Không có bằng chứng video nào cho vụ cháy này </h6>
            )}
          </div>
        </div>
      </LoadingScreen>
    );
  }
}

export default Evidences;
