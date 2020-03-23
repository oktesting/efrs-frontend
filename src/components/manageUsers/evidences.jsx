import React, { Component } from "react";
import { getFire } from "../../services/fireService";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";

class Evidences extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    images: [],
    videos: []
  };

  async populatingFire() {
    try {
      const fireId = this.props.match.params.id;
      const { data: fire } = await getFire(fireId);
      this.setState({
        images: [
          "https://efrs.s3.ap-southeast-1.amazonaws.com/evidences/5e610874c4959c177043e4ec/5e6e612f5c3aec29801a4c11/1584292252411_2020_02_27_18_00_IMG_2169.jpg",
          "https://efrs.s3.ap-southeast-1.amazonaws.com/evidences/5e610874c4959c177043e4ec/5e6e612f5c3aec29801a4c11/1584292252450_83583323_2283073611991988_6147780539265843200_n.jpg",
          "https://efrs.s3.ap-southeast-1.amazonaws.com/evidences/5e610874c4959c177043e4ec/5e6e612f5c3aec29801a4c11/1584292252454_89785922_1499526216878195_1872107176957313024_n.jpg",
          "https://efrs.s3.ap-southeast-1.amazonaws.com/evidences/5e610874c4959c177043e4ec/5e6e612f5c3aec29801a4c11/1584292322247_dbd82792f851fdd9f28e7ea10a7f2f41.jpg"
        ]
      });
      this.setState({
        videos: [
          "https://efrs.s3.ap-southeast-1.amazonaws.com/evidences/5e610874c4959c177043e4ec/5e6e612f5c3aec29801a4c11/1584292322253_demo.mp4",
          "https://efrs.s3.ap-southeast-1.amazonaws.com/evidences/5e610874c4959c177043e4ec/5e6e612f5c3aec29801a4c11/1584292322262_demo2.mp4"
        ]
      });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populatingFire();
  }

  // mapToViewModel(fire) {
  //   evidences: fire.evidences;
  // }

  render() {
    const { images, videos } = this.state;
    return (
      <div className="userInfo shadow text-center pt-4 pb-4">
        <h4 className="mb-4 mt-2">Images</h4>
        <div>
          {images != null && images.length !== 0 ? (
            <AwesomeSlider cssModule={AwesomeSliderStyles}>
              {images.map((item, i) => (
                <div key={i} data-src={item} />
              ))}
            </AwesomeSlider>
          ) : (
            <h6> There is no provided image </h6>
          )}
        </div>
        <div>
          <h4 className="mb-4 mt-5">Videos</h4>
          {videos != null && videos.length !== 0 ? (
            <div>
              {videos.map((item, i) => (
                <video className="evidenceVideo" key={i} src={item} controls />
              ))}
            </div>
          ) : (
            <h6> There is no provided video </h6>
          )}
        </div>
      </div>
    );
  }
}

export default Evidences;
