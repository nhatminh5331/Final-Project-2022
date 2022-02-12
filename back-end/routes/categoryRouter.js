const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const User = require('../middleware/user')
const Admin = require('../middleware/admin')

router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(User, Admin, categoryCtrl.createCategory)

router.route('/category/:id')
    .delete(User, Admin, categoryCtrl.deleteCategory)
    .put(User, Admin, categoryCtrl.updateCategory)

module.exports = router