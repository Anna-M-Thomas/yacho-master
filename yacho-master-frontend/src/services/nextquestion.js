import axios from "axios";
const baseUrl = "http://localhost:3001/api/nextquestion";

//wait I don't even need this?
const getQuestion = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getQuestion };
