<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{ count }}</span> / 全部{{ todos.length }}
    </span>
    <button class="btn btn-danger" @click="delAll">清除已完成的任务</button>
  </div>
</template>
<script lang='ts'>
import { Todo } from "../types/todo";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "Footer",
  props: {
    // 接收todos数据
    todos: {
      type: Array as () => Todo[],
      required: true,
    },
    checkAll: {
      type: Function,
      required: true,
    },
    clear: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    // 已完成数 使用计算属性
    const count = computed(() => {
      // pre累加器
      return props.todos?.reduce(
        (pre, todo) => pre + (todo.isCompleted ? 1 : 0),
        0
      );
    });
    // 全选全不选计算属性操作
    const isCheckAll = computed({
      // 已完成大于0 并且全部等于已完成
      get() {
        return count.value > 0 && props.todos.length === count.value;
      },
      set(val) {
        // 需要回到app组件  val随着点击true false切换
        props.checkAll(val);
      },
    });
    // 清除所有选中数据
    const delAll = () => {
      if (window.confirm("是否清除已完成的任务")) {
        props.clear();
      }
    };
    return {
      count,
      isCheckAll,
      delAll,
    };
  },
});
</script>
<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}
.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}
.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
