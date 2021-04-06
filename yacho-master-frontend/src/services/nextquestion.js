import axios from "axios";
const baseUrl = "http://localhost:3001/api/nextquestion";

const getQuestion = async (choices) => {
  const response = await axios.post(baseUrl, { choices });
  return response.data;
};

const questionHandler = { getQuestion };

export default questionHandler;
