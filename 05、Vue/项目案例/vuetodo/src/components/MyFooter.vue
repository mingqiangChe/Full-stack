<!--
 * @Author: your name
 * @Date: 2022-02-15 10:34:23
 * @LastEditTime: 2022-02-15 15:19:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /GitHub/Full-stack/05、Vue/项目案例/vuetodo/src/components/MyFooter.vue
-->
<!-- 底部 -->
<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span>
      / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props:['todos','checkAllTodo','clearAllTodo'],
  data() {
    //这里存放数据
    return {}
  },
  //监听属性 类似于data概念
  computed: {
    total(){
      return this.todos.length
    },
    doneTotal(){
      return this.todos.reduce((pre,todo)=>pre +(todo.done ? 1:0),0)
    },
    isAll:{
      get(){
        return this.doneTotal === this.total && this.total >0
      },
      set(value){
        this.checkAllTodo(value)
      }
    }
    },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    clearAll(){
      this.clearAllTodo()
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/*footer*/
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
