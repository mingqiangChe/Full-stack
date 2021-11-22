<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- 将添加数据方法传过去🥝 -->
      <Header :addTodo="addTodo" />
      <!-- 将todos数据传list组件中🍒   删除数据方法🍌-->
      <List :todos="todos" :delTodo="delTodo" :updateTodo="updateTodo" />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clear="clearAllCompletedTodos"
      />
    </div>
  </div>
  <hr />
  <add-project />
</template>
<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
// 引入组件
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import AddProject from "./components/AddProject.vue";
// 🍒类型约束
import { Todo } from "./types/todo";
// 保存缓存 读取缓存
import { saveArray, readArray } from "./utils/localStorageUtils";
export default defineComponent({
  name: "App",
  // 注册组件
  components: {
    Header,
    List,
    Footer,
    AddProject,
  },
  setup() {
    // ⭐⭐⭐仿数据格式   isCompleted选中状态
    // 定义一个接口约束state数据类型  防止重复调用放在types封装起来🍒
    // interface Todo {
    //   id: number;
    //   title: string;
    //   isCompleted: boolean;
    // }
    // const state = reactive<{todos: Todo[]}>({
    //   todos: [
    //     {id:1,title: '记单词',isCompleted: false},
    //     {id:2,title: '编程',isCompleted: true}
    //   ]
    // })
    // 🍒
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });
    const key = "todos_key";
    // 界面加载完毕后过一会后再读取数据
    onMounted(() => {
      setTimeout(() => {
        state.todos = readArray(key);
      }, 1000);
    });
    // 添加数组的方法，放在数组头部🥝
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    }; 
     // 删除数据🍌  list组件用⭐
    const delTodo = (index: number) => {
      state.todos.splice(index, 1);
    };
    // 修改todo的isCompleted属性的状态，属性的修改应该让父组件来决定
    const updateTodo = (todo: Todo, isComplete: boolean) => {
      todo.isCompleted = isComplete;
    }; 
    // 全选全不选 遍历
    const checkAll = (isComplete: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCompleted = isComplete;
      });
    };
    // 清理所有选中数据
    const clearAllCompletedTodos = () => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    };
    // 监视操作: 如果todos数组的数据变化了，直接存储到浏览器的缓存中
    // watch(()=>state.todos,(value)=>{
    //   localStorage.setItem('todos_key',JSON.stringify(value))
    // },{deep:true})
    watch(
      () => state.todos,
      (value: Todo[]) => {
        saveArray(key, value as []);
      },
      { deep: true }
    );
    return {
      // 解构变成ref对象
      ...toRefs(state),
      addTodo,
      delTodo,
      updateTodo,
      checkAll,
      clearAllCompletedTodos,
    };
  },
});
</script>
<style  scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
