const Users = require('../models/userModel')

const Admin = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== 1) 
            return res.status(500).json({msg: "Admin access denied."})

        next();

        } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = Admin