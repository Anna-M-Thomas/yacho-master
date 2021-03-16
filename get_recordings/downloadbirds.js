const { DownloaderHelper } = require("node-downloader-helper");

const downloadBird = (id) => {
  // URL. This will be "http:"" and then ${file} inside object
  const file = `http://www.xeno-canto.org/${id}/download`;
  // Path at which image will be downloaded
  const filePath = `./files`;
  const options = { fileName: `${id}.mp3` };

  const dl = new DownloaderHelper(file, filePath, options);

  dl.on("end", () => console.log("Download Completed"));
  dl.start();
};

downloadBird("611565");
