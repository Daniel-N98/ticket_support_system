import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "banned"],
    default: "active",
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);