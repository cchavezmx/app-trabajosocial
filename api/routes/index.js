const express = require('express');
const router = express.Router();
const { errors } = require('celebrate');



router.use(require('./userRoutes'));
router.use(require('./notasRoutes'))



router.use(errors())
module.exports = router