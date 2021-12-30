"use strict";
const Controller = require("egg").Controller;
class rightSunController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "<h1>I am rightSun</h1>";
  }
  async my() {
    const ctx = this.ctx;
    await ctx.render("rightSun.html", {
      name: "小红",
      age: 18,
    });
  }
  async getGirls() {
    const { ctx } = this;
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve((ctx.body = "<h1>杨幂，正向你走来</h1>"));
      }, 4500);
    });
  }
  async getGirl() {
    const { ctx } = this;
    const id = ctx.query.id;
    const res = await ctx.service.rightSun.getGirl(id);
    ctx.body = res;
  }
  async getGirl2() {
    const { ctx } = this;
    ctx.body = ctx.params.name + JSON.stringify(ctx.params);
  }
  // post请求
  async add() {
    this.ctx.body = "hello";
  }
}
module.exports = rightSunController;
