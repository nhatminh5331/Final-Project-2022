const Category = require('../models/categoryModel')
const Posts = require('../models/postModel')

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            // if user have role = 1 ==> admin
            // only admin can create , delete, update category
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "Thể loại này đã tồn tại."})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Đã tạo thể loại mới !"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            const posts = await Posts.findOne({category: req.params.id})
            if(posts) return res.status(400).json({
                msg: "Vui lòng xóa các bài đăng có thể loại này !"
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Đã xóa thể loại !"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Đã cập nhật thể loại !"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = categoryCtrl