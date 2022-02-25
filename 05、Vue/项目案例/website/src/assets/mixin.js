/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2021-12-03 20:18:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-12-03 20:19:24
 */
export const myMixin = {
  data() {
    return {
      num: 1
    }
  },
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log('hello from mixin')
    }
  },
}
