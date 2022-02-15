const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    post_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    information:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    likes: [{
         type: mongoose.Types.ObjectId, 
         ref: 'user' 
        }],
    comments: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'comment' 
    }],
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    }
}, {
    timestamps: true //For sorting feature
})


module.exports = mongoose.model("Posts", postSchema)