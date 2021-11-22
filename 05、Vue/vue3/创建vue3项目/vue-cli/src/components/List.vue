<template>
  <ul class="todo-main">
    <!-- 将todos数据 删除方法传给item组件   index索引传过去进行删除 -->
    <Item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :todo="todo"
      :delTodo="delTodo"
      :index="index"
      :updateTodo="updateTodo"
    />
  </ul>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import Item from "./Item.vue";
export default defineComponent({
  name: "List",
  components: {
    Item,
  },
  // ⭐接收子组件item数据   🍌接收删除数据方法   更新数据状态
  props: ["todos", "delTodo", "updateTodo"],
});
</script>
<style scoped>
.todo-main {
  margin-left: 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0;
}
.todo-empty {
  height: 40px;
  line-height: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
