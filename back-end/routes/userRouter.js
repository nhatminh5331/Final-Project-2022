const router = require('express').Router()
const User = require("../middleware/user")
const userCtrl = require("../controllers/userCtrl")

router.get('/user/:id', User, userCtrl.getUser)
router.patch('/user', User, userCtrl.updateUser)

module.exports = router