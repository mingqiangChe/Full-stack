<script setup lang="ts">
// import { useRouter } from "vue-router"
// const router = useRouter()
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
// @import "@/assets/scss/home/index.scss";
// import router from './router/index'
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
