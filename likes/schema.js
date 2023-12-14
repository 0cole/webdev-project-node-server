import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    albumId: String,
  },
  { collection: "likes" }
);
export default schema;