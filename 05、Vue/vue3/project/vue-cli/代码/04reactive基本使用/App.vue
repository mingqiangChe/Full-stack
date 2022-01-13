<template>
  <h2>reactive的使用</h2>
  <h3>名字：{{ user.name }}</h3>
  <h3>年龄：{{ user.age }}</h3>
  <h3>性别:{{ user.gender }}</h3>
  <h3>媳妇：{{ user.wife }}</h3>
  <button @click="updateUser">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "App",
  // 需求:显示用户的相关信息,点击按钮,可以更新用户的相关信息数据

  /** 作用: 定义多个数据的响应式
  const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
  响应式转换是“深层的”：会影响对象内部所有嵌套的属性
  内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的 **/
  setup() {
    // 可以传入对象
    // ⭐返回的是一个Proxy的代理对象,被代理的对象就是obj对象
    // const user = reactive({
    //   name: "小明",
    //   age: 20,
    //   wife: {
    //     name: "小红",
    //     age: 19,
    //     cars: ["奔驰", "宝马"],
    //   },
    // });

    // user现在是代理对象，obj是目标对象
    // const obj: any = {
    //为了 obj.gender = "男";可以使用
    const obj = {
      name: "小明",
      age: 20,
      wife: {
        name: "小红",
        age: 19,
        cars: ["奔驰", "宝马"],
      },
    };
    // user对象类型是proxy⭐⭐⭐⭐⭐
    const user = reactive<any>(obj);
    console.log(user);

    // 方法
    // function updateUser() {}
    const updateUser = () => {
      // ⭐直接使用目标对象的方式来更新目标对象中的成员的值,是不可能的,只能使用代理对象的方式来更新数据(响应式数据)

      // obj.name+='=='
      // user.name += "==";
      // user.age += 2;
      // user.wife.name += "++";
      // user.wife.cars[0] = "扭扭车";

      // user---->代理对象,user---->目标对象
      // user对象或者obj对象添加一个新的属性,哪一种方式会影响界面的更新
      // obj.gender = "男";  ⭐视频没展示出来
      user.gender = "男"; //⭐这种方式界面可以更新渲染   数据也添加到obj对象上了
      // ser对象或者obj对象中移除一个已经存在的屈性,哪一种方式会影响界面的更新

      // delete obj.age;  //界面没有更新渲染,obj中确实没有了age这个属性
      delete user.age; // 界面更新渲染,obj中确实没有了age这个属性

      //⭐⭐⭐总结:如果操作代理对象,目标对象中的数据也会随之变化,同时如果想要在操作数据的时候,界面也要跟着重新更新渲染,那么也是操作代理对象

      //通过当前的代理对象找到该对象中的某个属性,更改该属性中的某个数组的数据
      // user.wife.cars[1] = "三轮车";

      // 通过当前的代理对象把目标对象中的某个数组属性添加一个新的属性
      user.wife.cars[2] = "两轮车";
    };

    return {
      user,
      updateUser,
    };
  },
});
</script>

<style>
</style>