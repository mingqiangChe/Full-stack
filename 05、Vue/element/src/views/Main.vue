import Left from '@/components/Left.vue';
<!--
 * @Author: your name
 * @Date: 2021-12-10 16:17:58
 * @LastEditTime: 2021-12-13 13:27:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Full-stack/05、Vue/element/src/views/Main.vue
-->
<template>
    <el-container>
      <el-aside width="min-width:64px;">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header class="header"><common-header></common-header></el-header>
        <!-- tag -->
        <common-tag></common-tag>
        <!-- 中间部分使用路由 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
const CommonAside = () => import("../components/CommonAside.vue");
const CommonHeader = () => import("../components/CommonHeader.vue");
const CommonTag =()=>import("../components/CommonTag.vue")
// @ is an alias to /src
export default {
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
},
};
</script>
<style lang="scss" scoped>
.header {
  background-color: aqua;
  height: 36px;
}
</style>
