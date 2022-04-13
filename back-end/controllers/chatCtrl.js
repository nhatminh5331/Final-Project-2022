const Chat = require('../models/chatModel')
const Conversation = require('../models/conversationModel')

class Chatfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

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
            
            const feature = new Chatfeatures(Conversation.find({
                recipients: req.user._id
            }), req.query).paginating()

            const conversation = await feature.query.sort('-updatedAt')
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
            
            const feature = new Chatfeatures(Chat.find({
                $or: [
                    {sender: req.user._id, recipient: req.params.id},
                    {sender: req.params.id, recipient: req.user._id}
                ]
            }), req.query).paginating()

            const chat = await feature.query.sort('-createdAt')
            
            res.json({
                chat,
                result: chat.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteChat: async (req, res) => {
        try {
            await Chat.findOneAndDelete({_id: req.params.id, sender: req.user._id})
            res.json({msg: "Delete Message  Success !"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = ChatCtrl