<!--  -->
<template>
  <h2 :style="{ color }">GrandSon孙子级组件</h2>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, inject } from "vue";
export default defineComponent({
  name: "GrandSon",
  setup() {
    //   注入操作
    const color = inject("color");
    return {
      color,
    };
  },
});
</script>