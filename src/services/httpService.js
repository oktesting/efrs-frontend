import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

//this interceptor will be called first when get reponse with error then pass control to catch block
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("Unexpected error occurred from server");
  }

  return Promise.reject(error);
});

//let auth module to retrieve and set jwt => fix bi-directional issue
function setJwt(jwt) {
  //set header to all kind of request: get, post,...
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  setJwt
};
