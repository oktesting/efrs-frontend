import http from "./httpService";

const apiEndpoint = "/accounts";

const register = account => {
  return http.post(apiEndpoint, {
    email: account.email,
    password: account.password,
    name: account.name
  });
};
export { register };
