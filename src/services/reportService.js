import http from "./httpService";

const apiEndpoint = "/reports";

//get all reports
function getAllReports() {
  return http.get(apiEndpoint);
}
//get one report
function getReportById(reportId) {
  return http.get(`${apiEndpoint}/${reportId}`);
}

//submit new report
function submitNewReport(report) {
  return http.post(apiEndpoint, report);
}

//delete 1 report and its fire
function deleteReportAndItsFire(reportId) {
  return http.delete(`${apiEndpoint}/${reportId}`);
}

//edit 1 report
function editReport(reportId, report) {
  return http.put(`${apiEndpoint}/${reportId}`, report);
}

export {
  getAllReports,
  getReportById,
  submitNewReport,
  deleteReportAndItsFire,
  editReport
};
