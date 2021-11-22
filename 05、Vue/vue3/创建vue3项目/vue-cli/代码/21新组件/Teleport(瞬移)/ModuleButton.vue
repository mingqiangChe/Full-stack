<!--让组件的 html 在父组件界面外的特定标签(很可能是 body)下插入显示  -->
<template>
  <button @click="moduleOpen = true">打开对话窗</button>

  <!-- 对话窗代码 -->
  <Teleport to="body">
    <div v-if="moduleOpen">
      <div>对话窗</div>
      <button @click="moduleOpen = false">关闭对话窗</button>
    </div>
  </Teleport>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ModuleButton",
  setup() {
    // 控制对话窗显示隐藏
    const moduleOpen = ref(false);
    return {
      moduleOpen,
    };
  },
});
</script>

