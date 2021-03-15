const axios = require("axios");
const dbJSON = "http://localhost:3001/birds";
const xenoCanto = "https://www.xeno-canto.org/api/2/recordings?query=";

const birdName = "Japanese Paradise Flycatcher";

const getData = async (birdQuery) => {
  try {
    console.log("this is the url", `${xenoCanto}${birdName}`);
    const result = await axios.get(`${xenoCanto}${birdName}`);
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

// const saveData = async (birdResult) => {
//   try {
//     await axios.post(dbJSON, birdResult);
//   } catch (error) {
//     console.log(error);
//   }
// };

getData(birdName);

//I probably don't actually need https and there was something wrong with URL,
//axios OK now
// const https = require("https");

// const googleTest = "https://www.googleapis.com/books/v1/volumes?q=cat";
// const xenoCantoTest =
//   "https://www.xeno-canto.org/api/2/recordings?query=cnt:brazil";

// https
//   .get(`${xenoCanto}${birdName}`, (res) => {
//     console.log(`statusCode: ${res.statusCode}`);
//     console.log("headers:", res.headers);

//     res.on("data", (data) => {
//       process.stdout.write(d);
//     });
//   })
//   .on("error", (e) => {
//     console.error(e);
//   });
