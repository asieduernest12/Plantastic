import { Schema, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// create our PlantNote schema
const plantNotesSchema = new Schema({
  noteId: {
    type: String,
    default: () => uuidv4(),
  },
  note: {
    type: String,
    required: true,
    maxLength: 250,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

function dateFormat(date) {
  return date.toLocaleDateString();
}

export default plantNotesSchema;