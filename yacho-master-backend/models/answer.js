const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  xenoId: String,
  nameEn: String,
  nameJp: String,
  right: Number,
  wrong: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

answerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Answer", answerSchema);
