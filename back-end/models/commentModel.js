const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    },
    reply: mongoose.Types.ObjectId,
}, {
    timestamps: true
})


module.exports = mongoose.model('comment', commentSchema)