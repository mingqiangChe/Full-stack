/* eslint-disable vue/no-mutating-props */
<template>
  <!-- 高亮显示 🍑 鼠标事件-->
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: myColor }"
  >
    <label>
      <!-- 是否被选中 -->
      <input type="checkbox" v-model="isComplete" />
      <!-- 进行展示数据 -->
      <span>&nbsp;{{ todo.title }}</span>
    </label>
    <!-- 删除按钮展示 -->
    <button class="btn btn-danger" v-if="isShow" @click="del">删除</button>
  </li>
</template>
<script lang='ts'>
import { computed, defineComponent, ref } from "vue";
// 引入类型约束🍌
import { Todo } from "../types/todo";
export default defineComponent({
  name: "Item",
  props: {
    // 接收list数据
    todo: {
      type: Object as () => Todo, //函数返回todo类型🍌
      required: true,
    },
    // 删除方法接收
    delTodo: {
      type: Function,
      required: true,
    },
    // list组件点击获取到的索引
    index: {
      type: Number,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },
  // 调用方法必须传入props才能使用
  setup(props) {
    // 设置默认字体与背景色🍑  ref类型别懵逼
    const bgColor = ref("white"); // 背景色
    const myColor = ref("black"); // 字体颜色
    const isShow = ref(false); // 按钮默认不显示
    // 鼠标进入和离开回调函数  flag为传过来的true false🍑
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        bgColor.value = "pink";
        myColor.value = "green";
        isShow.value = true;
      } else {
        bgColor.value = "white";
        myColor.value = "black";
        isShow.value = false;
      }
    };
    // 删除事件
    const del = () => {
      if (window.confirm("是否输出该任务")) {
        // 调用传过来的删除数据方法⭐⭐⭐传入下标
        props.delTodo?.(props.index);
      }
    };
    // 利用计算属性的方式 来让当前的复选框选中/不选中 🍒🍒🍒  对象可读可写
    const isComplete = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val: boolean) {
        // 写入操作 调用更新数据方法修改数据状态 (传入数据 以及iscompleted状态)
        props.updateTodo?.(props.todo, val);
      },
    });
    return {
      bgColor,
      myColor,
      isShow,
      mouseHandler,
      del,
      isComplete,
    };
  },
});
</script>
<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  margin-top: 3px;
}
li::before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
</style>
