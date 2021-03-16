const { DownloaderHelper } = require("node-downloader-helper");
const dbjson = require("./db.json");

//238 birds long = 0 to 237
const birdsIgot = dbjson.birds;
//const birdSlice = birdsIgot.slice(0, 10);
//const birdSlice = birdsIgot.slice(10, 20);
//const birdSlice = birdsIgot.slice(20, 30);

birdSlice.forEach((bird) => downloadBird(bird.id));

let counter = 1;

function downloadBird(id) {
  // URL. This will be "http:"" and then ${file} inside object
  const file = `http://www.xeno-canto.org/${id}/download`;
  // Path at which image will be downloaded
  const filePath = `./files`;
  const options = { fileName: `${id}.mp3` };

  const dl = new DownloaderHelper(file, filePath, options);

  dl.on("end", () => {
    console.log(
      `Download Completed for ${id}. You have downloaded ${counter} files`
    );
    counter++;
  });

  dl.start();
}
