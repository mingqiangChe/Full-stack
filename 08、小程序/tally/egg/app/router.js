"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt);

  /**
   * api.js
   */
  // user
  router.post("/api", controller.api.index); // 测试接口
  router.get("/test", controller.api.test); // 测试接口
  router.post("/users/getUserInfo", controller.api.getUserInfo); // 获取用户信息接口 判断权限
  router.post("/users/setLoginInfoFlag", jwt, controller.api.setLoginInfoFlag); // post 授权获取用户信息并登录一个用户并实现创建用户基础数据

  router.get("/users/checkHasUser", jwt, controller.api.checkHasUser); // get 判断是否有这个用户
  router.get(
    "/users/getUserDefaultInfo",
    jwt,
    controller.api.getUserDefaultInfo
  ); // get 查询用户创建时的默认信息
  router.get(
    "/users/getUserDefaultCategory",
    jwt,
    controller.api.getUserDefaultCategory
  ); // get 查询分类创建时的默认信息
  router.get(
    "/detail/getDetailDataList",
    jwt,
    controller.api.getDetailDataList
  ); // get 查询某个月到当前时间某个用户的所有账单信息列表
  router.post("/bill/submitInfo", jwt, controller.api.submitInfo); // post 提交一条账单信息 分类创建时的默认信息 增
  router.get("/bill/submitInfo/:id", jwt, controller.api.submitInfo); // get 通过id查询一个账单信息 查
  router.put("/bill/submitInfo/:id", jwt, controller.api.submitInfo); // put 通过id修改一个账单信息 改
  router.delete("/bill/submitInfo/:id", jwt, controller.api.submitInfo); // delete 通过id修改一个账单信息 删
  /**
   * home.js
   */
  router.get("/", controller.home.index);
  router.get("/rightSun", controller.home.rightSun);
  /**
   * rightSun.js
   */
  router.get("/rightSunPage", controller.rightSun.index);
  router.get("/my", controller.rightSun.my);
  router.get("/getGirls", controller.rightSun.getGirls);
  router.get("/getGirl", controller.rightSun.getGirl);
  router.get("/getGirl2/:name", controller.rightSun.getGirl2);
  router.post("/add", controller.rightSun.add);
};
