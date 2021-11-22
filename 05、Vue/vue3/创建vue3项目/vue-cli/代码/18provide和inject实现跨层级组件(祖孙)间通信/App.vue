<!-- 
provide和inject实现跨层级组件(祖孙)间通信
 -->
<template>
  <h2>provide 与 inject</h2>
  <p>当前颜色：{{ color }}</p>
  <button @click="color = 'red'">红色</button>
  <button @click="color = 'yellow'">黄色</button>
  <button @click="color = 'green'">绿色</button>
  <hr>
  <Son />
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Son from "./components/Son.vue";
import { defineComponent, provide, ref } from "vue";
export default defineComponent({
  name: "App",
  components: { Son },
  setup() {
    // 响应式数据
    const color = ref("red");
    // 提供数据
    provide('color',color)
    return { color };
  },
});
</script>