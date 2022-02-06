const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");
const auth = ('../middleware/auth.js')

router.post("/register", authCtrl.register);

router.post("/activation", authCtrl.activateEmail);

router.post("/login", authCtrl.login);

router.post("/logout", authCtrl.logout);

router.post("/refresh_token", authCtrl.generateAccessToken);

router.post("/forgot", authCtrl.forgotPassword);

// router.post("/reset", auth, authCtrl.resetPassword);

module.exports = router;
