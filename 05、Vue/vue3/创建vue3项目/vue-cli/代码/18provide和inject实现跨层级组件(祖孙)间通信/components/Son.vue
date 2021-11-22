<!--  -->
<template>
  <h2>son子级组件</h2>
  <hr>
  <GrandSon />
</template>

<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent } from "vue";
import GrandSon from "./GrandSon.vue";
export default defineComponent({
  name: "Son",
  components: { GrandSon },
  setup() {
    return {};
  },
});
</script>