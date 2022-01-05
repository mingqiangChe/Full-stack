<template>
  <el-dialog
    :title="prantObj.clickType == 0 ? '查看详情' : '详情编辑'"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :closeOnPressEscape="false"
    :before-close="handleClose"
  >
    <el-form :model="form">
      <el-form-item label="昵称:" label-width="120">
        <el-input
          v-model="form.customer_nickname"
          autocomplete="off"
          placeholder="请输入昵称"
          :disabled="prantObj.clickType == 0 ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item label="客户名称:" label-width="120">
        <el-input
          v-model="form.customer_name"
          autocomplete="off"
          placeholder="请输入客户名称"
          :disabled="prantObj.clickType == 0 ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式:" label-width="120">
        <el-input
          v-model="form.customer_phone"
          autocomplete="off"
          placeholder="请输入联系方式"
          maxlength="11"
          :disabled="prantObj.clickType == 0 ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item label="客户来源:" label-width="120">
        <el-select
          v-model="form.customer_source"
          placeholder="请选择客户来源"
          clearable
          :disabled="prantObj.clickType == 0 ? true : false"
        >
          <el-option label="淘宝" value="1"></el-option>
          <el-option label="1688" value="2"></el-option>
          <el-option label="阿里国际站" value="3"></el-option>
          <el-option label="线下" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="意向产品:" label-width="120">
        <el-select
          v-model="form.customer_products"
          placeholder="请选择意向产品"
          clearable
          :disabled="prantObj.clickType == 0 ? true : false"
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
      <el-form-item label="意向程度:" label-width="120">
        <el-select
          v-model="form.customer_intention"
          :disabled="prantObj.clickType == 0 ? true : false"
          placeholder="请选择意向程度"
        >
          <el-option label="低" value="1"></el-option>
          <el-option label="中" value="2"></el-option>
          <el-option label="高" value="3"></el-option>
          <el-option label="极高" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最关心的问题:" label-width="120">
        <el-input
          type="textarea"
          placeholder="请输入最关心的问题"
          v-model="form.customer_issues"
          maxlength="255"
          autocomplete="off"
          autosize
          :disabled="prantObj.clickType == 0 ? true : false"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="顾虑:" label-width="120">
        <el-input
          type="textarea"
          placeholder="请输入顾虑"
          v-model="form.customer_worry"
          maxlength="255"
          autocomplete="off"
          autosize
          :disabled="prantObj.clickType == 0 ? true : false"
        >
        </el-input>
      </el-form-item>
       <el-form-item label="客户预算(元) :" label-width="120">
        <el-input
          v-model="form.customer_budget"
          autocomplete="off"
          placeholder="请输入客户预算(元)"
          :disabled="prantObj.clickType == 0 ? true : false"
        ></el-input>
      </el-form-item>
       <el-form-item label="是否报价:" label-width="120">
        <el-select
          v-model="form.customer_quote"
          :disabled="prantObj.clickType == 0 ? true : false"
          placeholder="请选择是否报价"
        >
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用途:" label-width="120">
        <el-input
          type="textarea"
          placeholder="请输入用途"
          v-model="form.customer_purpose"
          maxlength="255"
          autocomplete="off"
          autosize
          :disabled="prantObj.clickType == 0 ? true : false"
        >
        </el-input>
      </el-form-item>
       <el-form-item label="客户身份:" label-width="120">
        <el-select
          v-model="form.customer_identity"
          :disabled="prantObj.clickType == 0 ? true : false"
          placeholder="请选择客户身份"
        >
          <el-option label="农民" value="1"></el-option>
          <el-option label="经销商" value="2"></el-option>
          <el-option label="相关机构" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作业地区:" label-width="120">
        <el-input
          type="textarea"
          placeholder="请输入作业地区"
          v-model="form.customer_operation_area"
          maxlength="255"
          autocomplete="off"
          autosize
          :disabled="prantObj.clickType == 0 ? true : false"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="客户归属:" label-width="120">
        <el-input
          v-model="form.customer_sale"
          autocomplete="off"
          placeholder="请输入客户归属"
          :disabled="prantObj.clickType == 0 ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item label="交易状态:" label-width="120">
        <el-select
          v-model="form.customer_status"
          :disabled="prantObj.clickType == 0 ? true : false"
          placeholder="请选择交易状态"
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

      <el-form-item label="询盘时间:" label-width="120">
        <el-date-picker
          v-model="form.customer_inquiry_time"
          align="right"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          @change="timeChange"
          value-format="yyyy-MM-dd"
          :disabled="prantObj.clickType == 0 ? true : false"
           :clearable="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否需要定制:" label-width="120">
        <el-select
          v-model="form.customer_customized"
          :disabled="prantObj.clickType == 0 ? true : false"
          placeholder="是否需要定制"
        >
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="成交金额:" label-width="120" v-show="form.customer_status  == 2">
        <el-input
          v-model="form.customer_transaction_amount"
          autocomplete="off"
          placeholder="请输入成交金额"
          :disabled="prantObj.clickType == 0 ? true : false"
        ></el-input>
      </el-form-item>
       <el-form-item label="付款时间:" label-width="120"  v-show="form.customer_status  == 2">
        <el-date-picker
          v-model="form.customer_payment_time"
          align="right"
          type="date"
          placeholder="付款时间"
          format="yyyy 年 MM 月 dd 日"
          @change="timeChangeTwo"
          value-format="yyyy-MM-dd"
          :disabled="prantObj.clickType == 0 ? true : false"
           :clearable="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注:" label-width="120">
        <el-input
          type="textarea"
          placeholder="请输入备注"
          v-model="form.remarks"
          maxlength="255"
          autocomplete="off"
          autosize
          :disabled="prantObj.clickType == 0 ? true : false"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog()">取 消</el-button>
      <el-button type="primary" @click="determineDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateCustomerPoolItem } from '@/api/customerpool';
import {mapGetters} from 'vuex';
export default {
  name: "CustomerDetailsAlert",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        customer_budget: "",
        customer_customized: "",
        customer_identity: "",
        customer_inquiry_time: "",
        customer_intention: "",
        customer_issues: "",
        customer_name: "",
        customer_nickname: "",
        customer_operation_area: "",
        customer_phone: "",
        customer_products:"",
        customer_purpose:"",
        customer_quote:"",
        customer_sale:"",
        customer_source:"",
        customer_status:"",
        customer_worry:"",
        customer_transaction_amount:"",
        customer_payment_time:"",
        remarks:"",
      },
    };
  },
  props: {
    prantObj: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    prantObj: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        console.log(val, oldVal);
        this.dialogFormVisible = val.dialogVisible;
        this.form = val.rows;
      },
      deep: true, //true 深度监听
    },
  },
  mounted() {
    this.dialogFormVisible = this.prantObj.dialogVisible;
  },
  methods: {
    cancelDialog() {
      this.dialogFormVisible = false;
      this.prantObj.dialogVisible = false;
      this.prantObj.isRefresh = true;
      this.$emit("childrenDialogFnc", this.prantObj);
    },
    determineDialog() {
      if (!this.prantObj.clickType) {
        this.cancelDialog();
        return false;
      }
      if(!this.form.customer_inquiry_time){
        this.$message({
            type: 'warning',
            message: '询盘时间不能为空'
        });
        return false;
      }
      if(this.form.customer_status == 2 && !this.form.customer_transaction_amount){
        this.$message({
            type: 'warning',
            message: '当前订单成交金额不能为空'
        });
        return false;
      }
      if(this.form.customer_status == 2 && !this.form.customer_payment_time){
        this.$message({
            type: 'warning',
            message: '当前订单付款时间不能为空'
        });
        return false;
      }
      this.form.user_name = this.name;
      this.form.customer_transaction_amount = this.form.customer_status == 2?this.form.customer_transaction_amount:0;
      this.form.customer_payment_time = this.form.customer_status == 2?this.form.customer_payment_time:'';
      let data = this.form;
      console.log(data)
      updateCustomerPoolItem(data).then(response => {
        console.log(response)
        if(response.code == 200){
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          this.cancelDialog();
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    handleClose(done) {
      if (!this.prantObj.clickType) {
        this.cancelDialog();
      } else {
        this.$confirm("确认关闭？")
          .then((_) => {
            done();
            this.cancelDialog();
          })
          .catch((_) => {});
      }
    },
    timeChange(value){
      console.log(value)
      this.form.customer_inquiry_time = value;
    },
    timeChangeTwo(value){
      console.log(value)
      this.form.customer_payment_time = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form{
  height: 400px;
  overflow-y: scroll;
}
::v-deep .el-dialog{
  width: 500px;

}
::v-deep .el-form-item {
  // width: 300px;
  margin-left: 50px;
}
::v-deep .el-form-item__label {
  margin-right: 50px;
}

::v-deep .el-form-item__content {
  width: 200px;
  display: flex;
  margin-left: 100px;
}
::v-deep .el-form .el-form-item .el-form-item__label{
  margin-right: 22px;
}
::v-deep .el-form .el-form-item:nth-child(7) .el-form-item__label,
::v-deep .el-form .el-form-item:nth-child(9) .el-form-item__label,
::v-deep .el-form .el-form-item:nth-child(17) .el-form-item__label{
  margin-right:0px;
}

</style>
