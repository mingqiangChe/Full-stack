export default {
  state: {
    // 伸缩
    isCollapse: false,
    // 面包屑数据
    currentMenu: null,
    tabsList: [
      {
        path: "/",
        name: "blog",
        label: "个人",
        icon: "home",
      },
    ],
  },
  mutations: {
    // 取反控制
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 面包屑
    selectMenu(state, val) {
      // val.name === 'home' ? (state.currentMenu = null) : state.currentMenu = val

      if (val.name == "home") {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        // 新增tabsList
        const result = state.tabsList.findIndex(
          (item) => item.name == val.name
        );
        result === -1 ? state.tabsList.push(val) : "";
      }
    },
    closeTag(state, val) {
      const result = state.tabsList.findIndex((item) => item.name === val.name);
      state.tabsList.splice(result, 1);
    },
  },
};
