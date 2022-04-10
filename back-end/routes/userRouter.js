const router = require('express').Router()
const User = require("../middleware/user")
const Admin = require("../middleware/admin")
const userCtrl = require("../controllers/userCtrl")

router.get('/user/:id', userCtrl.getUser)
router.patch('/user', User, userCtrl.updateUser)

router.get('/all_user', User, Admin, userCtrl.getAllUser)
router.get('/search_user', User, userCtrl.searchUser)

router.delete('/delete/:id', User, Admin, userCtrl.deleteUser)

module.exports = router