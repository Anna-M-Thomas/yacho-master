const axios = require("axios");
//full list
const birds = require("./birdlist");
//Second pass of missed birds
const pass2 = require("./remainingbirds");
const dbJSONyesbird = "http://localhost:3001/birds";
const dbJSONnobird = "http://localhost:3001/noresult";
const xenoCanto = "https://www.xeno-canto.org/api/2/recordings?query=";

//const searchBirds = pass1.map((bird) => bird.en);

const getData = async (birdQuery) => {
  try {
    console.log("this is the url", `${xenoCanto}${birdQuery}`);
    const result = await axios.get(`${xenoCanto}${birdQuery}`);
    let birds = result.data.recordings;
    //the creative commons license we want: non commercial share alike
    const ccbird = birds.find(
      (bird) => bird.lic === "//creativecommons.org/licenses/by-nc-sa/4.0/"
    );
    //Have to limit # of fields, the objects coming back are too big and filled up db.json
    if (ccbird) {
      const { "file-name": filename } = ccbird;
      const { id, en, rec, cnt, url, file, lic, length } = ccbird;
      const finalBird = { id, en, rec, cnt, url, file, lic, length, filename };
      saveBird(finalBird);
    } else noBird(birdQuery);
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

//This didn't work, I think everything unsuccessful was not null, or caught in catch(error)
const noBird = async (birdResult) => {
  try {
    await axios.post(dbJSONnobird, birdResult);
  } catch (error) {
    console.log(error);
  }
};

//the whole shebang
//searchBirds.forEach((bird) => getData(bird));
getData("Warbling white-eye");
