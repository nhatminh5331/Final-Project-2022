const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const User = require('../middleware/user')

router.route('/posts')
    .post(User, postCtrl.createPost)    
    .get(postCtrl.getPost)

router.route('/post/:id')
    .patch(User, postCtrl.updatePost)
    .delete(User, postCtrl.deletePost)

module.exports = router