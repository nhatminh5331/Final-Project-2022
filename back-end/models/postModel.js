const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    post_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    // user: {type: mongoose.Types.ObjectId, ref: 'User'},
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
        type: [String],
        required: true
    }
}, {
    timestamps: true //For sorting feature
})


module.exports = mongoose.model("Posts", postSchema)