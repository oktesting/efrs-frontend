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

export { getAllReports, getReportById, submitNewReport };
