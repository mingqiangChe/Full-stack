<!-- header -->
<template>
  <div class="header">
    <div class="header-left" @click="open('Home')"></div>
    <div class="header-right">
      <div class="headers1" @click="open('Blog')">博客</div>
      <div class="headers3" @click="open('Project')">项目</div>
      <div class="headers4" @click="open('ToolWebsite')">工具</div>
      <div class="headers4" @click="open('File')">文档</div>
      <div class="headers4" @click="open('Community')">社区</div>
      <!-- <div class="headers5" @click="open('')">
        待续
      </div> -->
      <div class="headers2" @click="jump"></div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      github: "https://github.com/mingqiangChe?tab=repositories",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    open(data) {
      this.$emit("open", data);
    },
    jump() {
      window.location.href = this.github;
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
.header {
  /* width: 100vw; */
  min-width: 390px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 24px 36px;
  /* opacity: 0.8; */
  background-color: antiquewhite;
}
.header-left {
  cursor: pointer;
  width: 38px;
  height: 38px;
  background: url(../../assets/header/footerball.png) no-repeat center;
}
.header-right {
  display: flex;
  justify-content: space-between;
}
.header-right > div {
  height: 36px;
  padding: 0 16px;
  color: black;
  font-size: 16px;
  cursor: pointer;
  /* background-color: red; */
}
.headers2 {
  padding-top: 10px;
  background: url(../../assets/header/github.png) no-repeat center top;
}
</style>
