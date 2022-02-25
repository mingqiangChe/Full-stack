<template>
  <div class="form_body">
    <div class="form_title">注册</div>
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
            @keyup.enter.native="handleRegister"
            v-model="loginForm.phone"
            autocomplete="off"
            placeholder="请填写"
          ></el-input>
        </el-form-item>
        <el-form-item label="输入密码" prop="password">
          <el-input
            @keyup.enter.native="handleRegister"
            v-model="loginForm.password"
            type="password"
            :show-password="true"
            autocomplete="off"
            placeholder="请填写"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleRegister" class="register_button">注册</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="bottom_tip">
      已有账号？
      <span @click="goLogin">立即登录</span>
    </div>
  </div>
</template>

<script>
import { isvalidatePhone, validatename } from "@/utils/validate";
import { register } from "@/api/login";
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
    const validateUserName = (rule, value, callback) => {
      if (!validatename(value)) {
        callback(new Error("请输入合法姓名"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        phone: "",
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
        businessName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur",
          },
          {
            validator: validateUserName,
          },
        ],
        keycode: [
          {
            required: true,
            message: "请输入邀请码",
            trigger: "blur",
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
    handleRegister() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          register(this.loginForm).then((r) => {
            if (r.data.errCode == 0) {
              this.$message.success("注册成功");
              setTimeout(() => {
                this.$router.push("/login");
              }, 1500);
            }
          });
        }
      });
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
