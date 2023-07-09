import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = mongoose.connect(
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/project3db"
); // change link once we have a name

export default connection;
