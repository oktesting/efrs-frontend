import { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import React from "react";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const images = [
  "https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/landing-page/005.jpg",
  "https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/landing-page/Khoi_Canh_sat_Phong_chay_chua_chay.jpg",
  "https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/landing-page/anhdn3.jpg",
  "https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/landing-page/anhdn5.jpg",
  "https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/landing-page/anhdn8.jpg",
  "https://efrs.s3-ap-southeast-1.amazonaws.com/common-assets/landing-page/hoi_thi_2015.jpg"
];
const AutoplaySlider = withAutoplay(AwesomeSlider);
const slider = (
  <AutoplaySlider
    play={true}
    cancelOnInteraction={false} // should stop playing on user interaction
    interval={5000}
  >
    {images.map((item, i) => (
      <div key={i} data-src={item} />
    ))}
  </AutoplaySlider>
);

class Homepage extends Component {
  render() {
    return <div className="homepage">{slider}</div>;
  }
}

export default Homepage;
