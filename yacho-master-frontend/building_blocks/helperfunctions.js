//Includes min, excludes max
//Math.floor(Math.random() * (max - min) + min);
//Min index is zero

const getQuestion = (array) => {
  console.log("array length", array.length);
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getAnswer = (length, question, array) => {
  let returnArray = [question];
  while (returnArray.length < length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const candidate = array[randomIndex];
    const success = returnArray.every((item) => item !== candidate);
    if (success) {
      returnArray.push(candidate);
    }
  }
  return returnArray;
};

module.exports = { getQuestion, getAnswer };
