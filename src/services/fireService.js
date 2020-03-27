import http from "./httpService";

const apiEndpointFireHistory = "/fires-history";
const apiEndpointFire = "/fires";

//get all fires of user
function getFiresByUserId(userId) {
  return http.get(`${apiEndpointFireHistory}/user/${userId}`);
}
//get one fire
function getFireById(fireId) {
  return http.get(`${apiEndpointFireHistory}/${fireId}`);
}

//change fire status
function changeFireStatus(option, fireId) {
  //option 1 - change to processing
  //option 2 - change to finished
  return http.get(`${apiEndpointFire}/change-status/${option}/${fireId}`);
}

export { getFiresByUserId, getFireById, changeFireStatus };
