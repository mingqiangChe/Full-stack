<!-- 项目存放 -->
<template>
  <div class="project">
    <h1>项目存放</h1>
    <el-row :gutter="12">
      <div @click="jumpRbac">
        <el-col :span="8">
          <el-card shadow="hover"> VUE RBAC </el-card>
          <p>简介：基于角色权限操作页面级按钮级操作</p>
        </el-col>
      </div>
      <div @click="jumpVue2Moban">
        <el-col :span="8">
          <el-card shadow="hover"> vue2 搭建0-1 </el-card>
          <p>简介：基于webpack 4.0搭建粗略spa单页面框架</p>
        </el-col>
      </div>
      <div @click="jumpEcharts">
        <el-col :span="8">
          <el-card shadow="hover"> echarts </el-card>
          <p>
            简介：自己做的一款自适应echarts展示，配合koa以及websocket实现数据展示和实时通讯改变功能
          </p>
        </el-col>
      </div>
      <el-col :span="8">
        <el-card shadow="hover"> xx </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover"> xx </el-card>
      </el-col>
    </el-row>
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
  components: { Footer },
  data() {
    //这里存放数据
    return {
      currentDate: new Date(),
      rbac: "https://github.com/mingqiangChe/VueRBAC",
      echart: "https://github.com/mingqiangChe/echarts-model",
      vue2Moban: "https://github.com/mingqiangChe/my-vue2-template",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    jumpRbac() {
      console.log("1");
      window.location.href = this.rbac;
    },
    jumpEcharts() {
      window.location.href = this.echart;
    },
    jumpVue2Moban() {
      window.location.href = this.vue2Moban;
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
.project {
  padding: 20px 34px;
  box-sizing: border-box;
  & > h1 {
    font-weight: bolder;
    padding-bottom: 36px;
  }
}
.el-button {
  margin: 10px 10px;
}
.el-card {
  text-align: center;
}

.el-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.el-col {
  width: 132px;
  padding: 20px 0;
  & > p {
    box-sizing: border-box;
    padding-top: 10px;
  }
}
.el-card:hover {
  color: red;
  cursor: pointer;
}
</style>
