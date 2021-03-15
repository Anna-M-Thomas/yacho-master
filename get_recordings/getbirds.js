const axios = require("axios");
const https = require("https");
const dbJSON = "http://localhost:3001/birds";
const xenoCanto = "https://www.xenocanto.org/api/2/recordings?query=";

const birdName = "troglodytes+troglodytes";

// const testBird = {
//   name: "Bird Bird",
//   species: "yellow",
//   habitat: "Sesame Street",
// };

agent: new Agent({ rejectUnauthorized: false });

const getData = async (birdQuery) => {
  try {
    console.log("this is the url", `${xenoCanto}${birdName}`);
    const result = await axios({
      method: "get",
      url: xenoCanto,
      agent: new Agent({ rejectUnauthorized: false }),
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

const saveData = async (birdResult) => {
  try {
    await axios.post(dbJSON, birdResult);
  } catch (error) {
    console.log(error);
  }
};

getData(birdName);
