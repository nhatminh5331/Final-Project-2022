const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name)
        return res.status(400).json({ msg: "This username already exists." });

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.json({
        msg: "Register thành công rồi !",
        access_token,
        user: {
          //_doc để trả lại thông tin cần thiết người dùng
          ...newUser._doc,
          //password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
//Access Token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
//Refresh Token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "42d",
  });
};

module.exports = authCtrl;
