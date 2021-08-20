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

      //Password encryption
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
      });

      //Create jsonwebtoken to authentication
      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      // Thiết lập Cookie
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 412 * 24 * 60 * 60 * 1000, //412 days
      });

      //Save MongoDB
      await newUser.save();

      res.json({
        msg: "Đăng ký thành công rồi !",
        access_token,
        user: {
          //_doc để trả lại thông tin cần thiết người dùng
          ...newUser._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        "followers following",
        // MongoDB no return password
        "-password"
      );
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword)
        return res.status(400).json({ msg: "Password is incorrect" });

      //Create jsonwebtoken to authentication
      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      // Thiết lập Cookie
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 412 * 24 * 60 * 60 * 1000, //412 days
      });

      res.json({
        msg: "Đăng nhạp thành công rồi !",
        access_token,
        user: {
          //_doc để trả lại thông tin cần thiết người dùng
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Đăng xuất thành công !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rftoken = req.cookies.refreshtoken;
      if (!rftoken)
        return res.status(400).json({ msg: "Làm ơn hãy đăng nhập" });
      //Middleware làm mới accessToken
      jwt.verify(
        rftoken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Làm ơn hãy đăng nhập" });
          //result = data of payload id,iat,exptime,...
          const user = await Users.findById(result.id)
            .select("-password")
            .populate("followers following", "-password");
          if (!user) return res.status(400).json({ msg: "Không tồn tại" });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        }
      );
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
    expiresIn: "412d",
  });
};

module.exports = authCtrl;
