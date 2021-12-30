"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await this.app.mysql.query("");
    console.log(res, "res...");
    ctx.body = res;
  }
  async rightSun() {
    const { ctx } = this;
    ctx.body = "<h1>hello rightSun!!!</h1>";
  }
}

module.exports = HomeController;
