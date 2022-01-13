<!--  -->
<template>
  <module-button></module-button>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ModuleButton from './ModuleButton.vue'
import { defineComponent } from "vue";
export default defineComponent({
  name: "pp",
  components:{
    ModuleButton
  },
  setup() {
    return {};
  },
});
</script>