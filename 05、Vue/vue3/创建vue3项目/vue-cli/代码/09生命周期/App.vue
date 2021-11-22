<!--  -->
<template>
  <h2>App父级组件</h2>
  <button @click="isShow = !isShow">切换显示</button>
  <Child v-if="isShow"></Child>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Child from "./components/Child.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  components: {
    Child,
  },
  setup() {
    const isShow = ref(true);
    return {
      isShow,
    };
  },
});
</script>