import axios from "axios";
const baseUrl = "http://localhost:3001/api/answers";

const answerFirstTime = async (user, question, wasCorrect) => {
  const answerObject = {
    bird: question.id,
    user: user.id,
    right: wasCorrect ? 1 : 0,
    wrong: wasCorrect ? 0 : 1,
  };
  const response = await axios.post(baseUrl, answerObject);
  return response.data;
};

const answerAgain = async (id, right, wrong, wasCorrect) => {
  const answerObject = {
    right: wasCorrect ? right + 1 : right,
    wrong: wasCorrect ? wrong : wrong + 1,
  };
  const response = await axios.post(`${baseUrl}/${id}`, answerObject);
  return response.data;
};

export default { answerFirstTime, answerAgain };
