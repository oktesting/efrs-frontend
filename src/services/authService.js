import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenKey = "token";

//set jwt to http module so it can send request with jwt in header
http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

function isAuthenticated() {
  const user = getCurrentUser();
  return user === undefined || user === null ? false : true;
}

function isAdmin() {
  const user = getCurrentUser();
  if (user === undefined || user === null) return false;
  else if (
    user.isAdmin === undefined ||
    user.isAdmin === null ||
    user.isAdmin === false
  ) {
    return false;
  }
  return true;
}

function isSupervisor() {
  const user = getCurrentUser();
  if (user === undefined || user === null) return false;
  else if (
    user.supervisor === undefined ||
    user.supervisor === null ||
    user.supervisor.isActivated === false
  ) {
    return false;
  }
  return true;
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  isAuthenticated,
  isAdmin,
  isSupervisor
};
