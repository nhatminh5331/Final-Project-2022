const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
    title:{
        type: String,
        required: true,
        maxlength: 30,
    },
    information:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    comments: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'comment' 
    }],
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    },
  }, 
    {
    timestamps: true 
    }
);


module.exports = mongoose.model("post", postSchema)