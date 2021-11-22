<template>
  <div>哈哈</div>
  <!-- <h1>{{ number }}</h1> -->
</template>

<script lang="ts">
// 这里可以使用ts代码

// defineComponent函数 目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent } from "vue";

// 暴漏出去一个定义好的组件
export default defineComponent({
  // 当前组件名App
  name: "App",
  // 测试代码setup是组合API中第一个要使用的函数
  // setup() {
  //   const number = 10;
  //   return {
  //     number,
  //   };
  // },
});
</script>

<style>
</style>
