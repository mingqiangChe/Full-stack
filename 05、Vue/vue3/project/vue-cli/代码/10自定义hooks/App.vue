<!--  -->
<template>
  <h2>自定义hook函数</h2>
  <h3>x:{{ x }},y:{{ y }}</h3>
  <!-- <h3 v-if="loading">正在加载中...</h3>
  <h3 v-else-if="errorMsg">错误信息:{{ errorMsg }}</h3> -->
  <!-- <ul>
    <li>id:{{ data.id }}</li>
    <li>addresss:{{ data.address }}</li>
    <li>distance:{{ data.distance }}</li>
  </ul> -->
  <!-- 数组数据 -->
  <!-- <ul v-for="item in data" :key="item.id">
    <li>id:{{ item.id }}</li>
    <li>title:{{ item.title }}</li>
    <li>price:{{ item.price }}</li>
  </ul> -->
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, watch } from "vue";
import useMousePodition from "./hooks/useMousePosition";
// import useRequest from "./hooks/useRequest";

// 定义接口，约束对象的类型
// interface AddressData {
//   id: number;
//   address: string;
//   distance: string;
// }
// interface ProductsData {
//   id: string;
//   title: string;
//   price: number;
// }
export default defineComponent({
  name: "App",
  // 需求1.用户在页面中点击页面，把点击的位置的横坐标收集起来并展示出来

  setup() {
    // 发送请求
    // const { loading, data, errorMsg } =useRequest<AddressData>("/data/address.json");
    // const { loading, data, errorMsg } = useRequest<ProductsData[]>("/data/products.json");
    const { x, y } = useMousePodition();

    // 监视
    // watch(data, () => {
    //   if (data.value) {
    //     console.log(data.value.length);
    //   }
    // });
    return {
      x,
      y,
      // loading,
      // data,
      // errorMsg,
    };
  },
});
</script>