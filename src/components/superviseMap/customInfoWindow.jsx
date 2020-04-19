import React from "react";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import "@github/time-elements";
import { InfoWindow } from "react-google-maps";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { changeFireStatus } from "../../services/fireService";

const CustomInfoWindow = ({
  onCloseInfoWindow,
  selectedFire,
  images,
  videos,
  handleDeleteFire,
  handleChangeStatusFire,
}) => {
  return (
    <InfoWindow
      onCloseClick={onCloseInfoWindow}
      position={{
        lat: selectedFire.latitude,
        lng: selectedFire.longtitude,
      }}
    >
      <div className="text-center">
        <h3>Thông Tin Người Báo Cháy</h3>
        <div
          className="alert alert-danger row"
          style={{ marginRight: "0px" }}
          role="alert"
        >
          <div className="col align-self-center">
            <h6>Tên: {selectedFire.user.fullname}</h6>
            <h6>Số Điện Thoại: {selectedFire.user.phone}</h6>
            <h6>Trạng Thái Đám Cháy: {selectedFire.status}</h6>
            <h6>
              Báo Lúc:&nbsp;
              <time-ago datetime={selectedFire.createdAt}>
                {selectedFire.createdAt}
              </time-ago>
            </h6>
          </div>
          <div className="col">
            <img
              className="infoImg rounded-circle"
              src={selectedFire.user.avatar}
              alt="avatar is not found"
            />
          </div>
        </div>
        <h3>Ảnh</h3>
        <div>
          {images != null && images.length !== 0 ? (
            <AwesomeSlider cssModule={AwesomeSliderStyles}>
              {images.map((item, i) => (
                <div key={i} data-src={item.location} href={item.location} />
              ))}
            </AwesomeSlider>
          ) : (
            <h6> Không có bằng chứng ảnh nào cho vụ cháy này </h6>
          )}
        </div>
        <h3 className="mt-5">Video</h3>
        <div>
          {videos != null && videos.length !== 0 ? (
            videos.map((item, i) => (
              <span className="displayInline" key={i}>
                <video
                  className="infoVideo"
                  src={item.location}
                  controls
                ></video>
              </span>
            ))
          ) : (
            <h6>Không có bằng chứng video nào cho vụ cháy này</h6>
          )}
        </div>
        <Popup
          trigger={
            <button className="btn btn-lg btn-primary btn-block mt-3">
              Hành Động
            </button>
          }
          modal
          closeOnDocumentClick
        >
          <div>
            <h6> Hành Động</h6>
            <button
              className="btn btn-primary btn-sm btn-block mr-1"
              onClick={() => {
                window.open("/evidences/" + selectedFire._id);
              }}
            >
              Xem Các Bằng Chứng Trong Tab Mới
            </button>
            <button
              disabled={selectedFire.status === "pending" ? false : true}
              className="btn btn-warning btn-sm btn-block mr-1"
              onClick={async () => {
                try {
                  await changeFireStatus(1, selectedFire._id);
                  selectedFire.status = "processing";
                  handleChangeStatusFire(selectedFire._id);
                  onCloseInfoWindow();
                  toast.success("Đã chuyển trạng thái sang đang xử lý");
                } catch (error) {}
              }}
            >
              Chuyển Trạng Thái Sang Đang Xử Lý
            </button>
            <button
              className="btn btn-danger btn-sm btn-block mr-1"
              onClick={async () => {
                try {
                  await changeFireStatus(2, selectedFire._id);
                  handleDeleteFire(selectedFire._id);
                  onCloseInfoWindow();
                  toast.success("Đã kết thúc xử lý đám cháy");
                  //open tab for writing report
                  window.open(
                    "/reports/new/" +
                      selectedFire._id +
                      "/" +
                      selectedFire.createdAt
                  );
                } catch (error) {}
              }}
            >
              Kết Thúc Và Viết Báo Cáo Vụ Việc
            </button>
          </div>
        </Popup>
      </div>
    </InfoWindow>
  );
};

export default CustomInfoWindow;
