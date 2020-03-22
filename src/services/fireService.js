import http from "./httpService";

const apiEndpoint = "/fires-history";

//get all fires of user
function getFiresByUserId(userId) {
  return http.get(`${apiEndpoint}/user/${userId}`);
}
//get one fire
function getFireId(fireId) {
  return http.get(`${apiEndpoint}/${fireId}`);
}

export { getFiresByUserId, getFireId };
