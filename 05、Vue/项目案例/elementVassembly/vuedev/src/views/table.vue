<!-- table -->
<template>
  <div class="table">
    <div class="tables">
      <div class="main">
        <!-- <div class="radio">
          <el-radio
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="selAll()"
            :label="true"
            >是</el-radio
          >
          <el-radio v-model="radio" :label="false">否</el-radio>
        </div> -->
        <div class="picker">
          <el-date-picker v-model="time" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <!-- //生成表格的模板代码 -->
      <div class="table taskcontent">
        <el-table
          :data="tabledata"
          style="width: 100%"
          @selection-change="selRow"
          ref="multipleTable"
        >
          <el-table-column
            type="selection"
            min-width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="num"
            label="编号"
            min-width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="任务名称"
            min-width="300"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="创建时间"
            min-width="300"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="option"
            label="操作"
            min-width="300"
            align="center"
          >
            <template>
              <el-button type="primary" class="btn-blue1" size="mini"
                >处理</el-button
              >
              <el-button type="primary" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- //表格外部的全选按钮 -->
      <el-checkbox
        label="全选"
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="selAll()"
      ></el-checkbox>
    </div>
    <h1 style="color: red">table</h1>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      time: null,
      isIndeterminate: false, //对el-checkbox控制不完整的全选状态
      checkAll: false, //对el-checkbox控制全选状态
      tabledata: [
        //el-table的数据内容
        {
          num: "201903123345",
          name: "等级评价",
          time: "2019-10-10",
        },
        {
          num: "201903123346",
          name: "供应商推荐",
          time: "2019-10-14",
        },
        {
          num: "201903123348",
          name: "供应商推荐",
          time: "2019-10-15",
        },
        {
          num: "201903123350",
          name: "我的报告",
          time: "2019-10-16",
        },
      ],
      multipleSelection: [],
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    radio(newValue, oldValue) {
      if (newValue) {
        this.handleSelectionChange()
      }
    },
  },
  //方法集合
  methods: {
    // handleSelectionChange(val) {
    //   this.multipleSelection = val
    //   console.log(this.multipleSelection)
    // },
    selAll() {
      if (this.$refs.multipleTable.selection.length < this.tabledata.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.$refs.multipleTable.toggleAllSelection()
    },
    //表格内checkbox触发的全选按钮状态变化
    selRow(val) {
      alert("2")
      console.log(val)
      if (val.length < this.tabledata.length && val.length > 0) {
        this.isIndeterminate = true
      } else if (val.length == this.tabledata.length) {
        this.isIndeterminate = false
        this.checkAll = true
      } else if (val.length == 0) {
        this.isIndeterminate = false
        this.checkAll = false
      }
    },
  },
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
}
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  // flex-direction: column;
  justify-content: end;
  align-items: center;
}
.el-table__header-wrapper .el-checkbox {
  display: none !important;
}
</style>
