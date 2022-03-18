const router = require('express').Router()
const commentCtrl = require('../controllers/commentCtrl')
const User = require('../middleware/user')

router.post('/comment', User, commentCtrl.createComment)

router.patch('/comment/:id', User, commentCtrl.updateComment)

router.delete('/comment/:id', User, commentCtrl.deleteComment)

module.exports = router