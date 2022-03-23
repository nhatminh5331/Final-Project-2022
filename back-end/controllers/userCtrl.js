const Users = require("../models/userModel");

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            const users = await Users.find({username: {$regex: req.query.username}})
            .limit(5).select("fullname username avatar")
            
            res.json({users})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist !"})
            
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const { avatar, fullname, username, address, story } = req.body
            if(!fullname) return res.status(400).json({msg: "Please add your full name !"})

            await Users.findOneAndUpdate({_id: req.user._id}, {
                avatar, fullname, username, address, story
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAllUser: async (req, res) => {
        try {
            const users = await Users.find().select('-password')
            
            res.json({users})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = userCtrl