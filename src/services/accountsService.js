import http from "./httpService";

const apiEndpoint = "/accounts";

const register = user => {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
};
export { register };
