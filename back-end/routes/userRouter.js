const router = require('express').Router()
const User = require("../middleware/user")
const Admin = require("../middleware/admin")
const userCtrl = require("../controllers/userCtrl")

router.get('/user/:id', User, userCtrl.getUser)
router.patch('/user', User, userCtrl.updateUser)

router.get('/all_user', User, Admin, userCtrl.getAllUser)


module.exports = router