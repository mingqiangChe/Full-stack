<!-- 封装组件使用 -->
<template>
  <div class="component">
    <TableList
      :loading="loading"
      :table-data="tableData"
      :table-label="tableLabel"
      tableRef="tableRef"
      :selection-show="true"
      :row-key="rowKey"
      @handleSelectionChange="handleSelectionChange"
    >
      <template v-slot:defaultImage="tImg">
        <img
          :src="tImg.scope.row.defaultImg"
          style="width: 60px; height: 60px"
        />
      </template>
      <template v-slot:operation="tData">
        <el-link
          @click="handleClearSign(tData.scope.row)"
          icon="el-icon-edit"
          :style="
            tData.scope.row.tagTextName ||
            tData.scope.row.zoneLabelName ||
            Number(tData.scope.row.zoneLabel)
              ? 'primary'
              : 'info'
          "
          :underline="false"
          :disabled="
            tData.scope.row.tagTextName ||
            tData.scope.row.zoneLabelName ||
            Number(tData.scope.row.zoneLabel)
              ? false
              : true
          "
          >取消标记</el-link
        >
      </template>
    </TableList>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TableList from "../../components/Element/TableList.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { TableList },
  name: "component",
  data() {
    //这里存放数据
    return {
      listTypeInfo: {
        tagTextForZoneIdsList: [],
        zoneList: [],
      },
      tableData: [],
      tableLabel: [
        {
          label: "图片",
          param: "defaulrImage",
          align: "center",
          slot: "defaultImage",
        },
        {
          label: "图片",
          param: "defaulrImage",
          align: "center",
          slot: "defaultImage",
        },
        {
          label: "商品名称",
          param: "skuName",
          align: "center",
        },
        {
          label: "商品编辑",
          param: "skuId",
          align: "center",
        },
        {
          label: "商品标签",
          param: "zoneLabelName",
          align: "center",
        },
        {
          label: "专区标签",
          param: "tagTextName",
          align: "center",
        },
        {
          label: "操作",
          width: "300",
          fixed: "right",
          align: "center",
          slot: "operation",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
};
</script>
<style lang="css" scoped></style>
