const router = require('express').Router()
const commentCtrl = require('../controllers/commentCtrl')
const User = require('../middleware/user')

router.post('/comment', User, commentCtrl.createComment)

module.exports = router