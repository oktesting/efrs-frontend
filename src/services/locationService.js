import http from "./httpService";

const apiEndpoint = "/locations";

function getAllFireStation() {
  return http.get(`${apiEndpoint}/fire-station`);
}

function addNewFireStation(fireStation) {
  return http.post(`${apiEndpoint}/fire-station`, fireStation);
}

export { getAllFireStation, addNewFireStation };
