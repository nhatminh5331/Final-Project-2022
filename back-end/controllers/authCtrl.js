const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail")
const {CLIENT_URL} = process.env

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password } = req.body;

      const newUserName = username.replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name)
        return res.status(400).json({ msg: "Tên người dùng đã tồn tại" });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "Email này đã tồn tại" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Mật khẩu phải có ít nhất 6 kí tự" });

      //Password encryption
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        fullname, username: newUserName, email, password: passwordHash
      }

      const activation_token = createActivationToken(newUser)

      const url = `${CLIENT_URL}/api/activate/${activation_token}`
      sendMail(email, url, "Xác thực tài khoản")

      res.json({msg: "Đăng ký thành công! Hãy kích hoạt tài khoản qua email."});
      
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
        const {activation_token} = req.body
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

        const {fullname, username, email, password} = user

        const check = await Users.findOne({email})
        if(check) 
        return res.status(400).json({msg:"Email này đã tồn tại."})

        const newUser = new Users({
          fullname, username, email, password
        })

        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        // Thiết lập Cookie
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/api/refresh_token",
          maxAge: 412 * 24 * 60 * 60 * 1000, //412 days
        });

        //Save MongoDB
        await newUser.save()

        res.json({msg: "Tài khoản kích hoạt thành công!",
        access_token,
        user: {
          //_doc để trả lại thông tin cần thiết người dùng
          ...user._doc,
          password: "",
        },
      })

    } catch (err) {
        return res.status(500).json({msg: err.message})
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
        return res.status(400).json({ msg: "Email không tồn tại !" });

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword)
        return res.status(400).json({ msg: "Mật khẩu không chính xác !" });

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
        msg: "Đăng nhập thành công !",
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
      res.clearCookie("refreshtoken", { path:"/api/refresh_token"});
      return res.json({ msg: "Đăng xuất thành công !" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rftoken = req.cookies.refreshtoken;
      if (!rftoken)
        return res.status(400).json({ msg: "Xin hãy đăng nhập" });
      //Middleware làm mới accessToken
      jwt.verify(rftoken,process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Xin hãy đăng nhập" });

          //result = data of payload id,iat,exptime,...
          const user = await Users.findById(result.id)
            .select("-password")
            .populate("followers following", "-password");
          if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại" });

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
  forgotPassword: async (req, res) => {
    try {
      const {email} = req.body
      const user = await Users.findOne({email})
      if(!user) 
      return res.status(400).json({msg: "Email này không tồn tại"})

      const access_token = createAccessToken({id: user._id})
      const url = `${CLIENT_URL}/api/reset/${access_token}`

      sendMail(email, url, "Đặt lại mật khẩu")

      res.json({msg: "Kiểm tra email để đổi mật khẩu mới !"})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  resetPassword: async (req, res) => {
    try {
      const {password} = req.body
      console.log(password)

      const passwordHash = await bcrypt.hash(password, 12)

      await Users.findOneAndUpdate({_id: req.user.id}, {
          password: passwordHash
      })

      res.json({msg: "Mật khẩu thay đổi thành công !"})
    } catch (err) {
      return res.status(500).json({msg: err.message})
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
//Activation accessToken
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

module.exports = authCtrl;
