const router = require('express').Router()
const chatCtrl = require('../controllers/chatCtrl')
const User = require('../middleware/user')

router.post('/chat', User, chatCtrl.createChat)
router.get('/conversation', User, chatCtrl.getUserConversation)
router.get('/chat', User, chatCtrl.getChat)

module.exports = router