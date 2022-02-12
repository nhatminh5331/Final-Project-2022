const Users = require('../models/userModel')

const Admin = (req, res, next) => {
    try {

        const user = Users.findOne({_id: req.user.id})

        if(user.role !== 1) 
            return res.status(500).json({msg: "Không có quyền truy cập admin."})

        next();

        } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = Admin