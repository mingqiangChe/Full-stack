<template>
  <div class="login_container">
    <img class="left_people animated bounceInDown" src="/img/bg/people.png" alt />
    <div class="login_box">
      <img class="smile_img animated rotateIn" src="/img/bg/big_smile.png" alt />
      <div class="form_box">
        <keep-alive>
          <router-view  v-if="$route.meta.$keepAlive||$route.meta.keepAlive" />
        </keep-alive>
        <router-view  v-if="!($route.meta.$keepAlive||$route.meta.keepAlive) " />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      loginRules: {},
      loginForm: {},
    };
  },
  computed: {},
  methods: {
    handleLogin() {},
  },
  mounted() {},
  watch: {},
  filters: {},
};
</script>

<style scoped lang='scss'>
.login_container {
  font-size: 16px;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: url("/img/bg/login_bg.png");
  background-size: 100% 100%;
  position: relative;
  .left_people {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 27rem;
    z-index: 19;
  }
  .login_box {
    position: absolute;
    left: 24rem;
    top: 50%;
    z-index: 18;
    // margin-top:-28rem;
    transform: translateY(-50%);
    width: 86.75rem;
    height: 56rem;
    padding: 1rem;
    min-height: 800px;
    background: url("/img/bg/login_box_bg.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    .smile_img {
      position: absolute;
      bottom: 2.7rem;
      right: 14.25rem;
      width: 10.69rem;
    }
    .form_box {
      height: 100%;
      box-sizing: border-box;
      margin-left: 12.25rem;
      padding: 4rem 0 2.6rem;
    }
  }
}
@media screen and (max-width: 979px) {
  .login_container {
    background-image: none;
    .left_people {
      display: none;
    }
    .login_box {
      width: 100vw !important;
      height: 100vh !important;
      overflow-y: auto;
      left: 0;
      min-height: 100vh;
      padding: 10px;
      z-index: 999;
      background-color: #fff;
      .smile_img {
        display: none;
      }
      .form_box {
        height: 100%;
        margin-left: 0;
        padding: 15px 10px;
      }
    }
  }
}
</style>