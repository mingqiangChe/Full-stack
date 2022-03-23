<!-- 工具网站 -->
<template>
  <div class="main">
    <div class="ceng1">
      <h1>技术栈</h1>
      <div class="btn">
        <el-button type="primary" @click="jumpVue">vue</el-button>
        <el-button type="success" @click="jumpReact">react</el-button>
        <el-button type="info" @click="jumpAngular">angular</el-button>
        <el-button type="warning" @click="jumpAngular">小程序</el-button>
        <el-button type="danger" @click="jumpUni">uniapp</el-button>
      </div>
    </div>
    <div class="ceng1">
      <h1>翻译工具</h1>
      <el-button type="primary" @click="jumpFanyi">百度翻译</el-button>
    </div>
    <div class="ceng1">
      <h1>算法数据结构</h1>
      <el-button type="primary" @click="jumpLeecode">leecode</el-button>
    </div>
    <div class="ceng1">
      <h1>框架工具</h1>
      <el-button type="primary" @click="jumpElement">Element</el-button>
      <el-button type="success" @click="jumpVant">vant</el-button>
    </div>
    <div class="ceng1">
      <h1>自动化构建工具</h1>
      <el-button type="primary" @click="jumpWebpack">webpack</el-button>
      <el-button type="success" @click="jumpVite">vite</el-button>
      <el-button type="danger" @click="jumpNuxt">nuxt</el-button>
      <el-button type="info" @click="jumpGrunt">grunt</el-button>
      <el-button type="default" @click="jumpGulp">gulp</el-button>
    </div>
    <div class="ceng1">
      <h1>依赖工具</h1>
      <el-button type="primary" @click="jumpNpm">npm</el-button>
      <el-button type="success" @click="jumpNode">node</el-button>
      <el-button type="info" @click="jumpBabel">babel</el-button>
    </div>
    <div class="ceng1">
      <h1>代码管理</h1>
      <el-button type="primary" @click="jumpGit">git</el-button>
    </div>
    <div class="ceng1">
      <h1>项目工具</h1>
      <el-button type="primary" @click="jumpVivify">vivify</el-button>
      <el-button type="success" @click="jumpYin">印象中文</el-button>
      <el-button type="info" @click="jumpDate">jsDate日期控件</el-button>
    </div>

    <div class="ceng1">
      <h1>标签兼容性</h1>
      <el-button type="primary" @click="jumpCan">can i use</el-button>
    </div>

    <div class="ceng1">
      <h1>项目上线</h1>
      <el-button type="primary" @click="jumpGzip">熊猫压缩</el-button>
      <el-button type="success" @click="jumpAlibaba">阿里云服务器</el-button>
      <el-button type="info" @click="jumpTxyun">阿里云服务器</el-button>
    </div>
    <div class="ceng1">
      <h1>资源工具</h1>
      <el-button type="primary" @click="jumpItsource">IT资源网</el-button>
      <el-button type="success" @click="jumpAliIcon"
        >阿里巴巴矢量图标</el-button
      >
    </div>
    <div class="ceng1">
      <h1>休闲工具</h1>
      <el-button type="primary" @click="jumpGame">童年手柄游戏</el-button>
      <!-- <el-button type="success" @click="jumpVant">vant</el-button> -->
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
  components: { Footer },
  data() {
    //这里存放数据
    return {
      vue: "https://cn.vuejs.org/index.html",
      react: "https://react.docschina.org",
      angular: "https://angular.cn",
      webpack: "https://webpack.docschina.org",
      vite: "https://vitejs.cn",
      tiny: "https://tinypng.com",
      alibaba: "https://www.aliyun.com",
      txyun: "https://cloud.tencent.com",
      can: "https://caniuse.com",
      element: "https://element.eleme.io",
      vant: "https://vant-contrib.gitee.io/vant/#/zh-CN/home",
      npm: "https://www.npmjs.com",
      node: "https://nodejs.org/zh-cn",
      git: "https://git-scm.com",
      itSource: "https://www.itresource.org",
      game: "https://www.yikm.net",
      aliIcon: "https://www.iconfont.cn",
      babel: "https://www.babeljs.cn",
      leecode: "https://leetcode-cn.com",
      fanyi: "https://fanyi.baidu.com/?aldtype=16047",
      wechat: "https://developers.weixin.qq.com/miniprogram/dev/framework",
      vivify: "http://vivify.mkcreative.cz",
      yin: "https://docschina.org",
      date: "http://jemui.com/uidoc/jedate.html",
      uniapp: "https://uniapp.dcloud.io",
      nuxt: "https://www.nuxtjs.cn",
      grunt: "https://www.gruntjs.net",
      gulp: "https://www.gulpjs.com.cn",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    jumpVue() {
      window.location.href = this.vue;
    },
    jumpReact() {
      window.location.href = this.react;
    },
    jumpAngular() {
      window.location.href = this.angular;
    },
    jumpWebpack() {
      window.location.href = this.webpack;
    },
    jumpVite() {
      window.location.href = this.vite;
    },
    jumpGzip() {
      window.location.href = this.tiny;
    },
    jumpAlibaba() {
      window.location.href = this.alibaba;
    },
    jumpTxyun() {
      window.location.href = this.txyun;
    },
    jumpCan() {
      window.location.href = this.can;
    },
    jumpElement() {
      window.location.href = this.element;
    },
    jumpVant() {
      window.location.href = this.vant;
    },
    jumpNpm() {
      window.location.href = this.npm;
    },
    jumpNode() {
      window.location.href = this.node;
    },
    jumpGit() {
      window.location.href = this.git;
    },
    jumpItsource() {
      window.location.href = this.itSource;
    },
    jumpGame() {
      window.location.href = this.game;
    },
    jumpAliIcon() {
      window.location.href = this.aliIcon;
    },
    jumpBabel() {
      window.location.href = this.babel;
    },
    jumpLeecode() {
      window.location.href = this.leecode;
    },
    jumpFanyi() {
      window.location.href = this.fanyi;
    },
    jumpAngular() {
      window.location.href = this.wechat;
    },
    jumpVivify() {
      window.location.href = this.vivify;
    },
    jumpYin() {
      window.location.href = this.yin;
    },
    jumpDate() {
      window.location.href = this.date;
    },
    jumpUni() {
      window.location.href = this.uniapp;
    },
    jumpNuxt() {
      window.location.href = this.nuxt;
    },
    jumpGrunt() {
      window.location.href = this.grunt;
    },
    jumpGulp() {
      window.location.href = this.gulp;
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
/* @import '~element-ui/packages/theme-chalk/src/base.scss'; */
@import "~element-ui/packages/theme-chalk/src/button.scss";
.main {
  padding: 20px 34px;
  box-sizing: border-box;
}
.ceng1 {
  /* padding-top: 24px; */
  /* display: flex; */
  & > h1 {
    font-size: 24px;
    padding: 20px 0;
    font-weight: bolder;
  }
  & > .btn {
    /* min-width: 360px; */
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
.el-button {
  margin: 10px 10px;
}
</style>
