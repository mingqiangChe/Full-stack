// 头部
<template>
  <div class="todo-header">
    <!-- 按键调用添加数据方法🥝 -->
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keydown.enter="add" v-model="title">
  </div>
</template>
<script lang='ts'>
import {defineComponent, ref} from 'vue'
export default defineComponent({
  name: 'Header',
  props: {
    // 接收app父组件传过来的属性方法🥝
    addTodo: {
      type: Function,
      require: true // 必须要传
    }
  },
  // 使用传过来调用addtodo方法必须使用props🍎🍎🍎🍎
  setup(props) {
    // 拿到文本框输入内容 v-model  
    // 定义ref类型数据
    const title = ref('')
    // 回车的事件的回调函数，用来添加数据
    const add = () => {``
    //判断数据有无
      if (!title.value.trim()) return;
      // 调用addtodo方法传入数据🍌🍌🍌
      props.addTodo?.({
        id: Date.now(),
        title: title.value,
        isCompleted: false
      })
      // 清空文本框
      title.value = ''
    }
    return {
      title,
      add,
    }
  }
})
</script>
<style scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}
.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
