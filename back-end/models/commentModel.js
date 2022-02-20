const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true   
    },
    post_id:{
        type: String,
        required: true
    },
    reply: {
        type: Array,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Comments', commentSchema)