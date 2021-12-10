
<template>
  <div class="customer-pool-box">
    <!-- 主体栏 -->
    <div class="customer-poll-Contaner">
      <el-table
        :data="tableData"
        border
        ref="multipleTable"
        style="width: 100%"
        max-height="650"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column
          fixed="left"
          prop="id"
          label="ID"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="user_code"
          label="操作人"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="type"
          label="操作类型"
          align="center"
        >
         <template slot-scope="scope">
            <el-tag
              :type="scope.row.type | filter_operationRecord"
              disable-transitions
              >{{ scope.row.type | filter_operationRecordText}}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作内容"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="create_data"
          label="操作时间"
          align="center"
           sortable
          show-overflow-tooltip
        >
        </el-table-column>
        <div slot="empty" class="emptyBg">
          <img src="@/assets/kong.png" alt="" />
          <p>暂无数据~</p>
        </div>
      </el-table>

      <div class="pageComponent">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pageNo"
          :page-sizes="[10, 50, 100, 500,1000]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mixObj } from "@/layout/mixin/commonMixin";
import {mapGetters} from 'vuex';
import { queryOperationRecord } from "@/api/operationRecord";
export default {
  name: "customer-pool",
  mixins: [mixObj],
  data() {
    return {
      loading: true,
      prantObj: {
        dialogVisible: false,
        clickType: 0,
        rows:null
      },
      form: {
        searchValue: "",
        region: "",
        source: "",
        intention:"",
        Intended_products:"",
        pageSize:10,
        pageNo:1,
        total:0
      },
      customerSelectValue: 0,
      dataonLineListSelections: '',
      tableDataNow: [],
      tableData: [],
      
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.operationRecord()
  },
  methods: {

    /**
     * @description: 分页事件监听每页N条
     * @param {*} val
     * @return {*}
     */    
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.pageSize = val;
      this.operationRecord()
    },

    /**
     * @description: 分页事件监听当前页数
     * @param {*} val
     * @return {*}
     */    
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.pageNo = val;
      this.operationRecord()
    },

    /**
     * @description: 重置条件选择
     * @param {*}
     * @return {*}
     */    
    resetForm(){
      this.form = {
        searchValue: "",
        region: "",
        source: "",
        intention:"",
        Intended_products:"",
        pageSize:10,
        pageNo:1,
        total:this.form.total
      }
    },

    /**
     * @description: 操作记录列表查询
     * @param {*}
     * @return {*}
     */    
    operationRecord(){
      console.log(this.form);
      this.loading = true;
      let data = {
        pageSize:this.form.pageSize,
        pageNo:this.form.pageNo
      }
      queryOperationRecord(data).then(response => {
        console.log(response)
        let newData = response.data;
        this.form.pageSize = newData.pageSize;
        this.form.pageNo = newData.pageNo;
        this.form.total = newData.total;
        this.tableData = newData.rows;
        this.loading = false;
      }).catch(error=>{
        this.loading = false;
      })
    },
  },
};
</script>

<style scoped lang="scss">
.customer-pool-box {
  width: 100%;
  height: 100%;

  .customer-poll-Heade {
    width: 98%;
    height: auto;
    background: #fff;
    // border-bottom: 1px solid #eee;
    margin-left: 1%;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .el-form {
      display: flex !important;
      flex-wrap: wrap;
      justify-content: flex-start;

      .el-form-item {
        margin-bottom: 5px !important;
        display: flex;

        ::v-deep.el-form-item__content {
          margin-left: 15px !important;
        }
      }
    }
  }

  .customer-poll-Contaner {
    border-radius: 3px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 98%;
    min-height: auto;
    background: #fff;
    margin-top: 15px;
    margin-left: 1%;
    ::v-deep.el-table__empty-text {
      width: 200px;
      height: 200px;
      line-height: initial;

      img {
        width: 100%;
      }
    }

    ::v-deep.el-table__empty-block {
      width: 300px !important;
      height: 300px !important;
      margin-left: 40%;
    }
    .pageComponent {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
