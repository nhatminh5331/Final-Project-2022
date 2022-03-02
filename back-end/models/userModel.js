const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 12,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0 // admin = 1
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/gamemortal/image/upload/v1644678679/gameMortal/iq4g1n4gy8knrqvi6bgt.jpg",
    },
    address: {
      type: String,
      default: "",
    },
    story: {
      type: String,
      default: "",
      maxlength: 150,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
