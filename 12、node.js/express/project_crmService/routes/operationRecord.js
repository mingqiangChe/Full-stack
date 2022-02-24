// 操作记录
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../services/operationRecordService');


// 操作记录表路由
router.post('/queryOperationRecord', service.queryOperationRecord);
module.exports = router;