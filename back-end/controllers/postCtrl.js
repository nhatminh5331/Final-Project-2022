const Posts = require('../models/postModel')

const postCtrl = {
    getPost: async(req, res) =>{
        try {
            //Filtering
            const queryObj = { ...req.query } 
            const excludedFields = ['page', 'sort', 'limit']
            excludedFields.forEach(el => delete queryObj[el])

            let queryString = JSON.stringify(queryObj)
            queryString = queryString.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => '$' + match)
            let query = Posts.find(JSON.parse(queryString)) 

            // Sorting
            if (req.query.sort) {
                const sortPost = req.query.sort.split(',').join(' ')
                query = query.sort(sortPost)
              } else {
                query = query.sort('-createdAt')
              }
              
            //Pagination
            const page = req.query.page * 1 || 1
            const limit = req.query.limit * 1 || 9
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);


            const posts = await query
            res.json({
                status: 'success',
                result: posts.length,
                posts
            })
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPost: async(req, res) =>{
        try {
            const {post_id, title, information, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Không có hình ảnh để cập nhật"})

            const post = await Posts.findOne({post_id})
            if(post)
            return res.status(400).json({msg: "Bài viết đã tồn tại"})

            const newPost = new Posts({
                post_id, title, information, content, images, category
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
                title, information, content, images, category
            })

            res.json({msg: "Đã cập nhật bài viết"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = postCtrl