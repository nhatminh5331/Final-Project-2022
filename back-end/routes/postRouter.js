const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const User = require('../middleware/user')

router.route('/posts')
    .post(User, postCtrl.createPost)    
    .get(postCtrl.getPost)

// router.route('/post/:id')
//     .delete(User, postCtrl.deletePost)
//     .patch(User, postCtrl.updatePost)

module.exports = router