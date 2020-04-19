import React, { Component } from "react";
import { getReportById } from "../../services/reportService";
//import Moment from "react-moment";

class Report extends Component {
  state = {
    report: {
      location: "",
      area: "",
      totalVehicle: "",
      totalFireman: "",
      totalDamageProperty: "",
      totalDeath: "",
      totalInjury: "",
      summary: "",
      listDamageProperty: "",
      investigation: "",
      fireResult: "",
      fireCause: "",
      owner: "",
      fireType: "",
      usageType: "",
      cadastral: "",
      fireStationManagement: "",
      travelDistance: "",
      supervisorName: "",
      waterSource: "",
      assessmentAndClassification: "",
      receivedTime: "",
      finishedTime: "",
      duration: "",
    },
  };

  async populatingReport() {
    try {
      const reportId = this.props.match.params.reportId;
      const { data: report } = await getReportById(reportId);
      this.setState({ report });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populatingReport();
  }

  render() {
    const {
      location,
      area,
      totalVehicle,
      totalFireman,
      totalDamageProperty,
      listDamageProperty,
      totalDeath,
      totalInjury,
      investigation,
      fireResult,
      fireCause,
      owner,
      fireType,
      usageType,
      cadastral,
      fireStationManagement,
      travelDistance,
      supervisorName,
      waterSource,
      summary,
      assessmentAndClassification,
      receivedTime,
      duration,
    } = this.state.report;

    return (
      <div className="userInfo myShadow mt-5 pb-3 mb-5 pl-2 pr-2">
        <div className="row pt-4">
          <span className="col-5 text-center">BỘ CÔNG AN</span>
          <span className="col-7 text-center">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </span>
        </div>
        <div className="row">
          <span className="col-5 text-center">
            CẢNH SÁT PHÒNG CHÁY CHỮA CHÁY
          </span>
          <span className="col-7 text-center">Độc lập - Tự do - Hạnh phúc</span>
        </div>
        <br />
        <div className="col-12 text-center w-75 mx-auto">
          <h3>BÁO CÁO</h3>
          <h5>Tình hình và rút kinh nghiệm toàn diện vụ cháy {location}</h5>
          <div className="text-center w-50 mx-auto">
            <hr />
          </div>
        </div>
        <div className="pl-5 pr-5 pb-4">
          <span className="font-weight-bold">
            I. KHÁI QUÁT TÌNH HÌNH VỤ CHÁY
          </span>
          <br />
          <span>
            1. Thời gian xảy ra cháy:{" "}
            {new Date(receivedTime).toLocaleDateString("en-GB")}{" "}
            {new Date(receivedTime).toLocaleTimeString()}
          </span>
          <br />
          <span>2. Địa điểm cháy: {location}</span>
          <br />
          <span>3. Tham gia chữa cháy gồm có: </span>
          <br />
          <span>+ Lính cứu hỏa: {totalFireman}</span>
          <br />
          <span>+ Xe chữa cháy các loại: {totalVehicle}</span>
          <br />
          <span>4. Thời gian chữa cháy: {duration}</span>
          <br />
          <span>5. Thiệt hại trực tiếp ban đầu: </span>
          <br />
          <span>+ Số người chết: {totalDeath}</span>
          <br />
          <span>+ Số người bị thương: {totalInjury}</span>
          <br />
          <span>+ Diện tích cháy: {area} m2</span>
          <br />
          <span>+ Về tài sản: {listDamageProperty}</span>
          <br />
          <span>+ Ước tính thành tiền: {totalDamageProperty} triệu đồng</span>
          <br />
          <span>6. Kết quả cứu chữa: {fireResult}</span>
          <br />
          <span>7. Nguyên nhân cháy: {fireCause}</span>
          <br />
          <br />
          <span className="font-weight-bold">
            II. TÌNH HÌNH VỀ CÔNG TÁC QUẢN LÝ VÀ PC&CC CỦA CƠ SỞ
          </span>
          <br />
          <span>1. Cơ quan chủ quản: {owner}</span>
          <br />
          <span>2. Thuộc loại PCCC: {fireType}</span>
          <br />
          <span>3. Tính chất sử dụng: {usageType}</span>
          <br />
          <span>4. Thuộc địa bàn: {cadastral}</span>
          <br />
          <span>5. Đơn vị quản lý: {fireStationManagement}</span>
          <br />
          <span>6. Khoảng cách di chuyển: {travelDistance}</span>
          <br />
          <span>7. Họ tên cán bộ phụ trách địa bàn: {supervisorName}</span>
          <br />
          <span>8. Nguồn nước sử dụng: {waterSource}</span>
          <br />
          <br />
          <span className="font-weight-bold">
            III. DIỄN BIẾN CHÁY VÀ KẾT QUẢ CỨU CHỮA
          </span>
          <br />
          <pre className="preTag">{summary}</pre>
          <br />
          <span className="font-weight-bold">IV. CÔNG TÁC ĐIỀU TRA XỬ LÝ</span>
          <br />
          <pre className="preTag">{investigation}</pre>
          <br />
          <span className="font-weight-bold">
            V. NHẬN XÉT ĐÁNH GIÁ, RÚT KINH NGHIỆM TOÀN DIỆN VÀ PHÂN LOẠI
          </span>
          <br />
          <pre className="preTag">{assessmentAndClassification}</pre>
        </div>
      </div>
    );
  }
}

export default Report;
