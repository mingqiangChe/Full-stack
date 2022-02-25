<template>
  <div>
    <process-tree ref="tree" :treeData="treeData"></process-tree>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      treeData: [
        {
          name: "节点1",
        },
        {
          name: "节点1",
          children: [{ name: "节点2" }],
        },
        {
          name: "节点1",
          children: [{ name: "节点2", children: [{ name: "节点3" }] }],
        },
        {
          name: "节点1",
          children: [
            { name: "节点5" },
            { name: "节点5", isLong: true },
            {
              name: "节点26",
              children: [
                { name: "节点3" },
                { name: "节点3" },
                {
                  name: "节点33",
                  children: [
                    { name: "节点3" },
                    { name: "节点3" },
                    { name: "节点3" },
                  ],
                },
              ],
            },
            { name: "节点3", children: [{ name: "节点3" }, { name: "节点3" }] },
            { name: "节点4", children: [{ name: "节点3" }] },
            { name: "节点5", isLong: true },
          ],
        },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  filters: {},
};
</script>

<style scoped lang='scss'>
</style>