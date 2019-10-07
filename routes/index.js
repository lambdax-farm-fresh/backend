const express = require('express');
const router = express.Router();

const users = require('./user');
const farms = require('./farms');
const inventories = require('./inventory');
const auth = require('./auth');

router.use('/users', users);
router.use('/farms', farms);
router.use('/', auth)

module.exports = router;