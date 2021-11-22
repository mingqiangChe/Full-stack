<!--App父级组件  -->
<template>
  <h1>父级组件</h1>
  <h3>msg:{{ msg }}</h3>
  <button @click="msg += '=='">更新数据</button>
  <child :msg="msg" msg2="真心" @xxx="xxx"></child>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, ref } from "vue";
import Child from "./components/Child.vue";
export default defineComponent({
  name: "App",
  components: {
    Child,
  },

  setup() {
    function xxx(txt:string) {
      msg.value += txt;
    }
    const msg = ref("what are you doing");
    return {
      msg,
      xxx
    };
  },
});
</script>