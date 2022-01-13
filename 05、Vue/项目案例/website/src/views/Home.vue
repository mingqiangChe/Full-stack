<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-11-16 16:21:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-18 21:52:06
-->
<template>
  <div class="home">
    <login v-show="this.$store.state.loginStatus"></login>
    <homeList></homeList>
    <rain></rain>
    <div class="fly">
      <fly></fly>
    </div>
  </div>
  </div>
</template>

<script>
// import Login from '../components/Login.vue'
const login = () => import('@/components/home/Login.vue')
const homeList = () => import('@/components/home/HomeList.vue')
const fly = () => import('@/components/plugInUnit/FlyBox.vue')
const rain = () => import('@/components/utils/Rain.vue')
export default {
  name: 'home',
  components: { login, homeList, fly, rain },
  data() {
    return {
      status: true
    }
  },
  methods: {},
  mounted() {
    console.log(this.$store.state.loginStatus)
  }
}
</script>
<style lang="less" scope>
.el-card__body {
  padding: 0px !important;
}
.home {
  margin: 0 auto;
  padding-top: 124px;
}
</style>