<!-- 按钮特效组件 -->
<template>
  <div class="bttn">
    <div class="utils_btn utils_btn2">{{title}}</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'btn',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {}
  },
  props: ['title'],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
<style lang='less'>
:root {
  --color: #0ebeff;
}

@keyframes rotate {
  100% {
    transform: translate(-50%, -50%) rotate(1turn);
  }
}

.utils_btn {
  position: relative;
  z-index: 0;
  width: 160px;
  height: 80px;
  line-height: 80px;
  color: var(--color);
  font-size: 24px;
  border-radius: 10px;
  text-align: center;
  margin: auto;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  // -webkit-box-reflect: below 10px linear-gradient(transparent, rgba(0, 0, 0, 0.4));
}

.utils_btn:hover {
  color: #fff;
  box-shadow: 0 0 5px var(--color), 0 0 25px var(--color);
}

.utils_btn::after,
.utils_btn::before {
  transition: 0.3s;
  background: var(--color);
}

.utils_btn::before {
  content: '';
  position: absolute;
  z-index: -2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 300%;
  background-color: #000;
  background-repeat: no-repeat;
  background-size: 50% 50%;
  background-position: 0 0;
  background-image: conic-gradient(var(--color), var(--color));
  animation: rotate 2s linear infinite;
}

.utils_btn::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 2px;
  top: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background: #000;
  border-radius: 10px;
}

.utils_btn2 {
  filter: hue-rotate(270deg);
}
</style>