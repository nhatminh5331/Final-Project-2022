const router = require('express').Router()
const chatCtrl = require('../controllers/chatCtrl')
const User = require('../middleware/user')

router.post('/chat', User, chatCtrl.createChat)
router.get('/conversation', User, chatCtrl.getConversation)

module.exports = router