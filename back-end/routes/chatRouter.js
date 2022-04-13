const router = require('express').Router()
const chatCtrl = require('../controllers/chatCtrl')
const User = require('../middleware/user')

router.post('/chat', User, chatCtrl.createChat)
router.get('/conversation', User, chatCtrl.getUserConversation)
router.get('/chat/:id', User, chatCtrl.getChat)
router.delete('/chat/:id', User, chatCtrl.deleteChat)
router.delete('/conversation/:id', User, chatCtrl.deleteConversation)

module.exports = router