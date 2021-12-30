
<template>
  <div class="product-box">
    <el-divider content-position="left">植保无人机</el-divider>
    <div class="contanerBox">
      <el-row>
        <el-col
          :span="4"
          v-for="(o, index) in 1"
          :key="o"
          :offset="index > 0 ? 1 : 0"
        >
          <div class="productItem">
            <img
              src="https://hqtcsz-oss.oss-cn-shenzhen.aliyuncs.com/hqtcsz_pc/YK6-30.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>YK6-30</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button" @click="goHref">去看看</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider content-position="left">行业无人机</el-divider>
    <div class="contanerBox">
      <el-row>
        <el-col
          :span="4"
          v-for="(item, index) in dataArr"
          :key="index"
          :offset="index > 0 ? 2 : 0"
        >
          <div class="productItem">
            <img
              :src="item.imgUrl"
              class="image"
            />
            <div style="padding: 14px">
              <span>{{item.title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button" @click="goHrefTwo(index)">去看看</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  data() {
    return {
      currentDate: new Date(),
	  dataArr:[
		  {imgUrl:'https://hqtcsz-oss.oss-cn-shenzhen.aliyuncs.com/hqtcsz_pc/pochuan.png',title:'高层破窗灭火弹无人机'},
		  {imgUrl:'https://hqtcsz-oss.oss-cn-shenzhen.aliyuncs.com/hqtcsz_pc/ganfen.png',title:'超细干粉灭火无人机'},
      {imgUrl:'https://hqtcsz-oss.oss-cn-shenzhen.aliyuncs.com/hqtcsz_pc/shuiji.png',title:'水基灭火弹无人机'},
      {imgUrl:'https://hqtcsz-oss.oss-cn-shenzhen.aliyuncs.com/hqtcsz_pc/miehuoqiu.png',title:'抛投式干粉灭火球无人机'},
	  ]
    };
  },
  methods:{
    goHref(){
      window.open('https://www.hqtcsz.cn/components/product_details.html')
    },
    goHrefTwo(index){
      console.log(index)
      if(index == 0){
        window.open('https://www.hqtcsz.cn/components/fireBomb_details.html')
      }else if(index == 1){
        window.open('https://www.hqtcsz.cn/components/dry_Powder_Uav.html')
      }else if(index == 2){
        window.open('https://www.hqtcsz.cn/components/water_Based_details.html')
      }else{
        window.open('https://www.hqtcsz.cn/index.html')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.product-box {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
}
.contanerBox{
	padding:10px 30px;
	box-sizing: border-box;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.productItem{
	 box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>