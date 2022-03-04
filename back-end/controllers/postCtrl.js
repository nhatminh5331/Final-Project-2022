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
    createPost: async(req, res) => { 
        try {
            const { title, information, content, images, category } = req.body;

            if(images.length === 0)
            return res.status(400).json({msg: "Please add your photo."})

            const newPost = new Posts({
                title, information, content, images, category, user: req.user._id
            })

            await newPost.save()

            res.json({
                msg: "Created Post !",
                newPost
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePost: async(req, res) =>{
        try {
            const {title, information, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Không có hình ảnh để cập nhật"})

            const updatePost = await Posts.findOneAndUpdate({_id: req.params.id}, {
                title, information, content, images, category
            })

            res.json({msg: "Đã cập nhật bài viết", updatePost})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePost: async(req, res) =>{
        try {
          const post = await Posts.findOneAndDelete({_id: req.params.id, user: req.user._id})
          
            res.json({msg: "Đã xóa bài viết"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

}


module.exports = postCtrl