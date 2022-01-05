<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="2"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="imgCode">
        <span class="svg-container">
          <i class="el-icon-info" style="font-size:18px;"/>
        </span>
        <el-input
          ref="imgCode"
          v-model="loginForm.imagesCode"
          placeholder="ImagesCode"
          name="imgCode"
          type="text"
          tabindex="2"
          maxlength="4"
        />
        <div class="imgCodeBox" v-html="imgUrl" @click="clickImgCode"></div>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 25%; margin-bottom: 30px; margin-left: 37.5%"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <!-- <div class="tips">
        <span style="margin-right: 20px">username: Hqtcszadmin</span>
        <span> password: Hqtcsz888.com</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { Message } from "element-ui";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value || value.length < 0) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      console.log(value);
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    const validateImgCode = (rule, value, callback) => {
      console.log(value);
      if (!this.loginForm.imagesCode || this.loginForm.imagesCode.length < 4) {
        callback(new Error("验证码不能少于4位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        imagesCode: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        imgCode: [
          { required: true, trigger: "blur", validator: validateImgCode },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      imgUrl: "",
    };
  },
  mounted() {
    this.clickImgCode();
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    /**
     * @description: 表单校验及登录处理
     * @param {*}
     * @return {*}
     */
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.loading = true;
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((res) => {
              console.log(res);
              this.$store.dispatch("user/getInfo").then((res) => {
                console.log(res);
                Message({
                  message: "登录成功",
                  type: "success",
                  duration: 2000,
                });
                this.$router.push({ path: this.redirect || "/" });
                this.loading = false;
                loading.close();
              });
            })
            .catch((error) => {
              this.loading = false;
              this.loginForm.imagesCode = "";
              this.clickImgCode();
              loading.close();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    /**
     * @description: 图形验证码请求
     * @param {*}
     * @return {*}
     */
    clickImgCode() {
      this.$store.dispatch("user/getImgVerify").then((res) => {
        console.log(res);
        this.imgUrl = res.imgUrl;
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #889aa4;
$cursor: #889aa4;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background: url(https://hqtcsz-oss.oss-cn-shenzhen.aliyuncs.com/hqtcsz_pc/seviceport.jpg)
    no-repeat center center;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px $bg inset !important;
        // -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.8);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    line-height: 0 !important;
    background: #fff;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px;
    margin: 0 auto;
    overflow: hidden;
    // background: #fff;
    // padding-top: 0;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    // position: absolute;
    margin-left: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .imgCodeBox {
    width: 100px;
    height: 47px;
    background: #283443;
    border: 1px solid #283443;
    box-sizing: border-box;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
