import http from "./httpService";

const apiEndpoint = "/supervisors";

function createNewSupervisor(accountId, supervisor) {
  return http.post(`${apiEndpoint}/${accountId}`, {
    fullname: supervisor.fullname,
    location: supervisor.location,
    phone: supervisor.phone,
    gender: supervisor.gender
  });
}

export { createNewSupervisor };
