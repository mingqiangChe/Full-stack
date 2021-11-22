<!--  -->
<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏：<input
      type="text"
      placeholder="请输入姓氏"
      v-model="user.firstName"
    /><br />
    名子：<input
      type="text"
      placeholder="请输入名字"
      v-model="user.lastName"
    /><br />
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName1" /><br />
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName2" /><br />
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName3" /><br />
  </fieldset>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
export default defineComponent({
  name: "App",
  setup() {
    // 定义一个响应式对象
    const user = reactive({
      // 姓氏
      firstName: "东方",
      // 名字
      lastName: "不败",
    });
    // 通过计算属性方式，实现第一个姓名显示
    // vue3中计算属性
    // 计算属性的函数中如果只传入一个回调函数，表示get

    // 第一个姓名⭐
    //返回Ref类型对象
    const fullName1 = computed(() => {
      return user.firstName + "-" + user.lastName;
    });

    // 第二个姓名⭐
    const fullName2 = computed({
      get() {
        return user.firstName + "-" + user.lastName;
      },
      set(val: string) {
        // console.log(val);
        const names = val.split("-");
        user.firstName = names[0];
        user.lastName = names[1];
      },
    });

    // 第三个姓名⭐
    const fullName3 = ref("");
    // 监视---------监视指定数据   val===>{firstName, lastName}
    watch(
      user,
      ({ firstName, lastName }) => {
        fullName3.value = firstName + "-" + lastName;
      },
      { immediate: true, deep: true }
    );
    // immediate 默认会执行一次watch,deep 深度监视

    // 监视⭐  不需要配置immediate,本身默认就会进行监视,(默认执行一次)
    // watchEffect(() => {
    //   fullName3.value = user.firstName + "-" + user.lastName;
    // });

    // 监视fullName3的数据,改变firstName和lastName
    watchEffect(() => {
      const names = fullName3.value.split("-");
      user.firstName = names[0];
      user.lastName = names[1];
    });

    // watch--------可以监视多个数据
    // watch([user.firstName,user.lastName,fullName3],()=>{
    //  //⭐这里的代码就没有执行, fullName3是响应式的数据,但是, user.firstName , user.lastName不是响应式的数据
    // console.log('fdsa');

    // })

    // 当我们使用watch监视非响应数据时候,代码需要改   回调的方式=======箭头函数
    watch([()=>user.firstName, ()=>user.lastName], () => {
      //⭐这里的代码就没有执行, fullName3是响应式的数据,但是, user.firstName , user.lastName不是响应式的数据
      console.log("fdsa");
    });
    return {
      user,
      fullName1,
      fullName2,
      fullName3,
    };
  },
});
</script>