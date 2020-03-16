import http from "./httpService";

const apiEndpoint = "/locations";

function getAllFireStation() {
  return http.get(apiEndpoint + "/fire-station");
}

export default { getAllFireStation };
