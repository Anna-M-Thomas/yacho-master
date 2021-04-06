import axios from "axios";
const baseUrl = "http://localhost:3001/api/answers";

const getConfig = (token) => {
  return { headers: { Authorization: `bearer ${token}` } };
};

const answer = async (user, question, wasCorrect) => {
  const answerObject = {
    xenoId: question.id,
    nameEn: question.en,
    nameJp: question.jp,
    wasCorrect,
  };

  const config = getConfig(user.token);
  const response = await axios.post(baseUrl, answerObject, config);
  return response.data;
};

const clearAnswers = async (user) => {
  const config = getConfig(user.token);
  const response = await axios.delete(baseUrl, config);
  return response.data;
};

const answerHandler = { answer, clearAnswers };

export default answerHandler;
