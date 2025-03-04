import mongoose from "mongoose";

const users = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

export default mongoose.models.users || mongoose.model("users", users);
