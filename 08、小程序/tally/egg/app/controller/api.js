"use strict";
const { Controller } = require("egg");

class ApiController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await {
      code: 0,
      message: "hi, egg",
    };
    console.log("api/home==>", ctx.request.body);
  }
  async test() {
    const ctx = this.ctx;
    console.log(ctx.request.params);
    ctx.body = ctx.request.params;
  }
  // post 登录获取用户openid
  async getUserInfo() {
    const ctx = this.ctx;
    const js_code = ctx.request.body.js_code;
    console.log("users/getUserInfo==>", js_code);
    ctx.body = await ctx.service.api.getUserInfo(js_code);
  }
  // post 授权获取用户信息并登录一个用户
  async setLoginInfoFlag() {
    const ctx = this.ctx;
    const bodyData = ctx.request.body;
    console.log("users/setLoginInfoFlag==>", bodyData);
    ctx.body = await ctx.service.api.setLoginInfoFlag(bodyData);
  }
  // get 判断是否有这个用户
  async checkHasUser() {
    const ctx = this.ctx;
    const bodyData = ctx.query;
    console.log("users/checkHasUser==>", bodyData);
    ctx.body = await ctx.service.api.checkHasUser(bodyData);
  }
  // get 获取用户默认信息
  async getUserDefaultInfo() {
    const ctx = this.ctx;
    const bodyData = ctx.query;
    console.log("users/getUserDefaultInfo==>", bodyData);
    ctx.body = await ctx.service.api.getUserDefaultInfo(bodyData);
  }
  // get 获取分类默认信息
  async getUserDefaultCategory() {
    const ctx = this.ctx;
    const bodyData = ctx.query;
    console.log("users/getUserDefaultCategory==>", bodyData);
    ctx.body = await ctx.service.api.getUserDefaultCategory(bodyData);
  }
  //post 提交一条数据
  async submitInfo() {
    const ctx = this.ctx;
    const bodyData = ctx.request.body;
    console.log("bill/submitInfo==>", bodyData);
    const paramsData = ctx.params;
    switch (ctx.method) {
      case "GET":
        ctx.body = await ctx.service.api.getBillInfoById(paramsData);
        break;
      case "POST":
        ctx.body = await ctx.service.api.submitInfo(bodyData);
        break;
      case "DELETE":
        ctx.body = await ctx.service.api.delBillInfoById(paramsData);
        break;
      case "PUT":
        const data = Object.assign(paramsData, bodyData);
        ctx.body = await ctx.service.api.putBillInfoById(data);
        break;

      default:
        break;
    }
  }
  //查询某个月到当前时间某个用户的所有账单信息列表
  async getDetailDataList() {
    const ctx = this.ctx;
    const bodyData = ctx.query;
    console.log("detail/getDetailDataList==>", bodyData);
    ctx.body = await ctx.service.api.getDetailDataList(bodyData);
  }
  // get 通过id查询一个账单信息
}

module.exports = ApiController;
