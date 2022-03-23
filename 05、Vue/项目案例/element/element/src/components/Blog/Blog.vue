<!-- blog想法 -->
<template>
  <div class="blog">
    <div id="main">
      <h1>包含大神博客以及github</h1>
      <el-button type="primary" @click="jumpRuan">阮一峰博客</el-button>
      <el-button type="success" @click="jumpLiao">廖雪峰博客</el-button>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
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
      ruan: "https://wangdoc.com",
      liao: "https://www.liaoxuefeng.com",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    jumpRuan() {
      window.location.href = this.ruan;
    },
    jumpLiao() {
      window.location.href = this.liao;
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
#main {
  /* min-width: 380px; */
  padding: 20px 34px;
  & > h1 {
    padding: 20px 0;
    font-weight: bolder;
  }
}
.el-button {
  margin: 10px 10px;
}
</style>
