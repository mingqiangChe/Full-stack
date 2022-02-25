<!-- Child子级组件 -->
<template>
  <h1>Child子级组件</h1>
  <h3>{{ msg }}</h3>
  <!-- <h3>count:{{ count }}</h3> -->
  <button @click="emitxxx">子向父发送数据 分发事件</button>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  props: ["msg"],

  // setup是在beforecreate生命周期回调之前就执行了,而且就执行一次
  // 由此可以推断出:setup在执行的时候,当前的组件还没有创建出来,也就意味着:组件实例对象this根本就不能用
  // this是undefined,说明,就不能通过this再去调用data/computed/methods/props中的相关内容了
  // 其实所有的composition API相关回调函数中也都不可以
  // 数据初始化生命周期回调
  // beforeCreate() {
  //   console.log("beforecreate执行了");
  // },
  setup(props, context) {
    // ⭐⭐⭐props 对象,里面有父级组件向自己组建传递的数据，并且是在子级组件中使用props接收到的所有的属性
    // props: 包含 props 配置声明且传入了的所有属性的对象
    console.log(props);
    console.log(props.msg);
    console.log(context.attrs);
    console.log(context.emit, "555555");
    console.log(context.attrs.msg2);
    // ⭐⭐⭐context 参数，是一个对象，里面有attrs对象（获取档期那组件标签上所有的属性的属性，但是该属性是在props中没有声明接受的所有的属性的对象），emit方法（分发事件），slots对象（插槽）

    // props: 包含 props 配置声明且传入了的所有属性的对象
    // attrs: 包含没有在 props 配置中声明的属性的对象, 相当于 this.$attrs
    // slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
    // emit: 用来分发自定义事件的函数, 相当于 this.$emit

    console.log("setup执行了", this);
    const showMsg1 = () => {
      console.log("setup中的showMsg1");
    };
    //  this是underfined
    // 按钮的点击事件的回调函数
    function emitxxx() {
      context.emit("xxx", props.msg);
    }
    return {
      showMsg1,
      emitxxx
      // setup中一般都是返回一个对象,对象中的屈性和方法都可以在htm1模版中直接使用
      // setup中的对象内部的属性和data函数中的return对象的属性都可以在html模板中使用
      // setup中对象中的属性和data函数中的对象中的属性会合并为组件对象的属性
      // setup中的对象中的方法和methods对象中的方法会合并为组件对象的方法
      // 一般不要混合使用: methods 中可以访问 setup 提供的属性和方法, 但在 setup 方法中不能访问 data 和 methods
      // vue3中尽量不要混合使用data和setup及methods和setup
      // setup 不能是一个 async 函数: 因为返回值不再是 return 的对象, 而是 promise, 模板看不到 return 对象中的属性数据
    };
  },
  // data() {
  //   return {
  //     count: 10,
  //   };
  // },
  // mounted() {
  //   console.log(this);
  // },
  // methods: {
  //   showMsg2() {
  //     console.log("method中的showMsg方法");
  //   },
  // },
});
</script>