<!--  -->
<template>
  <h2>CustonRef的使用</h2>
  <input type="text" v-model="keyword" />
  <p>
    {{ keyword }}
  </p>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { customRef, defineComponent, ref } from "vue";

// 自定义hook防抖的函数
// value传入的数据,将来数据的类型不确定,所以,用泛型,delay防抖的间隔时间.默认是20o毫秒
function useDebouncedRef<T>(value: T, delay = 200) {
  // 准备一个存储定时器的id的变量
  let timeOutId: number;
  return customRef((track, trigger) => {
    return {
      // 返回数据
      get() {
        // 告诉vue追踪数据
        track();
        return value;
      },
      // 设置数据的
      set(newValue: T) {
        // 清理定时器
        clearTimeout(timeOutId);
        // 开启定时器
        timeOutId = setTimeout(() => {
          value = newValue;
          // 告诉vue更 新界面
          trigger()
        }, delay);
      },
    };
  });
}
export default defineComponent({
  name: "App",
  setup() {
    // const keyword = ref('abc')
    const keyword = useDebouncedRef("abc", 500);
    return { keyword };
  },
});
</script>