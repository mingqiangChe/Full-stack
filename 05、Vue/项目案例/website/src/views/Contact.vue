<!-- 联系方式 -->
<template>
  <div class='conTact'>
    <ul class="bg-bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
    <div class="tempalte1">
      <div class='curd'>
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search">
        </el-input>

        <div class="button">
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration">显示总数</span>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="menu" @click="returnHome">
      <svg t="1637061178937" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2423" width="32" height="32">
        <path d="M958.400956 451.54921c-0.058328-5.760191-2.597151-11.215436-6.965645-14.97097L524.345166 69.511143c-7.498788-6.445806-18.581194-6.445806-26.079982 0L309.582871 231.6755l0-102.017488c0-11.04966-8.901741-19.532869-19.951401-19.532869l-88.034009 0c-11.048637 0-19.928888 8.482185-19.928888 19.532869l0 211.954343L71.176063 436.57824c-4.423753 3.800559-6.967692 9.341762-6.967692 15.173584l0 105.500822c0 7.819083 4.554736 14.921851 11.660574 18.183128 2.670829 1.226944 5.51562 1.824555 8.343015 1.824555 4.699022 0 9.346879-1.654686 13.048177-4.836145l53.29788-45.825698 0 324.100516c0 60.677964 49.364291 110.042255 110.042255 110.042255L764.792447 960.741257c60.677964 0 110.042255-49.364291 110.042255-110.042255L874.834702 527.026228l51.585889 44.335764c5.955642 5.119601 14.356986 6.282077 21.481244 2.965541 7.122211-3.313465 11.645225-10.488889 11.565407-18.342764L958.400956 451.54921zM221.578538 150.034085l48.095391 0 0 115.941616-48.095391 41.336454L221.578538 150.034085zM570.718333 920.725892 436.666244 920.725892 436.666244 700.642404c0-11.031241 8.976442-20.007683 20.007683-20.007683l94.0357 0c11.031241 0 20.007683 8.976442 20.007683 20.007683L570.71731 920.725892zM834.818313 495.895207l0 354.803795c0 38.612413-31.414477 70.02689-70.02689 70.02689l-154.058748 0L610.732675 700.642404c0-33.096792-26.926256-60.023048-60.023048-60.023048l-94.0357 0c-33.096792 0-60.023048 26.926256-60.023048 60.023048l0 220.084511L260.59925 920.726915c-38.612413 0-70.02689-31.414477-70.02689-70.02689L190.57236 495.895207c0-1.172709-0.121773-2.314719-0.315178-3.432169l322.113255-276.958846 322.70268 277.348726C834.921667 493.848595 834.818313 494.858598 834.818313 495.895207zM525.411451 173.947727c-7.502881-6.445806-18.587334-6.446829-26.086122 0.00307L104.223736 513.663896l0-52.726875 407.081439-349.870436 407.176606 349.9523 0.521886 51.205219L525.411451 173.947727z" p-id="2424" fill="#1296db"></path>
      </svg>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { myMixin } from '@/assets/mixin.js'
export default {
  mixins: [myMixin],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  name: 'contact',
  data() {
    //这里存放数据
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      status: false
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    returnHome() {
      this.$router.push('home')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.num++
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.conTact {
  width: 100%;
  height: 100%;
  // background-color: aqua;
  background: linear-gradient(to bottom right, #50a3a2, #53e3a6);
  .txt {
    // width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .text {
      font-size: 14px;
    }
    .item {
      margin: 18px;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: '';
    }
    .clearfix:after {
      clear: both;
    }

    .box-card {
      width: 480px;
      padding: 20px 0;
    }
  }
  .menu {
    cursor: pointer;
    position: fixed;
    bottom: 5%;
    right: 5%;
  }
}
.bg-bubbles {
  position: absolute;
  // 使气泡背景充满整个屏幕；
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // 如果元素内容超出给定的宽度和高度，overflow 属性可以确定是否显示滚动条等行为；
  overflow: hidden;
  li {
    position: absolute;
    // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
    bottom: -160px;
    // 默认的气泡大小；
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    list-style: none;
    // 使用自定义动画使气泡渐现、上升和翻滚；
    animation: square 15s infinite;
    transition-timing-function: linear;
    // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      left: 20%;
      width: 90px;
      height: 90px;
      animation-delay: 2s;
      animation-duration: 7s;
    }
    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-duration: 8s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 120px;
      height: 120px;
      animation-delay: 3s;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(7) {
      left: 32%;
      width: 160px;
      height: 160px;
      animation-delay: 2s;
    }
    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
      animation-duration: 15s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 10px;
      height: 10px;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(10) {
      left: 85%;
      width: 160px;
      height: 160px;
      animation-delay: 5s;
    }
  }
  // 自定义 square 动画；
  @keyframes square {
    0% {
      opacity: 0.5;
      transform: translateY(0px) rotate(45deg);
    }
    25% {
      opacity: 0.75;
      transform: translateY(-400px) rotate(90deg);
    }
    50% {
      opacity: 1;
      transform: translateY(-600px) rotate(135deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-1000px) rotate(180deg);
    }
  }
}

// 增删查改
.curd {
  width: 1200px;
  margin: 0 auto;
}
</style>