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
function editSupervisor(supervisor) {
  let data = new FormData();
  data.append("fullname", supervisor.fullname);
  data.append("phone", supervisor.phone);
  data.append("location", supervisor.location);
  data.append("gender", supervisor.gender);
  // data.append('avatar', ?)
  return http.put(apiEndpoint, data);
}

function getSupervisor() {
  return http.get(apiEndpoint);
}
export { getSupervisor, createSupervisor, editSupervisor };
