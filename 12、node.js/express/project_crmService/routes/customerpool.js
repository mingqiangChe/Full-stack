// 用户路由模块
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../services/customerpoolService.js');
// 客户池列表
router.post('/queryCustomerPool', service.queryCustomerPool);
router.post('/delectCustomerPoolItem', service.delectCustomerPoolItem);
router.post('/updateCustomerPoolItem', service.updateCustomerPoolItem);
router.post('/importMultipleData', service.importMultipleData);
router.post('/queryOnlineCustomers', service.queryOnlineCustomers);
module.exports = router;