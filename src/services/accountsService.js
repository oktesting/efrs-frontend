import http from "./httpService";

const apiEndpoint = "/accounts";

const register = (account) => {
  return http.post(apiEndpoint, {
    email: account.email,
    password: account.password,
    name: account.name,
  });
};

const resendConfirmationEmail = (accId) => {
  return http.get(`${apiEndpoint}/resend/${accId}`);
};

const requestResetPassword = (email) => {
  return http.post(`${apiEndpoint}/forgot-password`, { email });
};

const changePassword = (token, newPassword) => {
  return http.post(`${apiEndpoint}/reset`, { token, newPassword });
};

export {
  register,
  resendConfirmationEmail,
  changePassword,
  requestResetPassword,
};
