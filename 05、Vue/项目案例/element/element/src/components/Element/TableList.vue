<template>
  <el-table
    ref="table"
    v-loading="loading"
    element-loading-text="Loading"
    :data="tableData"
    :row-key="rowKey"
    border
    fit
    highlight-current-row
    tooltip-effect="dark"
    style="width: 100%"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
  >
    <!--多选列-->
    <el-table-column v-if="indexShow" type="index" align="center" width="50">
    </el-table-column>
    <el-table-column
      v-if="selectionShow"
      type="selection"
      width="50"
      align="center"
      highlight-current-row
      fixed
      :reserve-selection="true"
    ></el-table-column>
    <el-table-column
      v-for="(item, index) in tableLabel"
      :width="item.width ? item.width : ''"
      :fixed="item.fixed ? item.fixed : false"
      :type="item.type ? item.type : ''"
      :key="index"
      :align="item.align"
      :label="item.label"
      :prop="item.param"
      :sortable="item.sortable ? 'custom' : false"
      v-show="index == 1"
    >
      <template slot-scope="scope">
        <slot v-if="item.slot" v-bind:scope="scope" :name="item.slot"></slot>
        <div v-html="item.render(scope.row)" v-else-if="item.render"></div>
        <span v-else>{{ scope.row[item.param] }} {{ item.type }}</span>
      </template>
    </el-table-column>

    <el-table-column
      v-if="tableOption.label"
      :width="tableOption.width"
      :label="tableOption.label"
      align="center"
      class-name="small-padding fixed-width"
      :fixed="tableOption.fixed ? tableOption.fixed : false"
    >
      <template slot-scope="scope">
        <el-button
          v-for="(item, index) in tableOption.options"
          :key="index"
          :type="item.type"
          :icon="item.icon"
          @click="handleButton(item.methods, scope.row, scope.row)"
          size="mini"
        >
          {{ item.label }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableLabel: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    indexShow: {
      type: Boolean,
      default: false,
    },
    selectionShow: {
      type: Boolean,
      default: false,
    },
    radioShow: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default: "",
    },
  },
  components: {},
  methods: {
    handleButton(methods, row, index) {
      // 按钮事件
      this.$emit("handleButton", { methods: methods, row: row, index: index });
    },
    handleSortChange(val) {
      // 排序
      this.$emit("handleSortChange", val);
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
  },
};
</script>

<style></style>
