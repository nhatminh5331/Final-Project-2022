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
    }
}, {
    timestamps: true //For sorting feature
})


module.exports = mongoose.model("Posts", postSchema)