const getQuestion = require("../building_blocks/helperfunctions").getQuestion;
const getAnswer = require("../building_blocks/helperfunctions").getAnswer;

const isArrayUnique = (arr) => {
  return Array.isArray(arr) && new Set(arr).size === arr.length;
}; // function to check that array is unique. Thank you Yehven, Stack Overflow

const testArray = [
  "527210",
  "545719",
  "623530",
  "571300",
  "305900",
  "629238",
  "486622",
  "627619",
  "466620",
  "611841",
  "506989",
  "622920",
  "468191",
  "612331",
  "622675",
  "581448",
  "488222",
  "569658",
  "206311",
  "531106",
  "624604",
  "622701",
  "560515",
  "572077",
];

describe("Get Question", () => {
  test("Returns something inside testArray", () => {
    const result = getQuestion(testArray);
    expect(testArray).toContain(result);
  });
});

describe("Get answer", () => {
  test("Returns an array of provided length", () => {
    const result = getAnswer(4, "527210", testArray);
    expect(result).toHaveLength(4);
  });

  test("That array contains answer", () => {
    const result = getAnswer(4, "527210", testArray);
    expect(result).toContain("527210");
  });

  test("All answers are in testArray", () => {
    const result = getAnswer(4, "527210", testArray);
    result.forEach((item) => expect(testArray).toContain(item));
  });

  test("No answers duplicate each other", () => {
    const result = getAnswer(4, "527210", testArray);
    const unique = isArrayUnique(result);
    expect(unique).toBeTruthy();
  });
});
