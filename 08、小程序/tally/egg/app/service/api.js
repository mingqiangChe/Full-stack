"use strict";
const { Service } = require("egg");
const querystring = require("querystring");
const _ = require("lodash");
const { ERROR, SUCCESS, unique } = require("../util/util.js");
class ApiService extends Service {
  //定时任务
  async getContent() {
    const { ctx } = this;
    const querySql = "SELECT 'x' FROM DUAL";
    await ctx.app.mysql.query(querySql);
  }
  // post 登录获取用户openid
  async getUserInfo(code) {
    const ctx = this.ctx;
    const data = {
      appid: "wx42c31f892d61bdd3",
      secret: "192225c7332daa30d14eff9c7408b9c9",
      js_code: code,
      grant_type: "authorization_code",
    };
    try {
      const res = await ctx.curl(
        `https://api.weixin.qq.com/sns/jscode2session?${querystring.stringify(
          data
        )}`,
        {
          dataType: "json",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          timeout: 6000,
        }
      );
      console.log("openid==>", res.data.openid);
      const token = ctx.app.jwt.sign(
        {
          ...res.data,
        },
        { expiresIn: "60m" }
      );
      // 没有openid 失败
      if (!res.data.openid) {
        return await _.assign(
          {
            msg: "没有openid",
            data: token,
          },
          ERROR
        );
      }
      // 有openid 但是需要判断当前是否数据库有了没有就注册有就不注册
      const queryOpenidSql = `select openid from user where openid ='${res.data.openid}'`;
      const queryOpenidResult = await ctx.app.mysql.query(queryOpenidSql);
      if (queryOpenidResult.length !== 1) {
        return await _.assign(ERROR, {
          msg: "没有注册账号",
          data: token,
        });
      }

      return await _.assign(
        {
          data: token,
        },
        SUCCESS
      );
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  // post 授权获取用户信息并登录一个用户
  async setLoginInfoFlag({ username, sex, avatar }) {
    const ctx = this.ctx;
    const { openid, session_key } = ctx.app.decode;
    try {
      // 判断库中是否有这个人 有就登录 没有就注册登录 如果有大于1个就报错
      if (!openid) {
        return await _.assign(ERROR, {
          msg: "openid不能为空",
        });
      }
      const queryOpenidSql = `select openid from user where openid ='${openid}'`;
      // 添加user_defined表个人的默认信息sql
      const queryOpenidResult = await ctx.app.mysql.query(queryOpenidSql);
      console.log(queryOpenidResult, "queryOpenidResult..");
      if (queryOpenidResult.length > 1) {
        return await _.assign(ERROR, {
          msg: "账号有误请联系管理员",
        });
      }
      if (queryOpenidResult.length !== 1) {
        // 注册并登录
        try {
          await ctx.app.mysql.query("SET autocommit = 0");
          await ctx.app.mysql.query("START TRANSACTION");
          await ctx.app.mysql.query(`USE ${ctx.app.database_name}`);
          // ---------------- 建用户初始数据 ---------------
          // 添加user表个人的默认信息sql
          const add_user_default_info = `INSERT IGNORE INTO user (username,openid,session_key,create_time,update_time,sex,avatar) VALUE ("${username}","${openid}","${session_key}",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"${sex}","${avatar}")`;
          const res = await ctx.app.mysql.query(add_user_default_info); // 添加user表个人的默认信息
          if (res && res.affectedRows === 1) {
            const add_default_info = `INSERT INTO ${ctx.app.database_name}.user_defined (user_defined_key, user_defined_value, create_user_id, \`describe\`) VALUES ('clock_frequency,reminder_time,sign/${openid},total_accounting_days,total_number_entries', '0,10:49:00,这家伙很懒，什么都没留下~,0,0', ${res.insertId}, '已连续打卡次数,提醒时间,个性签名,总记账天数,总记账笔数');INSERT INTO ${ctx.app.database_name}.\`category\` (\`category_name\`, \`category_icon\`, \`create_user_id\`, \`category_par\`, \`category_id\`) VALUES ('收入,支出,薪酬,借款,报销,退款,投资收益,社保公积金,他人转入,现金,红包,其他收入,餐饮,服饰美容,宠物,亲子,购物,出行,酒店,休闲娱乐,文体教育,公益,生活日用,医疗保健,充值缴费,房租房贷,保险,现金,转账他人,红包,手续费,还款,其他支出', 'shourux,cz-zc,gongzuoxinchoutongji,jiekuanhuankuan,baoxiao,tuikuan,touzi004,shebaogongjijin,zhuanzhang,xianjin,hongbao,shourux,daochacanyin,yundongfushi,chongwu,airudiantubiaohuizhi-zhuanqu_qinzichengchang,gouwu,chuchalvyouchuxing,jiudian,yule,jiaoyu,public-welfare,riyongpin,yaowan,shoujichongzhixian,fangzu,142-baoxian,xianjin,zhuanzhang,hongbao,fuwushouxufei,jiekuanhuankuan,cz-zc', ${res.insertId}, '2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34', '1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3')`;
            await ctx.app.mysql.query(add_default_info); // 添加category&user_defined表个人的默认信息
            // ---------------- 建用户初始数据 ---------------
            await ctx.app.mysql.query("COMMIT");
            await ctx.app.mysql.query("SET autocommit = 1");
            return await _.assign(
              {
                data: "注册并登录成功",
              },
              SUCCESS
            );
          } else {
            await ctx.app.mysql.query("ROLLBACK");
            await ctx.app.mysql.query("SET autocommit = 1");
            return await _.assign(ERROR, {
              msg: "注册账号失败",
            });
          }
        } catch (error) {
          console.log("报错了：", error);
          await ctx.app.mysql.query("ROLLBACK");
          await ctx.app.mysql.query("SET autocommit = 1");
          return await _.assign(ERROR, {
            msg: "注册账号失败",
          });
        }
      }
      // 登录
      return await _.assign(
        {
          data: "登录成功",
        },
        SUCCESS
      );
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  // get 判断是否有这个用户
  async checkHasUser() {
    console.log("checkHasUser.........");
    const ctx = this.ctx;
    const { openid, session_key } = ctx.app.decode;
    try {
      if (!openid) {
        return await _.assign(ERROR, {
          msg: "openid不能为空",
        });
      }
      const queryOpenidSql = `select openid from user where openid ='${openid}'`;
      const queryOpenidResult = await ctx.app.mysql.query(queryOpenidSql);
      // console.log(queryOpenidResult, "-----");
      if (queryOpenidResult.length === 1) {
        return await _.assign(SUCCESS, {
          msg: "查询成功",
        });
      } else {
        return await _.assign(ERROR, {
          msg: "账号有误请联系管理员",
        });
      }
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  // 获取用户默认信息
  async getUserDefaultInfo() {
    const ctx = this.ctx;
    const { openid, session_key } = ctx.app.decode;
    try {
      const queryDefaultInfoSql = ` SELECT user_defined_key,user_defined_value,create_user_id,\`describe\` FROM user_defined LEFT JOIN user u ON u.id = create_user_id WHERE create_user_id AND create_user_id = (SELECT id FROM user WHERE openid = '${openid}')
      `;
      const userInfoSql = `SELECT username,avatar FROM \`user\` WHERE openid = '${openid}'`;
      const qereryUserInfoResult = await ctx.app.mysql.query(userInfoSql);
      const queryDefaultInfoResult = await ctx.app.mysql.query(
        queryDefaultInfoSql
      );
      return await _.assign(
        {
          data: await _.assign(
            queryDefaultInfoResult[0],
            qereryUserInfoResult[0]
          ),
        },
        SUCCESS
      );
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  // 获取用户默认分类
  async getUserDefaultCategory() {
    const ctx = this.ctx;
    const { openid, session_key } = ctx.app.decode;
    try {
      const queryDefaultCategorySql = `SELECT \`category_name\`, \`category_icon\`, \`create_user_id\`, \`category_par\`, \`category_id\` FROM category WHERE create_user_id AND create_user_id = (SELECT id FROM user WHERE openid = '${openid}')`;
      console.log(queryDefaultCategorySql);
      const queryDefaultCategoryResult = await ctx.app.mysql.query(
        queryDefaultCategorySql
      );
      console.log(queryDefaultCategoryResult[0]);
      //-----------
      const resultInfo = [];
      const categoryItem = queryDefaultCategoryResult[0];
      categoryItem.category_id.split(",").forEach((element, index) => {
        resultInfo.push({
          category_name: categoryItem.category_name.split(",")[index],
          category_icon: categoryItem.category_icon.split(",")[index],
          category_par: categoryItem.category_par.split(",")[index],
          category_id: categoryItem.category_id.split(",")[index],
        });
      });
      //-------
      return await _.assign(
        {
          create_user_id: categoryItem.create_user_id,
          data: resultInfo,
        },
        SUCCESS
      );
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  //提交一条账单
  async submitInfo({
    deliveryMethod,
    categoryName,
    categoryIcon,
    createTime,
    tag,
    money,
  }) {
    const ctx = this.ctx;
    const { openid, session_key } = ctx.app.decode;
    try {
      const addBillSql = ` INSERT INTO \`bill\` (\`bill_delivery_method\`, \`bill_category_name\`, \`bill_category_icon\`, \`bill_tag\`, \`bill_money\`, \`create_time\`, \`update_time\`,\`create_user_id\`)
       VALUES ('${deliveryMethod}', '${categoryName}', '${categoryIcon}', '${tag}', ${money}, '${createTime}', CURRENT_TIMESTAMP,(SELECT id FROM user WHERE openid = '${openid}'))`;
      const addBillRequest = await ctx.app.mysql.query(addBillSql);
      if (addBillRequest.affectedRows === 1) {
        return await await _.assign(
          {
            data: "添加数据成功",
          },
          SUCCESS
        );
      } else {
        return await _.assign(ERROR, {
          msg: "添加数据失败",
        });
      }
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  //查询某个月到当前时间某个用户的所有账单信息列表
  async getDetailDataList({ queryTime }) {
    queryTime = queryTime + "-01";
    const ctx = this.ctx;
    const { openid, session_key } = ctx.app.decode;
    try {
      if (!openid || !queryTime) {
        return await _.assign(ERROR, {
          msg: "参数不全请检查",
        });
      }
      //查询语句
      const detailHeadSql = `SELECT DISTINCT SUBSTRING_INDEX(create_time,' ',1) AS dates FROM bill WHERE create_user_id = (SELECT id FROM user WHERE openid = '${openid}') AND create_time BETWEEN (SELECT DATE_ADD('${queryTime}',INTERVAL -1 SECOND)) AND (SELECT DATE_ADD('${queryTime}',INTERVAL 1 MONTH)) ORDER BY unix_timestamp(dates) DESC`;
      const detailDataListSql = `SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(c.category_name,',',FIND_IN_SET(b.bill_category_name,c.category_par)),',',-1) as category_name, 
      SUBSTRING_INDEX(SUBSTRING_INDEX(c.category_name,',',FIND_IN_SET(b.bill_delivery_method,c.category_par)),',',-1) as \`delivery_method\`,
      \`bill_category_icon\`, \`bill_tag\`, \`b\`.\`id\`,\`bill_money\`, \`create_time\`, \`update_time\`
           FROM bill b LEFT JOIN category c ON b.create_user_id= c.create_user_id
           WHERE c.create_user_id = (SELECT id FROM user WHERE openid = '${openid}') 
           AND create_time BETWEEN (SELECT DATE_ADD('${queryTime}',INTERVAL -1 SECOND)) AND (SELECT DATE_ADD('${queryTime}',INTERVAL 1 MONTH))`;
      console.log(detailDataListSql);
      const changeDetailHeadResquest = await ctx.app.mysql.query(detailHeadSql);
      const changeDetailDataListRequest = await ctx.app.mysql.query(
        detailDataListSql
      );
      if (changeDetailDataListRequest) {
        return await _.assign(
          {
            data: {
              headList: changeDetailHeadResquest,
              dataList: changeDetailDataListRequest,
            },
          },
          SUCCESS
        );
      } else {
        return await _.assign(ERROR, {
          msg: "添加数据失败",
        });
      }
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  // get 通过id查询一个账单信息
  async getBillInfoById({ id }) {
    const ctx = this.ctx;
    const { openid, session_key } = ctx.app.decode;
    try {
      const billInfoByIdSql = `SELECT * FROM bill LEFT user JOIN bill.id = user.id WHERE bill.id = ${id} AND user.idopenid = ${openid}`;
      const billInfoByIdRequest = await ctx.app.mysql.query(billInfoByIdSql);
      if (billInfoByIdRequest) {
        return await _.assign(
          {
            data: billInfoByIdRequest[0],
          },
          SUCCESS
        );
      } else {
        return await _.assign(ERROR, {
          msg: "查询数据失败",
        });
      }
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  // del 通过id删除一个账单信息
  async delBillInfoById({ id }) {
    console.log(id, "deleteid");
    const ctx = this.ctx;
    const { openid, session_key } = ctx.app.decode;
    try {
      const billInfoByIdSql = `DELETE FROM bill LEFT user JOIN bill.id = user.id WHERE bill.id = ${id} AND user.idopenid = ${openid}`;
      const billInfoByIdRequest = await ctx.app.mysql.query(billInfoByIdSql);
      console.log(billInfoByIdRequest, "............");
      if (billInfoByIdRequest.affectedRows === 1) {
        return await _.assign(
          {
            data: "删除数据成功",
          },
          SUCCESS
        );
      } else {
        return await _.assign(ERROR, {
          msg: "删除数据失败",
        });
      }
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  // put 通过id修改一个账单信息
  async putBillInfoById({
    id,
    deliveryMethod,
    categoryName,
    categoryIcon,
    tag,
    money,
  }) {
    const ctx = this.ctx;
    const { openid, session_key } = ctx.app.decode;
    try {
      //判断当前的用户是否是当前的人操作

      const userCurrentOpenidSql = `SELECT COUNT(openid) FROM user WHERE id = ${id} AND openid = ${openid}`;
      const billInfoByIdSql = `UPDATE bill SET \`bill_delivery_method\`='${deliveryMethod}', \`bill_category_name\`='${categoryName}', \`bill_category_icon\`='${categoryIcon}', \`bill_tag\`='${tag}', \`bill_money\` =${money} WHERE id = ${id}`;
      console.log(billInfoByIdSql);
      const userCurrentOpenidRequest = await ctx.app.mysql.query(
        userCurrentOpenidSql
      );
      if (userCurrentOpenidRequest !== 1) {
        return await _.assign(ERROR, {
          msg: "修改数据失败,请确认是本人操作",
        });
      }
      const billInfoByIdRequest = await ctx.app.mysql.query(billInfoByIdSql);
      if (billInfoByIdRequest.affectedRows === 1) {
        return await _.assign(
          {
            data: "修改数据成功",
          },
          SUCCESS
        );
      } else {
        return await _.assign(ERROR, {
          msg: "修改数据失败",
        });
      }
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
}
module.exports = ApiService;
