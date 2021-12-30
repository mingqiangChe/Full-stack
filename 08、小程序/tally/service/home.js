import request from "./network.js";

export function checkHasUser() {
  return request({
    url: "/users/checkHasUser",
    data: {
      
    },
  });
}
// get 获取默认打卡数据
export function getClockingData() {
  return request({
    url: "/users/getUserDefaultInfo",
    data: {
      
    },
  });
}
// get 获取默认分类数据
export function getCategoryData() {
  return request({
    url: "/users/getUserDefaultCategory",
    data: {
      
    },
  });
}
// get 获取每月明细账单列表数据
export function getDetailDataList(queryTime) {
  return request({
    url: "/detail/getDetailDataList",
    data: {
      queryTime,
    },
  });
}

// post 登录获取用户
export function getOpenId(js_code) {
  return request({
    method: "post",
    url: "/users/getUserInfo",
    data: {
      js_code,
    },
  });
}
// post 授权获取用户信息并登录一个用户
export function setLoginFlag({ username,  session_key, sex, avatar }) {
  return request({
    method: "post",
    url: "/users/setLoginInfoFlag",
    data: {
      username,
      
      session_key,
      sex,
      avatar,
    },
  });
}
export function submitInfo({
  deliveryMethod,
  categoryName,
  categoryIcon,
  createTime,
  tag,
  money,
  
}) {
  return request({
    method: "post",
    url: "/bill/submitInfo",
    data: {
      deliveryMethod,
      categoryName,
      categoryIcon,
      createTime,
      tag,
      money,
      
    },
  });
}
export function putBillInfoById(
  id,
  { deliveryMethod, categoryName, categoryIcon, tag, money }
) {
  return request({
    method: "put",
    url: "/bill/submitInfo/" + id,
    data: {
      deliveryMethod,
      categoryName,
      categoryIcon,
      tag,
      money,
    },
  });
}
// get
export function getBillInfoById(id) {
  return request({
    method: "get",
    url: "/bill/submitInfo/" + id,
  });
}
// delete
export function deleteBillInfoById(id) {
  return request({
    method: "delete",
    url: "/bill/submitInfo/" + id,
  });
}

export function getGoodsData(type, page) {
  return request({
    url: "/home/data",
    data: {
      type,
      page,
    },
  });
}
