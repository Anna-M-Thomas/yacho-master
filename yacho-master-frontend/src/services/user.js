import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const getConfig = (token) => {
  return { headers: { Authorization: `bearer ${token}` } };
};

const makeUser = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

const deleteUser = async (user) => {
  const config = getConfig(user.token);
  console.log("config inside delete User!!!", config);
  const response = await axios.delete(`${baseUrl}/${user.id}`, config);
  return response.data;
};

export default { makeUser, deleteUser };
