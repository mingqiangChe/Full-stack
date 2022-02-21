<template>
  <div class="form_body">
    <div class="form_title">找回密码</div>
    <el-form
      :rules="loginRules"
      class="login_form"
      ref="loginForm"
      :model="loginForm"
      label-position="top"
    >
      <div class="form_main">
        <el-form-item label="手机号" prop="phone">
          <el-input
            @keyup.enter.native="submit"
            v-model="loginForm.phone"
            autocomplete="off"
            placeholder="请填写"
          ></el-input>
        </el-form-item>
        <el-form-item label="输入原密码" prop="password">
          <el-input
           type="password"
            @keyup.enter.native="submit"
            v-model="loginForm.password"
            autocomplete="off"
            placeholder="请填写"
          ></el-input>
        </el-form-item>
        <el-form-item label="输入新密码" prop="password">
          <el-input
            @keyup.enter.native="submit"
            v-model="loginForm.newPassword"
            autocomplete="off"
            placeholder="请填写"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="register_button" @click="submit">提交</el-button>
        </el-form-item>
        <el-form-item>
          <div class="back_button">
            <el-button @click="goLogin" type="text">返回登录</el-button>
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
import {updatePassword} from '@/api/login'
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
    const validateCode = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error("请输入4位数的验证码"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        phone: "15893608147",
        newPassword: "",
        password: "",
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
        code: [{ required: true, trigger: "blur", validator: validateCode }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 25, message: "长度在 5 到 25个字符" },
          {
            pattern: /^(\w){5,25}$/,
            message: "只能输入5-25个字母、数字、下划线",
          },
        ],
      },
      sendFlag: false,
      msgTime: 60,
      msgText: "",
    };
  },
  computed: {},
  methods: {
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          updatePassword(this.loginForm).then((r) => {
            if(r.data.errCode==0){
                this.$message.success('修改密码成功')
                setTimeout(()=>{
                    this.$router.push('/login')
                },1500)
            }
          });
        }
      });
    },
    goRegister() {
      this.$router.push("/login/register");
    },
    goLogin() {
      this.$router.push("/login/index");
    },
    handleSend() {
      this.$refs.loginForm.validateField("phone", (errMsg) => {
        if (errMsg) {
          console.log("校验失败");
        } else {
          /* axios */
          this.sendFlag = true;
          this.msgText = this.msgTime + "秒";
          const time = setInterval(() => {
            this.msgTime--;
            this.msgText = this.msgTime + "秒";
            if (this.msgTime === 0) {
              this.msgTime = 60;
              this.msgText = "";
              this.sendFlag = false;
              clearInterval(time);
            }
          }, 1000);
        }
      });
    },
  },
  mounted() {},
  watch: {},
  filters: {},
};
</script>

<style scoped lang='scss'>
@import "@/styles/login_self.scss";
</style>
