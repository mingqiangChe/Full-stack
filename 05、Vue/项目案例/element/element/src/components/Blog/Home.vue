<!-- home个人简介 -->
<template>
  <div class="home">
    <h1>车明强</h1>
    <p>
      大家好，我是一名喜欢敲代码的前端程序猿。目标：我想成为别人羡慕的那个人
    </p>
    <p>
      代码无所不能，成为我的热情所在。你可以在这里找到我的技术文档以及项目列表。我准备在这个网站上做各种技术上的尝试。
    </p>
    <p>
      在编程之外，我喜欢足球和旅行。如果有人同在一所城市，也许可以一起出去旅游拍照。
    </p>
    <p>
      目前的话，仅可以在
      <i @click="jump">github</i>
      上寻找到我。
    </p>
    <p>有兴趣的话，交个朋友。可以给我发邮件 cmq15650272396@163.com。</p>
    <p></p>

    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//  import {getListAPI,postFormAPI, putSomeAPI, deleteListAPI} from '@/api/classification'

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Home",
  components: { Footer },
  data() {
    //这里存放数据
    return {
      // componentId:'Home'
      github: "https://github.com/mingqiangChe?tab=repositories",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // open(data){
    // this.componentId=data;
    // },
    //   promise调用，链式调用， getList()括号内只接受参数；
    //  get不传参
    // getList() {
    //   getListAPI().then(res => console.log(res)).catch(err => console.log(err))
    // },
    //post传参
    // postForm(formData) {
    //   let data = formData
    //   postFormAPI(data).then(res => console.log(res)).catch(err => console.log(err))
    // },
    //async await同步调用
    // async postForm(formData) {
    //   const postRes = await postFormAPI(formData)
    //   const putRes = await putSomeAPI({data: 'putTest'})
    //   const deleteRes = await deleteListAPI(formData.name)
    //   // 数据处理
    //   console.log(postRes);
    //   console.log(putRes);
    //   console.log(deleteRes);
    // },
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
.home {
  box-sizing: border-box;
  padding: 104px 50px 10px;
  font-family: "Times New Roman", Times, serif;
  & > h1 {
    color: black;
    font-size: 32px;
    min-width: 218px;
    padding-bottom: 16px;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: bolder;
  }
  & > p {
    font-size: 16px;
    padding: 16px 0;
    min-width: 218px;
  }
  & > p > i {
    cursor: pointer;
  }
}
</style>
