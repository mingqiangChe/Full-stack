<!-- 主页 -->
<template>
  <div>主页</div>
  <el-button @click="add">{{ bb }}</el-button>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, ref } from "vue"
export default defineComponent({
  name: "App",
  setup() {
    let bb = ref(1)
    console.log(bb.value)
    function add() {
      bb.value = bb.value + 1
    }
    return { bb, add }
  },
})
</script>
