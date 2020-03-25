import http from "./httpService";

const apiEndpoint = "/locations";
const stationURL = `${apiEndpoint}/fire-station`;

function getAllFireStation() {
  return http.get(stationURL);
}

function addNewFireStation(fireStation) {
  return http.post(stationURL, fireStation);
}

function deleteFireStation(stationId) {
  return http.delete(`${apiEndpoint}/${stationId}`);
}

function getAllLocationOfUser(userId) {
  return http.get(`${apiEndpoint}/${userId}`);
}

export {
  getAllFireStation,
  addNewFireStation,
  deleteFireStation,
  getAllLocationOfUser
};
