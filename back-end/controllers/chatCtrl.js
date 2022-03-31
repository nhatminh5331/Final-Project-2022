const Chat = require('../models/chatModel')
const Conversation = require('../models/conversationModel')


const ChatCtrl = {
    createChat: async (req, res) => {
        try {
            const {recipient, text, media} = req.body
            
            if(!recipient || (!text.trim() && media.length === 0)) return

            const newConversation = await Conversation.findOneAndUpdate({
                $or: [
                    {recipients: [req.user._id, recipient]},
                    {recipients: [recipient, req.user._id]}
                ]
            },{
                recipients: [req.user._id, recipient],
                text,media
            }, {new: true, upsert: true})

            const newChat = new Chat({
                conversation: newConversation._id,
                sender: req.user._id,
                recipient, text, media
            })

            await newChat.save()

            res.json({msg: "Created new chat"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserConversation: async (req, res) => {
        try {

            //Filtering, Search
            const queryObj = { ...req.query } 
            const excludedFields = ['page', 'sort', 'limit']
            excludedFields.forEach(el => delete queryObj[el])

            let queryString = JSON.stringify(queryObj)
            queryString = queryString.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => '$' + match)
            let query = Conversation.find(JSON.parse(queryString))
              
            //Pagination
            const page = req.query.page * 1 || 1
            const limit = req.query.limit * 1 || 9
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);

            const conversation = await query.sort('-updatedAt')
            .populate("recipients", "avatar username")
            
            res.json({
                conversation,
                result: conversation.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getChat: async (req, res) => {
        try {

            //Filtering, Search
            const queryObj = { ...req.query } 
            const excludedFields = ['page', 'sort', 'limit']
            excludedFields.forEach(el => delete queryObj[el])

            let queryString = JSON.stringify(queryObj)
            queryString = queryString.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => '$' + match)
            let query = Chat.find({
                $or: [
                {sender: req.user._id, recipients: req.params.id},
                {sender: req.params.id, recipients: req.user._id}
            ]
            })(JSON.parse(queryString))
            // $or: [
            //     {sender: req.user._id, recipients: req.params.id},
            //     {sender: req.params.id, recipients: req.user._id}
            // ]
              
            //Pagination
            const page = req.query.page * 1 || 1
            const limit = req.query.limit * 1 || 9
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);

            const chat = await query.sort('-createdAt')
            
            res.json({
                chat,
                result: chat.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = ChatCtrl