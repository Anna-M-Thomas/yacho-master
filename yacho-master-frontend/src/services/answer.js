import axios from "axios";
const baseUrl = "http://localhost:3001/api/answers";

const getConfig = (token) => {
  return { headers: { Authorization: `bearer ${token}` } };
};

const answerFirstTime = async (user, question, wasCorrect) => {
  const answerObject = {
    bird: question.id,
    user: user.id,
    right: wasCorrect ? 1 : 0,
    wrong: wasCorrect ? 0 : 1,
  };

  const config = getConfig(user.token);
  console.log("config", config);
  const response = await axios.post(baseUrl, answerObject, config);
  return response.data;
};

const answerAgain = async (id, right, wrong, wasCorrect, user) => {
  const answerObject = {
    right: wasCorrect ? right + 1 : right,
    wrong: wasCorrect ? wrong : wrong + 1,
  };
  const config = getConfig(user.token);

  const response = await axios.post(`${baseUrl}/${id}`, answerObject, config);
  return response.data;
};

export default { answerFirstTime, answerAgain };
