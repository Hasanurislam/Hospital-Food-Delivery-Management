const express = require('express');
const router = express.Router();
const { getMenus, createMenu, updateMenu, deleteMenu } = require('../menuController');

router.route('/').get(getMenus).post(createMenu);
router.route('/:id').put(updateMenu).delete(deleteMenu);

module.exports = router;
