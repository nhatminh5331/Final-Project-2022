const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const User = require('../middleware/user')
const Admin = require('../middleware/admin')

router.route('/post')
    .get(postCtrl.getPost)
    .post(User, Admin, postCtrl.createPost)

router.route('/post/:id')
    .delete(User, Admin, postCtrl.deletePost)
    .put(User, Admin, postCtrl.updatePost)

module.exports = router