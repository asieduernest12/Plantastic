import mongoose, { Schema } from "mongoose";
import plantNotesSchema from "./Plantnote.js";

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
  plantNotes: [plantNotesSchema],
});

const Plant = mongoose.model("Plant", plantSchema);

export default Plant;
