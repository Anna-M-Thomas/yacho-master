import axios from "axios";
const baseUrl = "http://localhost:3001/api/login";

const loginUser = async (user) => {
  const response = await axios.post(baseUrl, user);
  console.log("response data inside login User", response.data);
  return response.data;
};

export default { loginUser };
