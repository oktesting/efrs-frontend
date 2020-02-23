import http from "./httpService";
// import logger from "./logService";

const apiEndpoint = "/users";

const register = user => {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
};
export { register };
