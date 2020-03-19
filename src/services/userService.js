import http from "./httpService";

const apiEndpoint = "/users";

function getUser(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

function getAllUsers() {
  return http.get(apiEndpoint);
}
export { getAllUsers, getUser };
