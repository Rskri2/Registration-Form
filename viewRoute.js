const express = require('express');
const Ctrl  = require('./Controller');
const router = express.Router();

router.get('/',Ctrl.Form);

module.exports = router;