const axios = require("axios");
const dbJSONyesbird = "http://localhost:3001/birds";
const dbJSONnobird = "http://localhost:3001/noresult";

const xenoCanto = "https://www.xeno-canto.org/api/2/recordings?query=";

const birdNames = ["Japanese Paradise Flycatcher", "Ural owl", "bad query"];

const getData = async (birdQuery) => {
  try {
    console.log("this is the url", `${xenoCanto}${birdQuery}`);
    const result = await axios.get(`${xenoCanto}${birdQuery}`);
    let birds = result.data.recordings;
    //the creative commons license we want: non commercial share alike
    const ccbird = birds.find(
      (bird) => bird.lic === "//creativecommons.org/licenses/by-nc-sa/4.0/"
    );
    if (ccbird) {
      saveBird(ccbird);
    } else noBird(ccbird);
  } catch (error) {
    console.log(error);
  }
};

const saveBird = async (birdResult) => {
  try {
    await axios.post(dbJSONyesbird, birdResult);
  } catch (error) {
    console.log(error);
  }
};

const noBird = async (birdResult) => {
  try {
    await axios.post(dbJSONnobird, birdResult);
  } catch (error) {
    console.log(error);
  }
};

birdNames.forEach((bird) => getData(bird));

// getData(birdName);

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
