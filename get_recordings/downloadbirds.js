const { DownloaderHelper } = require("node-downloader-helper");
const dbjson = require("./db.json");

//238 birds long = 0 to 237
//Why do I have 239 items
//One of them is dsstore! OK.
const birdsIgot = dbjson.birds;
//const birdSlice = birdsIgot.slice(0, 10);
//const birdSlice = birdsIgot.slice(10, 20);
//const birdSlice = birdsIgot.slice(20, 30);
// const birdSlice = birdsIgot.slice(30, 40);
// const birdSlice = birdsIgot.slice(40, 50);
//const birdSlice = birdsIgot.slice(50, 60);
//const birdSlice = birdsIgot.slice(60, 70);
// const birdSlice = birdsIgot.slice(70, 80);
//const birdSlice = birdsIgot.slice(80, 90);
//const birdSlice = birdsIgot.slice(90, 100);
//const birdSlice = birdsIgot.slice(100, 120);
//const birdSlice = birdsIgot.slice(120, 140);

// Downloaded manually(140, 141)

// const birdSlice = birdsIgot.slice(141, 142);
// const birdSlice = birdsIgot.slice(142, 150);
// const birdSlice = birdsIgot.slice(150, 160);
// const birdSlice = birdsIgot.slice(160, 170);
//const birdSlice = birdsIgot.slice(170, 180);
// const birdSlice = birdsIgot.slice(180, 190);
// const birdSlice = birdsIgot.slice(190, 200);
// const birdSlice = birdsIgot.slice(200, 210);
// const birdSlice = birdsIgot.slice(210, 220);
// const birdSlice = birdsIgot.slice(220, 230);
// const birdSlice = birdsIgot.slice(230, 240);
//finished

// birdSlice.forEach((bird) => downloadBird(bird.id));

let counter = 1;

function downloadBird(id) {
  // URL.
  const file = `http://www.xeno-canto.org/${id}/download`;
  // Path at which file
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
