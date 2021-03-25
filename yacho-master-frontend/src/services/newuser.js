import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const makeUser = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

const addAnswer = async (userId, birdId, wasCorrect) => {
  const answerInfo = { birdId, wasCorrect };
  const response = await axios.post(`${baseUrl}/${userId}`, answerInfo);
};

export default { makeUser };
