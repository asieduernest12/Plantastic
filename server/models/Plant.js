const { Schema, model } = require("mongoose");
const plantNoteSchema = require("./Plantnote");

// create our Plant model
const plantSchema = new Schema({
  latinName: {
    type: String,
    required: true,
    trim: true,
  },
  commonName: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: true,
  },
  idealLight: {
    type: String,
    required: true,
  },
  watering: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  notification: {
    type: Boolean,
    required: true,
    default: false,
  },
  plantNotes: [plantNoteSchema],
});

const Plant = model("Plants", plantSchema);

module.exports = Plant;
