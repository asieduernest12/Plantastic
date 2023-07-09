import mongoose from "mongoose";
const connection = mongoose.connect("mongodb://127.0.0.1:27017/project3db"); // change link once we have a name

export default connection;
