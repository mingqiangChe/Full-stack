<!--  -->
<template>
  <h2>child子级组件</h2>
  <h3>age:{{ age }}</h3>
  <h3>length:{{ length }}</h3>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { computed, defineComponent,Ref, toRef } from "vue";
function useGetLength(age:Ref){
return computed(()=>{
    return age.value.toString().length
})
}
export default defineComponent({
  name: "Child",
  props: { age:{
      type:Number,
      required:true  //必须的
  } },
  setup(props) {
      const length =useGetLength(toRef(props,'age'))
    return {
        length
    };
  },
});
</script>