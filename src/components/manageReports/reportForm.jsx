import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import {
  getReportById,
  submitNewReport,
  editReport,
} from "../../services/reportService";
import { toast } from "react-toastify";
import loadingLogo from "../../media/fire.svg";
import LoadingScreen from "react-loading-screen";

class ReportForm extends Form {
  state = {
    data: {
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
    },
    errors: {},
    didSubmittedNewReport: false,
    loading: true,
  };

  schema = {
    location: Joi.string().label("Địa điểm"),
    area: Joi.number().min(0).label("Diện tích"),
    totalVehicle: Joi.number().min(0).integer().label("Tổng số phương tiện"),
    totalFireman: Joi.number().min(0).integer().label("Tổng số lính cứu hỏa"),
    totalDamageProperty: Joi.number().min(0).label("Tổng thiệt hại"),
    totalDeath: Joi.number().min(0).integer().label("Số người chết"),
    totalInjury: Joi.number().min(0).integer().label("Số người bị thương"),
    summary: Joi.string().label("Diễn biến và kết quả"),
    _id: Joi.string(),
    createdAt: Joi.string(),
    fire: Joi.string(),
    duration: Joi.string(),
    receivedTime: Joi.string(),
    finishedTime: Joi.string(),
    listDamageProperty: Joi.string().label("Danh sách thiệt hại"),
    investigation: Joi.string().label("Điều tra, xử lý"),
    fireResult: Joi.string().label("Kết quả cứu chữa"),
    fireCause: Joi.string().label("Nguyên nhân cháy"),
    owner: Joi.string().label("Cơ quan chủ quản"),
    fireType: Joi.string().label("Thuộc loại PCCC"),
    usageType: Joi.string().label("Tính chất sử dụng"),
    cadastral: Joi.string().label("Thuộc địa bàn"),
    fireStationManagement: Joi.string().label("Đơn vị PCCC quản lý"),
    travelDistance: Joi.string().label("Khoảng cách"),
    supervisorName: Joi.string().label("Cán bộ phụ trách địa bàn"),
    waterSource: Joi.string().label("Nguồn nước"),
    assessmentAndClassification: Joi.string().label(
      "Nhận xét, đánh giá và phân loại"
    ),
  };

  async populatingReport() {
    try {
      const reportId = this.props.match.params.reportId;
      let { data: report } = await getReportById(reportId);
      report["fire"] = report.fire._id;
      this.setState({ data: report });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    if (this.props.match.path === "/reports/edit/:reportId") {
      await this.populatingReport();
    }
    this.setState({ loading: false });
  }

  doSubmit = async () => {
    //call the server
    try {
      //add new case
      if (this.props.match.path === "/reports/new/:fireId/:receivedTime") {
        const report = {
          ...this.state.data,
          receivedTime: this.props.match.params.receivedTime,
          fire: this.props.match.params.fireId,
          finishedTime: new Date().toISOString(),
        };
        await submitNewReport(report);
        toast("Lưu Báo Cáo Mới Thành Công", {
          type: toast.TYPE.SUCCESS,
          onClose: () => {
            return this.props.history.push("/reports");
          },
        });
        this.setState({ didSubmittedNewReport: true });
      }
      //edit case
      else {
        const report = { ...this.state.data };
        delete report._id;
        delete report.createdAt;
        delete report.duration;
        await editReport(this.state.data._id, report);
        toast("Cập Nhật Nội Dung Báo Cáo Thành Công", {
          type: toast.TYPE.SUCCESS,
          onClose: () => {
            return window.close();
          },
        });
      }
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 400)
          toast(ex.response.data, {
            type: toast.TYPE.WARNING,
            onClose: () => {
              return window.close();
            },
          });
      }
    }
  };

  render() {
    document.title = "Quản Lý Báo Cáo";
    return (
      <LoadingScreen
        loading={this.state.loading}
        bgColor="#f1f1f1"
        spinnerColor="#51c2e0"
        textColor="#676767"
        logoSrc={loadingLogo}
        text="Đang Tải Báo Cáo Trong Hệ Thống"
      >
        <div className="userInfo myShadow mt-3 pb-3 pl-2 pr-2">
          <h3 className="font-weight-normal text-center mb-2 pt-2">
            Báo cáo đám cháy
          </h3>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <h4 className="font-weight-normal">
              I. Khái quát tình hình vụ cháy
            </h4>
            {this.renderInput("location", "Địa điểm", "text")}
            <div className="row">
              <div className="col-4">
                {this.renderInput("area", "Diện tích (m2)", "text")}
              </div>
              <div className="col-4">
                {this.renderInput(
                  "totalVehicle",
                  "Tổng số phương tiện",
                  "text"
                )}
              </div>
              <div className="col-4">
                {this.renderInput(
                  "totalFireman",
                  "Tổng số lính cứu hỏa",
                  "text"
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                {this.renderInput(
                  "totalDamageProperty",
                  "Tổng thiệt hại (triệu đồng)",
                  "text"
                )}
              </div>
              <div className="col-4">
                {this.renderInput("totalDeath", "Số người chết", "text")}
              </div>
              <div className="col-4">
                {this.renderInput("totalInjury", "Số người bị thương", "text")}
              </div>
            </div>

            {this.renderTextArea(
              "listDamageProperty",
              "Danh sách thiệt hại",
              4
            )}
            {this.renderInput("fireResult", "Kết quả cứu chữa", "text")}
            {this.renderInput("fireCause", "Nguyên nhân cháy", "text")}
            <hr />

            <h4 className="font-weight-normal">
              II. Công tác quản lý và phòng cháy chữa cháy của cơ sở
            </h4>

            {this.renderInput("owner", "Cơ quan chủ quản", "text")}
            <div className="row">
              <div className="col-6">
                {this.renderInput("fireType", "Thuộc loại PCCC", "text")}
              </div>
              <div className="col-6">
                {this.renderInput("usageType", "Tính chất sử dụng", "text")}
              </div>
            </div>
            {this.renderInput("cadastral", "Thuộc địa bàn", "text")}
            {this.renderInput(
              "fireStationManagement",
              "Đơn vị PCCC quản lý",
              "text"
            )}
            {this.renderInput("travelDistance", "Khoảng cách", "text")}
            {this.renderInput(
              "supervisorName",
              "Cán bộ phụ trách địa bàn",
              "text"
            )}
            {this.renderInput("waterSource", "Nguồn nước", "text")}
            <hr />

            <h4 className="font-weight-normal">
              III. Diễn biến cháy và kết quả cứu chữa
            </h4>
            {this.renderTextArea("summary", "Diễn biến và kết quả", 10)}
            <hr />

            <h4 className="font-weight-normal">IV. Công tác điều tra xử lý</h4>
            {this.renderTextArea("investigation", "Điều tra, xử lý", 2)}
            <hr />

            <h4 className="font-weight-normal">
              V. Nhận xét, đánh giá và phân loại
            </h4>
            {this.renderTextArea(
              "assessmentAndClassification",
              "Nhận xét, đánh giá và phân loại",
              8
            )}

            {this.renderButton("Lưu Báo Cáo")}
          </form>
        </div>
      </LoadingScreen>
    );
  }
}

export default ReportForm;
