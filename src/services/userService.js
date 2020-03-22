import http from "./httpService";

const apiEndpoint = "/users";

function getUser(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

function getAllUsers() {
  return http.get(apiEndpoint);
}

function changeUserActivation(userId) {
  return http.get(`${apiEndpoint}/change-activation/${userId}`);
}

export { getAllUsers, getUser, changeUserActivation };
