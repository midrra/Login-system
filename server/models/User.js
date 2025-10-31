import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String }, 
  googleId: { type: String, index: true, sparse: true }, 
  picture: { type: String }, 
  provider: { type: String, enum: ["local", "google"], default: "local" },
  emailVerified: { type: Boolean, default: false }, // useful to track verification status
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
},
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
