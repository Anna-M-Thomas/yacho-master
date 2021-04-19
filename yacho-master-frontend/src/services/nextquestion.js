import axios from "axios";
const baseUrl = "/api/nextquestion";

const getQuestion = async (choices) => {
  const response = await axios.post(baseUrl, { choices });
  return response.data;
};

const questionHandler = { getQuestion };

export default questionHandler;
