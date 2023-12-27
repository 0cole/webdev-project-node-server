import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    follower: String,
    followed: String,
  },
  { collection: "follows" }
);

export default schema;