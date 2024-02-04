const express = require('express');
const router = express.Router();
const Ctrl = require('./Controller');

router.route('/register').post(Ctrl.formLogin);

module.exports = router;