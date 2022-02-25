// 首页图表展示
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../services/displayChartService');
// 客户池列表
router.post('/queryYesterdayPerformance', service.queryYesterdayPerformance);
router.post('/queryTodayPerformance', service.queryTodayPerformance);
router.post('/querySevenDaysADay', service.querySevenDaysADay);
router.post('/queryEveryMonthOfTheYear', service.queryEveryMonthOfTheYear);
router.post('/queryEveryProuducts', service.queryEveryProuducts);

module.exports = router;