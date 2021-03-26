import axios from "axios";
const baseUrl = "http://localhost:3001/api/answers";

const answerFirstTime = async (answerObject) => {
  const response = await axios.post(baseUrl, answerObject);
  return response.data;
};

const answerAgain = async (id, answerObject) => {
  const response = await axios.post(`${baseUrl}/${id}`, answerObject);
  return response.data;
};

export default { answerFirstTime, answerAgain };
