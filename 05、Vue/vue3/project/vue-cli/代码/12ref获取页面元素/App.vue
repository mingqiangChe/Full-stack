<!--  -->
<template>
  <h2>ref另一个作用：获取页面中的元素</h2>
  <input type="text" ref="inputRef" />
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    // 需求:当页面加载完毕后,页面中的文本框可以直接获取焦点(自动获取焦点)

    // 默认是空的,页面加载完毕,说明组件已经存在了,获取文本框元素
    const inputRef = ref<HTMLElement | null>(null);

    // 页面加载后的生命周期组合Api
    onMounted(() => {
      inputRef.value && inputRef.value.focus(); //自动获取焦点
    });
    return {
      inputRef,
    };
  },
});
</script>