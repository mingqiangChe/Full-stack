
<template>
  <div class="customer-pool-box">
    <!-- 顶部快捷功能栏 -->
    <div class="customer-poll-Heade">
      <el-form ref="form" :model="form" label-width="100px">
         <el-form-item label="联系方式">
          <el-input
            v-model="form.searchValue"
            placeholder="请输入联系方式"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="意向产品">
          <el-select
            v-model="form.Intended_products"
            placeholder="请选择意向产品"
            clearable
          >
            <el-option label="行业无人机系列" value="1"></el-option>
            <el-option label="植保无人机系列" value="2"></el-option>
            <el-option label="植保无人机10L" value="3"></el-option>
            <el-option label="植保无人机16L" value="4"></el-option>
            <el-option label="植保无人机22L" value="5"></el-option>
            <el-option label="植保无人机25L" value="6"></el-option>
            <el-option label="植保无人机30L" value="7"></el-option>
            <el-option label="消防无人机灭火弹" value="8"></el-option>
            <el-option label="消防无人机灭火罐" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易状态">
          <el-select
            v-model="form.region"
            placeholder="请选择交易状态"
            clearable
          >
            <el-option label="跟进中" value="1"></el-option>
            <el-option label="已付款" value="2"></el-option>
            <el-option label="已发货" value="3"></el-option>
            <el-option label="已收货" value="4"></el-option>
            <el-option label="交易完成" value="5"></el-option>
            <el-option label="退款中" value="6"></el-option>
            <el-option label="退款完成" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="意向程度">
          <el-select
            v-model="form.intention"
            placeholder="请选择意向程度"
            clearable
          >
            <el-option label="低" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="高" value="3"></el-option>
            <el-option label="极高" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="queryCustomerPool" size="medium" >查询</el-button>
            <el-button size="medium" @click="resetForm">重置</el-button>
            <el-button type="danger" size="medium" @click="TopDelectFnc('All')">删除</el-button>
          </el-form-item>
      </el-form>
    </div>
    <!-- 主体栏 -->
    <div class="customer-poll-Contaner">
      <el-table
        :data="tableDataNow"
        border
        ref="multipleTable"
        style="width: 100%"
        max-height="650"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column
          type="selection"
          fixed="left"
          width="55"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="id"
          label="ID"
          width="70"
          align="center"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="customer_nickname"
          label="昵称"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="customer_name"
          label="姓名"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="customer_phone"
          label="联系方式"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="customer_source"
          label="客户来源"
          width="130"
          align="center"
          sortable
          show-overflow-tooltip
        >
        <template slot-scope="scope">
          {{ scope.row.customer_source | filter_sourceText}}
        </template>
        </el-table-column>
        <el-table-column
          prop="customer_products"
          label="意向产品"
          width="140"
          align="center"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
          {{ scope.row.customer_products | filter_productsText}}
        </template>
        </el-table-column>
        <el-table-column
          label="意向程度"
          width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.customer_intention | filter_intention"
              disable-transitions
              >{{ scope.row.customer_intention | filter_intentionText}}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="customer_issues"
          label="最关心的问题"
          width="300"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="customer_worry"
          label="顾虑"
          width="300"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="customer_budget"
          label="客户预算(元)"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="是否报价"
          width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.customer_quote == 0?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="customer_purpose"
          label="用途"
          width="300"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="客户身份"
          width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.customer_identity | filter_identityText}}
          </template>
         </el-table-column>
        <el-table-column
          prop="customer_operation_area"
          label="作业地区"
          width="300"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
         <el-table-column
          prop="customer_sale"
          label="客户归属"
          width="130"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="交易状态"
          width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-link :type="scope.row.customer_status | filter_information" >
              {{ scope.row.customer_status  | filter_informationText}}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="询盘时间"
          width="220"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.customer_inquiry_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="customer_products"
          label="是否需要定制"
          width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.customer_customized  == 0?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="customer_transaction_amount"
          label="成交金额(元)"
          width="130"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="customer_payment_time"
          label="客户付款时间"
          width="130"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          width="300"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-search"
              circle
              @click="handleClick(scope.row, 0)"
              size="mini"
            >
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleClick(scope.row, 1)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="TopDelectFnc(scope.row)"
            ></el-button>
          </template>
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
        <div>
          <el-button type="warning" size="medium" @click="exportExcel">导出</el-button>
        </div>
      </div>
    </div>
    <!-- 详情弹窗组件 -->
    <Customer-Details-Alert
      :prantObj="prantObj"
      @childrenDialogFnc="prantDialogFnc"
    ></Customer-Details-Alert>
  </div>
</template>
  
  <script>
import CustomerDetailsAlert from "@/components/CustomerDetailsAlert";
import { mixObj } from "@/layout/mixin/commonMixin";
import Excel from "@/plugins/excel.js";
import { mapGetters } from "vuex";
import { CustomerPool } from "@/api/customerpool";
export default {
  name: "customer-pool",
  components: {
    "Customer-Details-Alert": CustomerDetailsAlert,
  },
  mixins: [mixObj],
  data() {
    return {
      loading: true,
      prantObj: {
        dialogVisible: false,
        clickType: 0,
        rows: null,
      },
      form: {
        searchValue: "",
        region: "",
        source:4,
        intention: "",
        Intended_products: "",
        pageSize: 10,
        pageNo: 1,
        saleName:"",
        total: 0,
      },
      customerSelectValue: 1,
      dataonLineListSelections: "",
      tableDataNow: [],
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  mounted() {
    this.queryCustomerPool();
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
      this.queryCustomerPool()
    },

    /**
     * @description: 分页事件监听当前页数
     * @param {*} val
     * @return {*}
     */    
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.pageNo = val;
      this.queryCustomerPool()
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
        saleName:"",
        pageSize:10,
        pageNo:1,
        total:this.form.total
      }
    },

    /**
     * @description: 客户池列表查询
     * @param {*}
     * @return {*}
     */    
    queryCustomerPool(){
      console.log(this.form);
      this.loading = true;
      let data = {
        customer_sale:this.customerSelectValue == 1?this.name:'',
        customer_intention:this.form.intention,
        customer_products:this.form.Intended_products,
        customer_source:this.form.source,
        customer_phone:this.form.searchValue,
        customer_status:this.form.region,
        pageSize:this.form.pageSize,
        pageNo:this.form.pageNo
      }
      CustomerPool(data).then(response => {
        console.log(response)
        let newData = response.data;
        this.form.pageSize = newData.pageSize;
        this.form.pageNo = newData.pageNo;
        this.form.total = newData.total;
        this.tableData = newData.rows;
        this.tableDataNow = this.tableData;
        this.loading = false;
      }).catch(error=>{
        this.loading = false;
      })
    },

    /**
     * @description: 数据单或多条数据删除事件
     * @param {*}
     * @return {*}
     */
    TopDelectFnc(type) {
      let newArr = [];
      let customer_nameArr = [];
      let customer_name = '';
      if(type == 'All'){
        if(this.$refs.multipleTable.selection.length<1){
          this.$message({
            message: '请选择需要删除的数据',
            type: 'warning'
          });
          return false;
        }
        let array = this.$refs.multipleTable.selection;
        for (let index = 0; index < array.length; index++) {
         newArr.push(array[index].id)
         customer_nameArr.push(array[index].customer_name)
        }
        this.dataonLineListSelections = newArr.join();
        customer_name = customer_nameArr.join();
      }else{
        this.dataonLineListSelections = type.id;
      }
      this.confirmFnc("此操作将永久删除该文件, 是否继续?","温馨提示","warning", true,{id:this.dataonLineListSelections,user_name:this.name,customer_name:type.customer_name?type.customer_name:customer_name});
    },

    /**
     * @description:数据查看/修改事件
     * @param {*} val
     * @param {*} type
     * @return {*}
     */
    handleClick(val, type) {
      console.log(val, type);
      this.prantObj.dialogVisible = true;
      this.prantObj.clickType = type;
      this.prantObj.rows = val;
    },

    /**
     * @description: 接收详情弹窗子组件返回的数据
     * @param {*} val
     * @return {*}
     */
    prantDialogFnc(val) {
      console.log(val);
      this.prantObj.dialogVisible = val.dialogVisible;
      if(this.prantObj.isRefresh){
        this.queryCustomerPool()
      }
    },

    /**
     * @description: 导出表格
     * @param {*}
     * @return {*}
     */
    exportExcel() {
      console.log(this.tableData)
      let newData = this.tableData;
      for (let i = 0; i < newData.length; i++) {
        if(newData[i].customer_intention == 1){
          newData[i].customer_intention = '低'
        }else if(newData[i].customer_intention == 2){
          newData[i].customer_intention = '中'
        }else if(newData[i].customer_intention == 3){
          newData[i].customer_intention = '高'
        }else{
          newData[i].customer_intention = '极高'
        }

        if(newData[i].customer_products == 1){
          newData[i].customer_products = '行业无人机系列'
        }else if(newData[i].customer_products == 2){
          newData[i].customer_products = '植保无人机系列'
        }else if(newData[i].customer_products == 3){
          newData[i].customer_products = '植保无人机10L'
        }else if(newData[i].customer_products == 4){
          newData[i].customer_products = '植保无人机16L'
        }else if(newData[i].customer_products == 5){
          newData[i].customer_products = '植保无人机22L'
        }else if(newData[i].customer_products == 6){
          newData[i].customer_products = '植保无人机25L'
        }else if(newData[i].customer_products == 7){
          newData[i].customer_products = '植保无人机30L'
        }else if(newData[i].customer_products == 8){
          newData[i].customer_products = '消防无人机灭火弹'
        }else if(newData[i].customer_products == 9){
          newData[i].customer_products = '消防无人机灭火罐'
        }else if(newData[i].customer_products == 10){
          newData[i].customer_products = '消防无人机水基灭火弹'
        }else{
          newData[i].customer_products = '消防无人机灭火球'
        }

        if(newData[i].customer_status == 1){
          newData[i].customer_status = '跟进中'
        }else if(newData[i].customer_status == 2){
          newData[i].customer_status = '已付款'
        }else if(newData[i].customer_status == 3){
          newData[i].customer_status = '已发货'
        }else if(newData[i].customer_status == 4){
          newData[i].customer_status = '已收货'
        }else if(newData[i].customer_status == 5){
          newData[i].customer_status = '交易完成'
        }else if(newData[i].customer_status == 6){
          newData[i].customer_status = '退款中'
        }else{
          newData[i].customer_status = '退款完成'
        }

        if(newData[i].customer_source == 1){
          newData[i].customer_source = '淘宝'
        }else if(newData[i].customer_source == 2){
          newData[i].customer_source = '1688'
        }else if(newData[i].customer_source == 3){
          newData[i].customer_source = '阿里国际站'
        }else{
          newData[i].customer_source = '线下'
        }

        if(newData[i].customer_quote == 0){
          newData[i].customer_quote = '是'
        }else{
          newData[i].customer_quote = '否'
        }

        if(newData[i].customer_customized == 0){
          newData[i].customer_customized = '是'
        }else{
          newData[i].customer_customized = '否'
        }

        if(newData[i].customer_identity == 1){
          newData[i].customer_identity = '农民'
        }else if(newData[i].customer_identity == 2){
          newData[i].customer_identity = '经销商'
        }else{
          newData[i].customer_identity = '相关机构'
        }
      }
      this.queryCustomerPool()
      Excel.exportExcel(newData, "客户池数据表");
    },
  }
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
  