<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="display: flex; justify-content: space-around">
      <el-col :span="5">
        <el-card shadow="always">
          <div class="iconBox Box1">
            <i class="el-icon-s-custom"></i>
          </div>
          <div class="iconInfo">
            <span>昨日销售金额</span>
            <countTo
              :startVal="startVal"
              :endVal="yesterdayAmount"
              :duration="duration"
              :decimals="2"
              suffix="￥"
            ></countTo>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="always">
          <div class="iconBox Box2">
            <i class="el-icon-s-data"></i>
          </div>
          <div class="iconInfo">
            <span>昨日成交订单数</span>
            <countTo
              :startVal="startVal"
              :endVal="yesterdaySum"
              :duration="duration"
              
            ></countTo>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="always">
          <div class="iconBox Box3">
            <i class="el-icon-wind-power"></i>
          </div>
          <div class="iconInfo">
            <span>今日实时销售金额</span>
            <countTo
              :startVal="startVal"
              :endVal="todaySalesAmount"
              :duration="duration"
              :decimals="2"
              suffix="￥"
            ></countTo>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="always">
          <div class="iconBox Box4">
            <i class="el-icon-coin"></i>
          </div>
          <div class="iconInfo">
            <span>今日实时成交订单数</span>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="todayOrdersTtraded"
                :duration="duration"
                
              ></countTo>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="24" style="display: flex; justify-content: center">
      <el-col :span="17">
        <div class="grid-content bg-purple" id="containerShu"></div>
      </el-col>
       <el-col :span="17"><div class="grid-content bg-purple" id="container"></div></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="24" type="flex" justify="space-around" style="margin-top: 80px" >
      <el-col :span="17"><div class="grid-content bg-purple" id="containerBin"></div></el-col>
      <el-col :span="17"><div class="grid-content bg-purple" id="containerPie"></div></el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
import {queryYesterdayPerformance,queryTodayPerformance,querySevenDaysADay,queryEveryMonthOfTheYear,queryEveryProuducts} from '@/api/home'
import countTo from "vue-count-to";
export default {
  name: "Dashboard",
  data() {
    return {
      dataOne: [],
      dataThree: [],
      dataFive:[],
      // 需要滚动的时间
      duration: 3000,
      // 初始值
      startVal: 0,
      // 最终值
      endVal: 2018,
      yesterdayAmount:0,
      yesterdaySum:0,
      todaySalesAmount:0,
      todayOrdersTtraded:0,
      clearTime:null
    };
  },
  components: { countTo },
  mounted() {
    clearInterval(this.clearTime)
    this.$nextTick(()=>{
      this.getYesterdayData();
      this.getTodayData();
      this.getSevenDaysADay();
      this.getEveryMonthOfTheYear();
      this.getEveryProuducts();
      this.clearTime = setInterval(()=>{
        this.getTodayData();
      },3500)
    })
    
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.clearTime);　　// 清除定时器
    this.clearTime = null;
    next()
  },
  methods: {
    /**
     * @description: 昨日销售金额、昨日成交订单数接口查询
     * @param {*}
     * @return {*}
     */    
    getYesterdayData(){
      queryYesterdayPerformance().then(res=>{
        this.yesterdayAmount = res.data.dataPrice ? res.data.dataPrice : 0;
        this.yesterdaySum = res.data.dataNum ? res.data.dataNum : 0;
      }).catch(error=>{
        console.log(error)
      })
    },

    /**
     * @description: 今日销售金额、今日成交订单数接口查询
     * @param {*}
     * @return {*}
     */    
    getTodayData(){
      queryTodayPerformance().then(res=>{
        this.todaySalesAmount = res.data.dataPrice ? res.data.dataPrice : 0;
        this.todayOrdersTtraded = res.data.dataNum ? res.data.dataNum : 0;
      }).catch(error=>{
        console.log(error)
        clearInterval(this.clearTime);　　// 清除定时器
        this.clearTime = null;
      })
    },
    
    /**
     * @description: 七天每日总销售金额分析表接口查询
     * @param {*}
     * @return {*}
     */    
    getSevenDaysADay(){
      querySevenDaysADay().then(res=>{
        console.log(res)
        this.dataThree = res.data;
        this.initShuChart();
      }).catch(error=>{
        console.log(error)
      })
    },

    /**
     * @description: 一年每月总销售金额分析表接口查询
     * @param {*}
     * @return {*}
     */    
    getEveryMonthOfTheYear(){
      queryEveryMonthOfTheYear().then(res=>{
        this.dataOne = res.data;
        for (let index = 0; index < res.data.length; index++) {
           this.dataOne[index].months  = res.data[index].months + '月';
        }
        this.initLineChart();
        console.log(res)
      }).catch(error=>{
        console.log(error)
      })
    },

    /**
     * @description: 各产品总销售金额、数量分析表接口查询
     * @param {*}
     * @return {*}
     */    
    getEveryProuducts(){
      queryEveryProuducts().then(res=>{
        console.log(res)
        this.dataFive = res.data;
        for (let i = 0; i < res.data.length; i++) {
          if(this.dataFive[i].customer_products == 1){
            this.dataFive[i].customer_products = '行业无人机系列'
          }else if(this.dataFive[i].customer_products == 2){
            this.dataFive[i].customer_products = '植保无人机系列'
          }else if(this.dataFive[i].customer_products == 3){
            this.dataFive[i].customer_products = '植保无人机10L'
          }else if(this.dataFive[i].customer_products == 4){
            this.dataFive[i].customer_products = '植保无人机16L'
          }else if(this.dataFive[i].customer_products == 5){
            this.dataFive[i].customer_products = '植保无人机22L'
          }else if(this.dataFive[i].customer_products == 6){
            this.dataFive[i].customer_products = '植保无人机25L'
          }else if(this.dataFive[i].customer_products == 7){
            this.dataFive[i].customer_products = '植保无人机30L'
          }else if(this.dataFive[i].customer_products == 8){
            this.dataFive[i].customer_products = '消防无人机灭火弹'
          }else if(this.dataFive[i].customer_products == 9){
            this.dataFive[i].customer_products = '消防无人机灭火罐'
          }else if(this.dataFive[i].customer_products == 10){
            this.dataFive[i].customer_products = '消防无人机水基灭火弹'
          }else{
            this.dataFive[i].customer_products = '消防无人机灭火球'
          }
        }
        console.log(this.dataFive)
        this.initPieChat();
        this.initBinChart();
      }).catch(error=>{
        console.log(error)
      })
    },

    initLineChart() {
      const ds = new DataSet();
      const dv = ds.createView().source(this.dataOne);
      dv.transform({
        type: "map",
        callback: (row) => {
          row.months = parseInt(row.months, 10);
          return row;
        },
      }).transform({
        type: "regression",
        method: "polynomial",
        fields: ["months", "price"],
        bandwidth: 0.1,
        as: ["Months", "Value"],
      });

      const chart = new Chart({
        container: "container",
        autoFit: true,
        height: 500,
        padding: [20, 50],
        theme: "dark",
      });
      chart.scale({
        Months: {
          range: [0, 1],
        },
        price: {
          alias: "该月总销售金额(元)",
          sync: true,
          nice: true,
        },
        Value: {
          sync: true,
          nice: true,
        },
      });
      chart.axis("price", {
        label: null,
        title: {
          offset: 30,
          style: {
            fontSize: 20,
            fontWeight: 300,
            fill: "#333",
          },
          text:'一年每月总销售金额(元)'
        },
      });

      const view1 = chart.createView();
      view1.data(this.dataOne);
      view1.interval().position("months*price").style({
        fillOpacity: 1,
      });

      const view2 = chart.createView();
      view2.axis(false);
      view2.data(dv.rows);
      view2
        .line()
        .position("Months*Pprice")
        .style({
          stroke: "#969696",
          lineDash: [3, 3],
        })
        .tooltip(false);
      view2.annotation().text({
        content: "趋势线",
        position: ["min", "min"],
        style: {
          fill: "#8c8c8c",
          fontSize: 14,
          fontWeight: 300,
        },
        offsetY: -140,
      });

      chart.theme({
        styleSheet: {
          brandColor: "#FF6B3B",
          paletteQualitative10: [
            "#FF6B3B",
            "#626681",
            "#FFC100",
            "#9FB40F",
            "#76523B",
            "#DAD5B5",
            "#0E8E89",
            "#E19348",
            "#F383A2",
            "#247FEA",
          ],
          paletteQualitative20: [
            "#FF6B3B",
            "#626681",
            "#FFC100",
            "#9FB40F",
            "#76523B",
            "#DAD5B5",
            "#0E8E89",
            "#E19348",
            "#F383A2",
            "#247FEA",
            "#2BCB95",
            "#B1ABF4",
            "#1D42C2",
            "#1D9ED1",
            "#D64BC0",
            "#255634",
            "#8C8C47",
            "#8CDAE5",
            "#8E283B",
            "#791DC9",
          ],
        },
      });
      chart.render();
    },
    initPieChart() {
      const chart = new Chart({
        container: "containerPie",
        autoFit: true,
        height: 500,
        // padding: [30, 20, 70, 30],
      });

      chart.data(this.dataFive);
      chart.scale({
        value: {
          max: 1400,
          min: 0,
          alias: "各产品总销售金额分析表（元）",
        },
      });

      chart.axis("count", {
        label: null,
        title: {
          offset: 30,
          style: {
            fontSize: 20,
            fontWeight: 300,
            fill: "#333",
          },
          text:'各产品总销售金额分析表（元）'
        },
      });
      chart.legend(false);
      chart.coordinate().transpose();
      chart
        .interval()
        .position("customer_products*count")
        .size(26)
        .color('customer_products',['#F16D84'])
        .label("count", {
          style: {
            fill: "#8d8d8d",
          },
          offset: 10,
        });
      chart.interaction("element-active");
      chart.render();
    },
    initShuChart() {
      const chart = new Chart({
        container: "containerShu",
        autoFit: true,
       
        height: 500,
      });
      chart.data(this.dataThree);
      chart.scale('sale_money', {
        alias: '该日总销售金额(元)', 
      })
      chart.tooltip({
        showMarkers: false,
        shared: true,
      });
      chart
        .interval()
        .position("customer_payment_time*sale_money")
        .color("sale_money")
        .adjust([
          {
            type: "dodge",
            marginRatio: 0,
          },
        ])
         .style({ radius: [50, 50, 0, 0] });

      chart.interaction("element-highlight-by-x");

      chart.render();
    },
    initBinChart(){
      const chart = new Chart({
        container: 'containerBin',
        autoFit: true,
        height: 400,
      });

      chart.coordinate('theta', {
        radius: 0.75,
      });

      chart.data(this.dataFive);
    
      chart.tooltip({
        showTitle: true,
        showMarkers: false,
      });
      chart.axis("customer_products", {
        label: null,
        title: {
          offset: 30,
          style: {
            fontSize: 20,
            fontWeight: 300,
            fill: "#333",
          },
          text:'各产品总销售数量分析表（每台）'
        },
      });
      chart
        .interval()
        .position('count')
        .color('customer_products')
        .label('customer_products*count', {
          layout: { type: 'pie-spider' },
          labelHeight: 20,
          content: (obj) => `${obj.customer_products} (${obj.count})`,
          labelLine: {
            style: {
              lineWidth: 0.5,
            },
          },
        })
        .adjust('stack');

      chart.interaction('element-active');

      chart.render();
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<style  lang="scss">
.el-card {
  width: 300px;
  height: 90px !important;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  .iconBox {
    width: 100px;
    height: 90px;
    font-size: 50px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-card__body {
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .Box1 {
    background: #f72828;
  }
  .Box2 {
    background: #ff8040;
  }
  .Box3 {
    background: #004080;
  }
  .Box4 {
    background: #8000ff;
  }
  .iconInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 200px;
    > span:nth-child(1) {
      font-size: 20px;
      margin-top: 15px;
    }
    > span:nth-child(2) {
      font-size: 25px;
      margin-top: 10px;
      font-weight: 600;
    }
    > div {
      margin-top: 10px;
      > span {
        font-size: 25px;
        margin-top: 10px;
        font-weight: 600;
      }
    }
  }
}
</style>
