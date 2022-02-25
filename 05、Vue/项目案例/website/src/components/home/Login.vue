<!-- 登录界面 定时遮罩层 -->
<template>
  <div class='login' ref="loginDom">
    <ul class="bg-bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
    <div class="login-main">
      <div class="canvas">
        <!-- <div class="txt">
          用代码表达自我
        </div> -->
        <div class="text-magic" data-word="Express yourself in code">
          Express yourself in code
          <div class="white"></div>
        </div>

        <!-- <div class="canvasx">
          <canvas id="myCanvas" width="250" height="250">
          </canvas>
        </div> -->
        <!-- <div class="button txtt"  @click="openMark">
          start
        </div> -->
        <div class="butt" @click="openMark">
          <btn :title="title"></btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
const btn = () => import('@/components/utils/Button.vue')
let canvas
let ctx
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { btn },
  data() {
    //这里存放数据
    return {
      // imgSrc: 'https://thomasche-1306205594.cos.ap-shanghai.myqcloud.com/website/012A6601.jpg'
      title: 'start'
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    openMark() {
      this.$store.commit('changeLoginStatus')
    }
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
// 画布
.canvasx {
  width: 450px;
  margin: 0 auto;
}
#mycanvas {
  border: 1px solid rgb(199, 198, 198);
}
.login {
  width: 100%;
  height: 100%;
  // background-color: #87e3e6;
  background: linear-gradient(to bottom right, #000, #000);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  .login-main {
    width: 100%;
    min-width: 780px;
    padding-top: 300px;
    box-sizing: border-box;
    animation: icon 6s linear infinite;
    .txt {
      // margin: 50px auto;
      // font-size: 54px;
      // font-weight: bold;
      // text-align: center;
      // text-transform: uppercase;
      // color: transparent;
      // background: linear-gradient(45deg, #ffeb3b, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);
      // background-size: cover;
      // background-position: center center;
      // -webkit-background-clip: text;
      // animation: huerotate 3s infinite;
    }
    @keyframes huerotate {
      100% {
        filter: hue-rotate(360deg);
      }
    }
    .text-magic {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(2.4);
      width: 440px;
      font-size: 36px;
      font-family: Raleway, Verdana, Arial;
      color: #fff;
    }
    .white {
      position: absolute;
      left: -10px;
      width: 100%;
      height: 3px;
      background: #000;
      z-index: 4;
      animation: whiteMove 3s ease-out infinite;
    }

    .text-magic::before {
      content: attr(data-word);
      position: absolute;
      top: 0;
      left: 0.5px;
      height: 0px;
      color: rgba(255, 255, 255, 0.9);
      overflow: hidden;
      z-index: 2;
      animation: redShadow 1s ease-in infinite;
      filter: contrast(200%);
      text-shadow: 1px 0 0 red;
    }

    .text-magic::after {
      content: attr(data-word);
      position: absolute;
      top: 0;
      left: -2px;
      height: 36px;
      color: rgba(255, 255, 255, 0.8);
      overflow: hidden;
      z-index: 3;
      background: rgba(0, 0, 0, 0.9);
      animation: redHeight 1.5s ease-out infinite;
      filter: contrast(200%);
      text-shadow: -1px 0 0 cyan;
      mix-blend-mode: darken;
    }

    @keyframes redShadow {
      20% {
        height: 32px;
      }
      60% {
        height: 6px;
      }
      100% {
        height: 42px;
      }
    }

    @keyframes redHeight {
      20% {
        height: 42px;
      }
      35% {
        height: 12px;
      }
      50% {
        height: 40px;
      }
      60% {
        height: 20px;
      }
      70% {
        height: 34px;
      }
      80% {
        height: 22px;
      }
      100% {
        height: 0px;
      }
    }

    @keyframes whiteMove {
      8% {
        top: 38px;
      }
      14% {
        top: 8px;
      }
      20% {
        top: 42px;
      }
      32% {
        top: 2px;
      }
      99% {
        top: 30px;
      }
    }
    .button {
      font-size: 36px;
      font-weight: 400;
      color: white;
      padding: 4px 6px;
      box-sizing: border-box;
      text-align: center;
      border-radius: 74px;
      width: 172px;
      margin: 0 auto;
      margin-top: 200px;
      background-color: rgba(255, 255, 255, 0.3);
      cursor: pointer;
    }
    .butt {
      position: absolute;
      top: 186%;
      left: 50%;
      transform: translateX(-50%);
      // width: 500 px;
      // height: 200 px;
      // margin: 0 auto;
    }
  }
}
@keyframes icon {
  0% {
    // opacity: 1;
    transform: translate(0, 0);
  }
  50% {
    // opacity: 1;
    transform: translate(0px, 30px);
  }
  100% {
    // opacity: 1;
    transform: translate(0, 0);
  }
}
.bg-bubbles {
  position: absolute;
  // 使气泡背景充满整个屏幕；
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // 如果元素内容超出给定的宽度和高度，overflow 属性可以确定是否显示滚动条等行为；
  overflow: hidden;
  li {
    position: absolute;
    // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
    bottom: -160px;
    // 默认的气泡大小；
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    list-style: none;
    // 使用自定义动画使气泡渐现、上升和翻滚；
    animation: square 15s infinite;
    transition-timing-function: linear;
    // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      left: 20%;
      width: 90px;
      height: 90px;
      animation-delay: 2s;
      animation-duration: 7s;
    }
    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-duration: 8s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 120px;
      height: 120px;
      animation-delay: 3s;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(7) {
      left: 32%;
      width: 160px;
      height: 160px;
      animation-delay: 2s;
    }
    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
      animation-duration: 15s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 10px;
      height: 10px;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(10) {
      left: 85%;
      width: 160px;
      height: 160px;
      animation-delay: 5s;
    }
  }
  // 自定义 square 动画；
  @keyframes square {
    0% {
      opacity: 0.5;
      transform: translateY(0px) rotate(45deg);
    }
    25% {
      opacity: 0.75;
      transform: translateY(-400px) rotate(90deg);
    }
    50% {
      opacity: 1;
      transform: translateY(-600px) rotate(135deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-1000px) rotate(180deg);
    }
  }
}
</style>