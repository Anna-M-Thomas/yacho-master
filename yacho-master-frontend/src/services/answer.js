import axios from "axios";
const baseUrl = "http://localhost:3001/api/answers";

const getConfig = (token) => {
  return { headers: { Authorization: `bearer ${token}` } };
};

const answerFirstTime = async (user, question, wasCorrect) => {
  const answerObject = {
    bird: question.id,
    wasCorrect,
  };

  const config = getConfig(user.token);
  const response = await axios.post(baseUrl, answerObject, config);
  return response.data;
};

export default { answerFirstTime };
