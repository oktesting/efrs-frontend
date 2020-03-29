import http from "./httpService";

const apiEndpoint = "/supervisors";

//create new
function createSupervisor(supervisor) {
  return http.post(apiEndpoint, {
    fullname: supervisor.fullname,
    location: supervisor.location,
    phone: supervisor.phone,
    gender: supervisor.gender
  });
}
//update super
function editSupervisor(supervisor, avatarInput) {
  let data = new FormData();
  data.append("fullname", supervisor.fullname);
  data.append("phone", supervisor.phone);
  data.append("location", supervisor.location);
  data.append("gender", supervisor.gender);
  if (avatarInput !== null) data.append("avatar", avatarInput);
  return http.put(apiEndpoint, data);
}

function getSupervisor(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

function getAllSupervisors() {
  return http.get(apiEndpoint);
}

//change supervisor activation
function changeSupervisorActivation(supervisorId) {
  return http.get(`${apiEndpoint}/change-activation/${supervisorId}`);
}

export {
  getSupervisor,
  createSupervisor,
  editSupervisor,
  getAllSupervisors,
  changeSupervisorActivation
};
