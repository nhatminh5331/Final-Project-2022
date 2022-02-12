const Posts = require('../models/postModel')

const postCtrl = {
    createPost: async(req, res) =>{
        try {
            const {post_id, title, information, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Không có hình ảnh để cập nhật"})

            const post = await Posts.findOne({post_id})
            if(post)
                return res.status(400).json({msg: "Bài viết đã tồn tại"})

            const newPost = new Posts({
                post_id, title: title.toLowerCase(), information, content, images, category
            })

            await newPost.save()
            res.json({msg: "Đã tạo bài viết mới"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePost: async(req, res) =>{
        try {
            await Posts.findByIdAndDelete(req.params.id)
            res.json({msg: "Đã xóa bài viết"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePost: async(req, res) =>{
        try {
            const {title, information, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Không có hình ảnh để cập nhật"})

            await Posts.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), information, content, images, category
            })

            res.json({msg: "Đã cập nhật bài viết"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = postCtrl