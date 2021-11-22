<!--  -->
<template>
  <h2>Child子组件</h2>
  <h3>{{ msg }}</h3>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
export default defineComponent({
  name: "App",
  setup() {
    console.log("3.0中的setup");
    const msg = ref("fdsgbj");
    onBeforeMount(() => {
      console.log("3.0中的onBeforeMount");
    });
    onMounted(() => {
      console.log("3.0中的onMounted");
    });
    onBeforeUpdate(() => {
      console.log("3.0中的onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("3.0中的onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("3.0中的onBeforeUnmount");
    });
    onUnmounted(() => {
      console.log("3.0中的onUnmounted");
      console.log("⭐⭐⭐在这里发送请求即可");
    });
    return {
      msg,
    };
  },
});
</script>