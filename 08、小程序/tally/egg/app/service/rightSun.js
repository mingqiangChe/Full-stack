"use strict";
const { Service } = require("egg");
const { ERROR, SUCCESS, unique } = require("../util/util");

class rightSunService extends Service {
  async create(blog) {
    const { ctx } = this;
    try {
      const res = await this.ctx.model.Blog.create(blog);
      return Object.assign(
        {
          data: res,
        },
        SUCCESS
      );
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  async getGirl(id) {
    return {
      status: 200,
      data: {
        id,
        message: "我是女孩",
      },
    };
  }
}

module.exports = rightSunService;
