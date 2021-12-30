'use strict';
// const { app } = require('egg-mock/bootstrap');
// describe('rightsun test', () => {
//   it('GET /rightSun print', async () => {
//     await app
//       .httpRequest()
//       .get('/rightSun')
//       .expect(200)
//       .expect('<h1>hello rightSun!!!</h1>');
//   });
//   it('GET /getGirls test', async () => {
//     await app
//       .httpRequest()
//       .get('/getGirls')
//       .expect(200)
//       .expect('<h1>杨幂，正向你走来</h1>');
//   });
// });

const params = [
  {
    user_defined_key: 'clock_frequency,reminder_time,sign/oBSYU0e306sOf5vlK0LKRIQ_fr30,total_accounting_days,total_number_entries',
    user_defined_value: '0,10:49:00,这家伙很懒，什么都没留下~,0,0',
    create_user_id: 100007,
    describe: '已连续打卡次数,提醒时间,个性签名,总记账天数,总记账笔数',
  },
];
function name(params) {
  const arr = [];
  const keys = '';
  console.log(params[0].user_defined_key.split(',').length);
  for (let i = 0; i < params[0].user_defined_key.split(',').length - 1; i++) {
    for (const [ key, value ] of Object.entries(params[0])) {
      if (value.toString().split(',').length > 1) {
        keys.cancat(`{${key}:${value.split(',')[i]}},`);
      }
    }
    arr.push(keys);
  }
  return arr;
  // params = Object.keys(params[0]);
  // console.log(params, 'params');
}
const a = name(params);
console.log(a);
