<template>
  <div class="blog">
    <div id="header">
      <Header @open="open"></Header>
    </div>
    <keep-alive>
      <component :is="openId"></component>
    </keep-alive>
  </div>
</template>
<script>
import Header from "../../components/Blog/Header.vue";
import Blog from "../../components/Blog/Blog.vue";
import Home from "../../components/Blog/Home.vue";
import Git from "../../components/Blog/Git.vue";
import Project from "../../components/Blog/Project.vue";
import Community from "../../components/Blog/Community.vue";
import ToolWebsite from "../../components/Blog/ToolWebsite.vue";
import File from "../../components/Blog/File.vue";
export default {
  name: "blog",
  data() {
    return {
      openId: Home,
    };
  },
  components: {
    Header,
    Blog,
    Home,
    Git,
    Project,
    Community,
    ToolWebsite,
    File,
  },
  computed: {},
  methods: {
    open(data) {
      this.openId = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.blog {
  min-height: 100vh;
  /* padding: 66px 36px 0; */
  text-align: left;
  background-color: antiquewhite;
}
</style>
