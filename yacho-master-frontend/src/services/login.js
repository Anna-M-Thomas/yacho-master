import axios from "axios";
const baseUrl = "/api/login";

const getConfig = (token) => {
  return { headers: { Authorization: `bearer ${token}` } };
};

const loginUser = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

const checkUser = async (token) => {
  const config = getConfig(token);
  const response = await axios.post(`${baseUrl}/check`, {}, config);
  return response.data;
};

const loginHandler = { loginUser, checkUser };

export default loginHandler;
