const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const User = require('../middleware/user')

router.route('/posts')
    .get(postCtrl.getPost)
    .post(User, postCtrl.createPost)

router.route('/post/:id')
    .delete(User, postCtrl.deletePost)
    .patch(User, postCtrl.updatePost)

module.exports = router