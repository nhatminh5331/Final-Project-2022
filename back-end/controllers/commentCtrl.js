const Comment = require('../models/commentModel')
const Posts = require('../models/postModel')

const commentCtrl = {
    createComment: async (req, res) => {
        try {
            const {postId, content, reply} = req.body

            const newComment = new Comment({
                user: req.user._id, content, reply
            })

            await Posts.findOneAndUpdate({_id: postId},{
                $push: {comments: newComment._id}
            }, {new: true})

            await newComment.save()

            res.json({newComment})

        } catch (err) {
            
        }
    }
}

module.exports = commentCtrl