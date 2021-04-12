const imagesRouter = require("express").Router();
const axios = require("axios");
const config = require("../utils/config");

imagesRouter.post("/", async (request, response, next) => {
  try {
    const birdName = request.body.birdname;
    const result = await axios.get(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.FLICKER_KEY}&tags=${birdName}&per_page=1&format=json&nojsoncallback=1&extras=owner_name`
    );
    //It's already in json,
    return response.send(result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = imagesRouter;
