import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const makeUser = async (user) => {
  const response = await axios.post(baseUrl);
  return response.data;
};

export default { makeUser };