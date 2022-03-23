<!-- 技术文档 -->
<template>
  <div class="file">
    <div class="ceng1">
      <h1>看文档</h1>
      <el-button type="primary" @click="jumpMdn">MDN</el-button>
      <el-button type="primary" @click="jumpAxios">axios</el-button>
    </div>
    <div class="ceng1">
      <h1>W3C</h1>
      <el-button type="primary" @click="jumpHtml">html</el-button>
      <el-button type="success" @click="jumpCs">css</el-button>
      <el-button type="info" @click="jumpMJs">javascript</el-button>
      <el-button type="error" @click="jumpJq">jquery</el-button>
      <el-button type="warning" @click="jumpSql">SQL</el-button>
    </div>
    <div class="ceng1">
      <h1>runoob菜鸟</h1>
      <el-button type="primary" @click="jumpLinux">linux</el-button>
      <!-- <el-button type="success" @click="jumpCs">css</el-button>
      <el-button type="info" @click="jumpMJs">javascript</el-button>
      <el-button type="error" @click="jumpJq">jquery</el-button>
      <el-button type="warning" @click="jumpSql">SQL</el-button> -->
    </div>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "File",
  components: { Footer },
  data() {
    //这里存放数据
    return {
      mdn: "https://developer.mozilla.org/zh-CN",
      jquery: "https://www.w3school.com.cn/jquery/index.asp",
      js: "https://www.w3school.com.cn/js/index.asp",
      htm: "https://www.w3school.com.cn/html/index.asp",
      cs: "https://www.w3school.com.cn/css/index.asp",
      sql: "https://www.w3school.com.cn/sql/index.asp",
      linux: "https://www.runoob.com/w3cnote/linux-common-command-2.html",
      axios: "http://www.axios-js.com/zh-cn",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    jumpMdn() {
      window.location.href = this.mdn;
    },
    jumpJq() {
      window.location.href = this.jquery;
    },
    jumpMJs() {
      window.location.href = this.js;
    },
    jumpHtml() {
      window.location.href = this.htm;
    },
    jumpCs() {
      window.location.href = this.cs;
    },
    jumpSql() {
      window.location.href = this.sql;
    },
    jumpLinux() {
      window.location.href = this.linux;
    },
    jumpAxios() {
      window.location.href = this.axios;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
@import "~element-ui/packages/theme-chalk/src/button.scss";
.file {
  /* width: 100vw; */
  /* min-width: 390px; */
  padding: 20px 34px;
  box-sizing: border-box;
  & > h1 {
    padding: 20px 0;
  }
}
.ceng1 {
  margin-top: 24px;
  & > h1 {
    font-size: 24px;
    padding: 20px 0;
    font-weight: bolder;
  }
}
.el-button {
  margin: 10px 10px;
}
</style>
