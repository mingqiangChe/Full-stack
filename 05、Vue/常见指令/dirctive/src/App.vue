<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button v-copy="copyText">复制</button>
    <button v-longpress="longpress">长按</button>
    <button v-debounce="debounceClick">防抖</button>
    <input type="text" v-model="note" v-emoji />
    <input type="text" v-model="speake" />
    <img v-LazyLoad="imgLoad" />
    <img v-LazyLoad="imgLoad" />
    <img v-LazyLoad="imgLoad" />
    <img v-LazyLoad="imgLoad" />
    <img v-LazyLoad="imgLoad" />
    <img v-LazyLoad="imgLoad" />
    <img v-LazyLoad="imgLoad" />
    <img v-LazyLoad="imgLoad" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      copyText: "复制内容",
      speake: "验证复制内容指令",
      note: "禁止输入表情特殊字符限制",
      imgLoad: "https://apikey.net/?type=Mimg",
    };
  },
  methods: {
    longpress() {
      alert("长按指令生效");
    },
    debounceClick() {
      console.log("监听回车键只触发一次");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  width: 200px;
  height: 400px;
}
</style>
