<template>
  <div class="form_body">
    <div class="form_title">账号登录</div>
    <el-form
      :rules="loginRules"
      class="login_form"
      ref="loginForm"
      :model="loginForm"
      label-position="top"
    >
      <div class="form_main">
        <el-form-item label="手机号码" prop="phone">
          <el-input
            @keyup.enter.native="login"
            v-model="loginForm.phone"
            autocomplete="off"
            placeholder="请填写"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            @keyup.enter.native="login"
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
            placeholder="请填写"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="register_button" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <div class="forget_button">
            <el-button @click="goForgetPassword" type="text">忘记密码？</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div class="bottom_tip">
      没有账号？
      <span @click="goRegister">立即注册</span>
    </div>
  </div>
</template>

<script>
import { isvalidatePhone } from "@/utils/validate";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatePhone(value)[0]) {
        callback(new Error(isvalidatePhone(value)[1]));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        phone: "",
        password:''
      },
      loginRules: {
        phone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur",
          },
          {
            validator: validatePhone,
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
      },
    };
  },
  computed: {},
  methods: {
    goRegister() {
      this.$router.push("/login/register");
    },
    goForgetPassword() {
      this.$router.push("/login/password");
    },
    login(){
         this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("LoginByUsername", this.loginForm).then((r) => {
              this.$message.success('登陆成功')
             this.$router.push('/');
          });
        }
      });
    }
  },
  mounted() {},
  watch: {},
  filters: {},
};
</script>

<style scoped lang='scss'>
@import "@/styles/login_self.scss";
</style>
