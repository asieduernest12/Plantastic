import mongoose, { Schema } from "mongoose";
import plantNote from "./Plantnote";

// create our Plant model
const plantSchema = new Schema({
  latinName: {
    type: String,
    required: true,
  },
  commonName: {
    type: String,
    required: true,
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
  plantNotes: [plantNote],
});

const Plant = model("Plants", plantSchema);

export default Plant;
