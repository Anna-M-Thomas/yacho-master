//Fisher-Yates algorithm
//thanks to Nitin Patel, Medium article
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

//Includes min, excludes max
//Math.floor(Math.random() * (max - min) + min);
//Min index is zero
const getQuestion = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getAnswers = (length, question, array) => {
  let returnArray = [question];
  while (returnArray.length < length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const candidate = array[randomIndex];
    const success = returnArray.every((item) => item.id !== candidate.id);
    if (success) {
      returnArray.push(candidate);
    }
  }
  const shuffled = shuffle(returnArray);
  return shuffled;
};

module.exports = { getQuestion, getAnswers };
