# Echarts
> 开源免费 功能丰富 社区活跃

[网址](https://echarts.apache.org/zh/index.html)

项目地址    

```
git@github.com:thomas373737/echarts-model.git
```



> 多种数据格式支持

key-value数据格式
二维表
TypedArray格式

> 流数据支持

动态渲染
## 基本使用
### 步骤1:引入echarts.js文件
### 步骤2︰准备一个呈现图表的盒子
### 步骤3:初始化echarts实例对象
### 步骤4∶准备配置项
### 步骤5:将配置项设置给echarts实例对象

![在这里插入图片描述](https://img-blog.csdnimg.cn/8314795d780f4c808710961d06a04aa0.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


## 各种图表实现以及常见效果

### 配置项使用⭐⭐⭐
[参照官网文档和示例](https://echarts.apache.org/zh/option.html#title)
xAxis:直角坐标系中的x轴
yAxis:直角坐标系中的y轴
series:系列列表。每个系列通过type决定自己的图表类型

### 通用配置
通用配置指的就是任何图表都能使用的配置
#### 标题: title
文字样式
textStyle
标题边框
borderwidth、borderColor、borderRadius
标题位置
left、 top、right、 bottom
#### 提示: tooltip⭐
tooltip:提示框组件,用于配置鼠标滑过或点击图表时的显示框
触发类型: trigger
item、axis
触发时机: triggerOn
mouseover.click
格式化: formatter⭐
字符串模板、回调函数
#### 工具按钮: toolbox
内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具
显示工具栏按钮feature
saveAslmage、 dataView、restore、 dataZoom、 magicType
![在这里插入图片描述](https://img-blog.csdnimg.cn/7e8f23a6b89e42a4b5228df230b44757.jpg#pic_center)

#### 图例: legend
legend:图例,用于筛选系列,需要和series配合使用
legend中的data是一个数组
legend中的data的值需要和series数组中某组数据的name值一致

![在这里插入图片描述](https://img-blog.csdnimg.cn/08e5576fcef94a4bb53d857ff516d029.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_13,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 直角坐标系中的常用配置
直角坐标系图表:柱状图 折线图 散点图
#### 配置1∶网格grid

grid是用来控制直角坐标系的布局和大小
x轴和y轴就是在grid的基础上进行绘制的
显示grid
show
grid的边框
borderWidth、 borderColor
grid的位置和大小
left、 top、 right、bottomwidth、height
![在这里插入图片描述](https://img-blog.csdnimg.cn/ec39f51dc69f47bcb7d6c07698ac0a1f.jpg#pic_center)
#### 配置2:坐标轴axis

坐标轴分为x轴和y轴
一个grid中最多有两种位置的x轴和y轴
坐标轴类型type
value:数值轴,自动会从目标数据中读取数据
category:类目轴,该类型必须通过data设置类目数据
显示位置position

xAxis:可取值为top或者bottom
yAxis: 可取值为left或者right

#### 配置3:区域缩放datazoom

datazoom用于区域缩放,对数据范围过滤,x轴和y轴都可以拥有
datazoom是一个数组,意味着可以配置多个区域缩放器
>类型type

slider:滑块
inside:内置,依靠鼠标滚轮或者双指缩放
> 指明产生作用的轴

xAxisIndex:设置缩放组件控制的是哪个x轴，一般写0即可
yAxisIndex:设置缩放组件控制的是哪个y轴，一般写O即可
> 指明初始状态的缩放情况

start:数据窗口范围的起始百分比
end:数据窗口范围的结束百分比
![在这里插入图片描述](https://img-blog.csdnimg.cn/a6a1dc401d504177b7f321900ce8cb28.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_15,color_FFFFFF,t_70,g_se,x_16#pic_center)


### 柱状图
#### 常见效果
标记:最大值最小值平均值
markPoint
markLine
显示:数值显示柱宽度横向柱状图
label
barWidth
更改x轴和y轴的角色  替换xAxis yAxis内容
#### 总结
>基本的柱状图

基本的代码结构
x轴和y轴的数据
series中的type设置为bar
>柱状图常见效果

最大值\最小值markPoint
平均值markLine
数值的显示 label
柱的宽度barWidth
>柱状图特点

柱状图描述的是分类数据，呈现的是每一个分类中有多少,通过柱状图,可以很清晰的看出每个分类数据的排名情况


### 折线图
#### 常见效果

标记:最大值最小值平均值标注区间
markPoint、markLine、markArea
线条控制:平滑风格
smooth、linestyle
填充风格
areaStyle
紧挨边缘 x轴0出发
boundaryGap
缩放:脱离О值比例
scale
堆叠图 在另一张图基础上堆叠
stack

![在这里插入图片描述](https://img-blog.csdnimg.cn/ec1f1d0f283149a2a39efbbc258c3941.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/d58ecff68791472f9d2f25f66c95723c.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_14,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 总结
>基本的折线图

基本的代码结构
x轴和y轴的数据
series中的type设置为line
> 折线图常见效果

最大值\最小值\平均值markPoint markLine markArea
线条显示smooth lineStyle
填充风格areaStyle
紧挨边缘boundaryGap
脱离О值比例scale  ⭐
堆叠图stack

> 折线图特点

折线图常用来分析数据随时间的变化趋势

### 散点图
#### 实现步骤
1、ECharts最基本的代码结构:
   引入js文件，DOM容器,初始化对象,设置option
2、x轴数据和y轴的数据:二维数组
   数组1:[[身高1,体重1]，[身高2,体重2],[身高3,体重3]....]
3、图表类型︰
  在series下设置type:scatter
  xAxis和yAxis的type都要设置为value
4、调整︰
将坐标轴都设置为脱离O值比例,scale

![在这里插入图片描述](https://img-blog.csdnimg.cn/4510dc39cce746649b400bc55e43fa80.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_17,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 常见效果
>气泡图效果

散点的大小不同      symbolSize
散点的颜色不同      itemStyle.color
>涟漪动画效果

type:effectScatter
showEffectOn:'emphasis'
rippleEffect:0

![在这里插入图片描述](https://img-blog.csdnimg.cn/e8e21000bf9e45c8a681a91a971adfc6.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 小结
> 基本的散点图

基本的代码结构
x轴和y轴的数据,是一个二维数组
series中的type设置为scatter
xAxis和yAxis中的type设置为value
> 散点图常见效果

气泡图
涟漪效果
> 散点图特点

散点图可以帮助我们推断出不同维度数据之间的相关性


### 饼图
#### 实现步骤

>ECharts最基本的代码结构:

引入js文件，DOM容器,初始化对象，设置option
> 数据准备:

 {name: "淘宝", value: 11231 },
{ name: "京东", value: 22673 },
{ name: "唯品会" , value: 6123 },
{ name: "1号店" , value:8989 },
{ name: "聚美优品",value: 6700}
> 图表类型∶

在series下设置type:pie


#### 常见效果

显示数值
label.formatter
圆环
设置两个半径radius: ['50%', "70%'],
> 南丁格尔图
roseType:'radius'
> 选中效果

选中模式selectedMode: single\multiple
选中偏移量selectedoffset:30


![在这里插入图片描述](https://img-blog.csdnimg.cn/03a6a5195b2b4d1bb474ce2847b67777.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 小结

>基本的饼图.

基本的代码结构
数据是由name和value组成的对象所形成的数组
series中的type设置为pie
无须配置xAxis和yAxis
> 饼图常见效果

显示文字的格式化
圆环
南丁格尔图
选中效果
>饼图特点

饼图可以很好地帮助用户快速了解不同分类的数据的占比情况

### 地图
> 地图图表的使用方式

百度地图API
需要申请百度地图ak

矢量地图
需要准备矢量地图数据 china.json  word.json


#### 矢量地图的实现步骤

1、ECharts最基本的代码结构:
引入js文件,DOM容器,初始化对象，设置option
2、准备中国的矢量地图json文件,放到json/map/的目录下china.json
3、使用Ajax获取china.json
$.get('json/map/china.json',function (chinaJson){})
4、在回调函数中往echarts全局对象注册地图的json数据
echarts.registerMap('chinaMap' , chinaJson);
5、在geo下设置
type:'map'
map:'chinaMap'

![在这里插入图片描述](https://img-blog.csdnimg.cn/4fc459eef7824a2ab951a1841fbc08e3.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

#### 常用配置

1、缩放拖动:
roam
2、名称显示
label
3、初始缩放比例
zoom
4、地图中心点
center
![在这里插入图片描述](https://img-blog.csdnimg.cn/74095eae2cd94bef9ceb4acfa2c2145b.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

#### 常见效果
> 显示某个区域

1.加载该区域的矢量地图数据
⒉通过registerMap注册到echarts全局对象中3.指明geo配置下的type和map属性
4.通过zoom放大该区域
5.通过center定位中心点

> 不同城市颜色不同

1.显示基本的中国地图
2.城市的空气质量数据设置给series
3.将series下的数据和geo关联起来
geolndex:0 、 type:'map'
4.结合visualMap配合使用
min
max
inRange
calculable
![在这里插入图片描述](https://img-blog.csdnimg.cn/cb8d14df6ff2476899b5b62b1fea1901.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
> 地图和散点图结合

1.给series下增加新的对象
2.准备好散点数据,设置给新对象的data
3.配置新对象的type
type:effectScatter
4.让散点图使用地图坐标系统
coordinateSystem: 'geo',
5.让涟漪的效果更加明显
rippleEffect: {
	scale: 10
)

![在这里插入图片描述](https://img-blog.csdnimg.cn/6bee4380fbea48a599451624f04a3da6.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 小结

> 地图图表的两种使用方式

百度地图API
矢量地图数据
> 地图的绘制

加载数据
将数据注册给echarts全局对象配置geo
>常见效果

缩放拖动/初始缩放比例/中心点
visualMap和地图的结合
散点图和地图的结合

> 地图特点

地图主要可以帮助我们从宏观的角度快速看出不同地理位置上数据的差异


### 雷达图
#### 实现步骤

![在这里插入图片描述](https://img-blog.csdnimg.cn/5b5ce11fb5cd4fe0a3ba27f441e354ed.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/e3d13ad7d60946469597513c8b0d623a.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

#### 常用配置

1、显示数值:l
abel
2、区域面积
areaStyle
3、绘制类型
shape


![在这里插入图片描述](https://img-blog.csdnimg.cn/5a1e43465eee40e993fa0751bab4013f.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 小结

> 雷达图的实现步骤

定义各个维度的最大值
定义图表的类型

>雷达图的特点

雷达图可以用来分析多个维度的数据与标准数据的对比情况

### 仪表盘
![在这里插入图片描述](https://img-blog.csdnimg.cn/bd7eb5402157471387acb83093a14ac0.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 常见效果

1、数值范围:
max, min
2、多个指针:
增加data中的数组元素
3、多个指针颜色差异
itemstyle
![在这里插入图片描述](https://img-blog.csdnimg.cn/8af8a3b483cf4853b7e09dc5e334136d.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 小结

>仪表盘的实现步骤

准备数据
定义图表的类型
> 仪表盘的特点

仪表盘可以更直观的表现出某个指标的进度或实际情况

### 总结
![在这里插入图片描述](https://img-blog.csdnimg.cn/b5f5de86936f4b20b1f66f14686d95d8.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
### 使用场景

柱状图:柱状图描述的是分类数据，呈现的是每一个分类中有多少
折线图:折线图常用来分析数据随时间的变化趋势
散点图:散点图可以帮助我们推断出不同维度数据之间的相关性
饼图:饼图可以很好地帮助用户快速了解不同分类的数据的占比情况
地图:地图主要可以帮助我们从宏观的角度快速看出不同地理位置上数据的差异
雷达图:雷达图可以用来分析多个维度的数据与标准数据的对比情况
仪表盘:仪表盘可以更直观的表现出某个指标的进度或实际情况

## 高级使用
### 显示相关
#### 主题
##### 内置主题

ECharts中默认内置了两套主题:light dark
在初始化对象方法init中可以指明
var chart = echarts.init(dom, 'light');
var chart = echarts.init(dom, 'dark');

![在这里插入图片描述](https://img-blog.csdnimg.cn/aa0e84f54d494c6ba76a60a1534c5c2b.jpg#pic_center)

##### 自定义主题
[网址](https://echarts.apache.org/zh/download-theme.html)
1.在主题编辑器中编辑主题
2.下载主题,是一个js文件
3.引入主题js文件
4.在init方法中使用主题

![在这里插入图片描述](https://img-blog.csdnimg.cn/009eb11441ca49d28ff2f60550db5c30.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

##### 调色盘
全局调色盘会覆盖主题调色盘  就近原则
它是一组颜色，图形、系列会自动从其中选择颜色。
1、主题调色盘
2、全局调色盘:
option : {
color: ['red' ,'green' , 'blue',].)
3、局部调色盘:
series: [{
type: 'bar',
color: ['red','green' , 'blue", ],
)],

![在这里插入图片描述](https://img-blog.csdnimg.cn/7a6e2d39a7a241a3a2b3edd855f97cc7.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
4、颜色渐变
线性渐变
![在这里插入图片描述](https://img-blog.csdnimg.cn/640bdde66b794830adeaf150cb498b59.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


径向渐变

![在这里插入图片描述](https://img-blog.csdnimg.cn/23b6765e11c245e99f7c2fc75f7fb5af.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_17,color_FFFFFF,t_70,g_se,x_16#pic_center)

#### 样式
1、直接样式
itemstyle、textStyle、linestyle.areastyle、label

![在这里插入图片描述](https://img-blog.csdnimg.cn/8ed64b22ff79494681c161e59c54c4b3.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

2、高亮样式

在emphasis中包裹itemStyle、textStyle、lineStyle、areaStyle、label

![在这里插入图片描述](https://img-blog.csdnimg.cn/650500522e0c4252808aba8616017a7e.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_19,color_FFFFFF,t_70,g_se,x_16#pic_center)

#### 自适应
当浏览器的大小发生变化的时候,如果想让图表也能随之适配变化
1.监听窗口大小变化事件
⒉.在事件处理函数中调用ECharts实例对象的resize即可
window.onresize = function(){
mychart.resizeO;
}

![在这里插入图片描述](https://img-blog.csdnimg.cn/bd10a22fc6094c6fad33c7278b39822c.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 动画的使用

##### 加载动画
ECharts已经内置好了加载数据的动画，我们只需要在合适的时机显示或者隐藏即可
> 显示加载动画

mCharts.showLoading()

> 隐藏加载动画

mCharts.hideLoading()

![在这里插入图片描述](https://img-blog.csdnimg.cn/316e30909b2f4fb7ac09f53f76687e06.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


##### 增量动画

mCharts.setOption（option）
所有数据的更新都通过setOption实现
不用考虑数据到底产生了那些变化
ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。
![在这里插入图片描述](https://img-blog.csdnimg.cn/fd75edce016f4e25bc3915e487866d9a.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


##### 动画的配置
> 开启动画

animation: true动画时长
animationDuration: 5000
> 缓动动画

animationEasing: 'bounceout'
> 动画阈值

animationThreshold: 8
单种形式的元素数量大于这个阈值时会关闭动画
![在这里插入图片描述](https://img-blog.csdnimg.cn/26ac9e746ae14574873c29a92ec6b8f3.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


### 交互API

> 全局echarts对象

全局echarts对象是引入echarts.js文件之后就可以直接使用的

1、init
初始化ECharts实例对象
使用主题

2、registerTheme
注册主题
只有注册过的主题,才能在init方法中使用该主题

3、registerMap

>注册地图数据

$.get('json/maplchina.json', function (chinajson){
echarts.registerMap('china', chinajson);
});
> geo组件使用地图数据

var option = {
geo:{
type: 'map'，map: 'china',),
});


4、connect.
A、 一个页面中可以有多个独立的图表
B、每一个图表对应一个ECharts实例对象
C、connect可以实现多图关联，传入联动目标为ECharts实例对象，支持数组。
保存图片的自动拼接
刷新按钮
重置按钮
提示框联动、图例选择、数据范围修改等.....

![在这里插入图片描述](https://img-blog.csdnimg.cn/edb320b47d6b4c88b706b4d7c1bba439.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

>echartsInstance对象    新旧

eChartsInstance对象是通过echarts.init方法调用之后得到的

**1、setOption方法**

设置或修改图表实例的配置项以及数据
多次调用setOption方法
合并新的配置和旧的配置
增量动画

**2、resize方法     自适应**

A、重新计算和绘制图表
B、一般和window对象的resize事件结合使用
window.onresize = function(){
myChart.resize();
)


**3、on\off方法**
A、绑定或者解绑事件处理函数
B、鼠标事件
常见事件: 'click'.'dblclick'. 'mousedown'、 'mousemove'. 'mouseup'等
事件参数arg:和事件相关的数据信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/e5151b6774dc49cfb772312c29f4a075.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


C、Echarts事件
常见事件: legendselectchanged. 'datazoom'、 'pieselectchanged'、 'mapselectchanged'等
事件参数arg:和事件相关的数据信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20f94381124a4e8cad64dc406cc6a8af.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

4、dispatchAction方法   分发动作

A、触发某些行为
B、使用代码模拟用户的行为
mCharts.dispatchAction({
type: 'highlight', ll事件类型
seriesIndex: 0,ll图表索引
datalndex: 1//图表中哪一项高亮
});

![在这里插入图片描述](https://img-blog.csdnimg.cn/2c18da7e567145c69ea6e17ce73e11a4.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


5、clear方法

清空当前实例，会移除实例中所有的组件和图表
清空之后可以再次setOption
![在这里插入图片描述](https://img-blog.csdnimg.cn/b64278c0ae594d39bb091de8a7067bf1.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

6、dispose方法  销毁

销毁实例

销毁后实例无法再被使用


# 项目
## 后台搭建开发
### [koa2介绍](https://blog.csdn.net/weixin_45896126/article/details/119043906)
支持async/awati
洋葱模型的中间件

### koa2快速上手
#### 检查Node的环境
node -v
#### 安装Koa
npm init -y 
npm install koa
#### 创建并编写app.js文件
1.创建Koa对象
⒉.编写响应函数(中间件)
3.监听端口
#### 启动服务器node app.js

### 搭建后台项目
#### 后台项目的目标
1.计算服务器处理请求的总耗时
⒉.在响应头上加上响应内容的mime类型
3.根据URL读取指定目录下的文件内容
#### 后台项目的实现步骤
##### 1.项目准备
1.安装包npm init -ynpm install koa
⒉.创建文件和目录结构
app.js   入口文件
data/
middleware/
koa_response_data.js    处理业务逻辑的中间件,读取某个json文件的数据
koa_response_duration.js   计算服务器消耗时长的中间件
koa_response_header.js   设置响应头的中间件
utils
file_utils.js   读取文件工具方法


##### ⒉总耗时中间件
1.第1层中间件
⒉计算执行时间
一进入时记录开始时间
其他所有中间件执行完后记录结束时间
两者相减
3.设置响应头
X-Response-Time:5ms


```javascript
// 1 计算服务器消耗时长的中间件
module.exports=async(ctx,next)=>{
// 记录开始时间
const start = Date.now();
// 让内层时间见得到执行
await next();
// 记录结束时间
const end = Date.now();
// 设置响应头
const duration = end-start;
// ctx.set 设置响应头
ctx.set('X-Responese-Time',duration+'ms');
}
```


##### 3.响应头中间件
1.第2层中间件
⒉.获取mime类型
application/json
3.设置响应头
const contentType='application/json; charset=utf-8';

```javascript
//设置响应头的中间件
module.exports=async(ctx,next)=>{
    const contentType='application/json; charset=utf-8';
    ctx.set('Content-Type',contentType);
    ctx.response.body='{"success":true}';
    await next();
}
```

##### 4.业务逻辑中间件

1.第3层中间件
⒉读取文件内容      http:/ /127.0.0.1:8888/apilseller
获取请求的路径,拼接文件路径
读取该路径对应文件的内容
3.设置响应体
ctx.response.body

![在这里插入图片描述](https://img-blog.csdnimg.cn/f31dbc9436494b4c901d08fec012ba08.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
> 接口路径总览

1.商家销量 /api/seller
2预算开销 /api/budget
3.库存信息 /api/stock
4.销量趋势 /api/trend
5.销量排行 /api/rank
6.商家分布/api/map
7.热销商品/api/hotproduct

##### 5.允许跨域
1.实际是通过Ajax访问服务器
2.同源策略
同协议\同域名\同端口
当前页面的地址和Ajax获取数据的地址
3.设置响应头
app.use(async (ctx, next) => {
ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT, POST, DELETE")
await next();
))


```javascript
//设置响应头的中间件
module.exports = async (ctx, next) => {
    const contentType = 'application/json; charset=utf-8';
    ctx.set('Content-Type', contentType);
    // ctx.response.body='{"success":true}';
    // ⭐⭐⭐ 跨域操作
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT, POST, DELETE");
    await next();
}

```

## 结合vue开发图表组件
### 项目地图
#### 前端项目准备
##### vue-cli搭建项目
npm install @vue/cli -g
vue create demo
选项

##### 删除无关代码
精简App.vue
删除HelloWorld.vue
删除Home.vue
精简routerrindex.js
##### 静态资源引入
staic放入public文件夹中
##### 项目基本配置
 1、前端项目端口配置
 2、自动打开浏览器
 通过Vue.config.js


```javascript
module.exports={
    devServer:{
        port:8999,  //端口号配置
        open:true    //自动打开浏览器
    }
}
```

##### 全局echarts对象挂载
![在这里插入图片描述](https://img-blog.csdnimg.cn/359724e2abf74e639a9ac6d6cc3da69d.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


##### axios封装与挂载
npm install axios

![在这里插入图片描述](https://img-blog.csdnimg.cn/d90d2efcb2a7407e9d6303e27c6ebb44.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
#### 单独图表组件开发
##### 1、商家销售统计(横向柱状图) 
###### 组件结构的设计
SellerPage.vue 测试使用,针对于路径/sellerpage而展示

Seller.vue 呈现图表的组件

###### 布局结构的设计
global全局样式以及在main中挂载引入
###### 图表基本功能的实现
>图表实现的一般步骤

initChart o初始化echartsInstance对象
getData e获取数据
updateChart 设置option   type类型bar


```javascript
<!-- 商家销量统计横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chartInstance: null,
      allData: null // 服务器返回数据
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },
  methods: {
    // 初始化echarts对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref)
    },
    // 获取服务器数据
    async getData () {
      // http://127.0.0.1:8888/api/seller
      const { data: ret } = await this.$http.get('seller')
      this.allData = ret
      this.updateChart()
    },
    // 更新图表
    updateChart () {
      const sellerNames = this.allData.map((item) => {
        return item.name
      })
      const sellerValues = this.allData.map((item) => {
        return item.value
      })
      const option = {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: sellerNames
        },
        series: {
          type: 'bar',
          data: sellerValues
        }
      }
      this.chartInstance.setOption(option)
    }
  }
}
```

###### 动态刷新的实现
>数据的处理 

从小到大排序 sort
每五个显示一页
currentPage
totalPage
![在这里插入图片描述](https://img-blog.csdnimg.cn/b2055d8403eb44719cb1b29cf16547eb.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

>启动和停止时机

启动
获取数据之后启动定时器
鼠标移除图表时启动定时器

停止
组件销毁时停止定时器
鼠标移入图表时启动定时器

定标识 
![在这里插入图片描述](https://img-blog.csdnimg.cn/4a4d06757e294e9090124a9236e2929b.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


>边界值处理
判断 currentPage是否大于totalPage
![在这里插入图片描述](https://img-blog.csdnimg.cn/8fede3e8bc5d4e00893f372ff2308d42.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_17,color_FFFFFF,t_70,g_se,x_16#pic_center)

###### uI的调整
> 主题的使用

引入主题js文件
init方法中指明主题的名称

> 图表的圆角

canvas标签增加 border-radius o }     canvas {border-radius: 20px;
>图表的标题

title相关
> 坐标轴的位置

grid相关
> 柱状图条目

宽度
文字
右边圆角
颜色渐变
背景

###### 拆分图表的option 
初始化配置jinitOption
获取数据之后的配置dataOption
分辨率适配的配置adapterOption
###### 分辨率适配
> 监听窗口大小变化事件

获取图表容器的宽度
设置新的option     标题文字大小    柱的宽度    柱的圆角    阴影背景的宽度
图表实例对象resize


##### 2、销量趋势图表(折线图) 
###### 通用代码结构和流程
 > 组件的结构

TrendPage.vue 测试使用,针对于路径/sellerpage而展示

Trend.vue 呈现图表的组件

> 代码流程结构

初始化图表对象initChart
获取数据getData
处理数据更新图表updateChart
分辨率适配

```javascript
<!-- 商家销量统计横向折线图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chartInstane: null,
      allData: null
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 初始化echarts对象
    initChart () {
      this.chartInstane = this.$echarts.init(this.$refs.trend_ref, 'chalk')
      // 对图表初始化配置控制
      const initOption = {
        title: {
          text: '| 商家销售量统计',
          left: 20,
          top: 20
        },
        grid: {
          top: '20%',
          left: '3%',
          bottom: '6%',
          right: '3%',
          containLabel: true // 距离包含坐标轴文字
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
          // data: sellerNames
        },
        // 背景
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2D3443'
            }
          }
        },
        series: {
          type: 'bar',
          // data: sellerValues,
          // 文字
          label: {
            show: true,
            position: 'right',
            textStyle: {
              color: 'white'
            }
          },
          itemStyle: {
            // 指明颜色渐变方向
            // 指明不同百分比下颜色值
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#5052EE'
              },
              {
                offset: 1,
                color: '#AB6EE5'
              }
            ])
          }
        }
      }
      this.chartInstance.setOption(initOption)
    },
    // 获取服务器数据
    async getData () {
      const { data: ret } = await this.$http.get('trend')
      // this.allData = ret
      console.log(ret)
    },
    // 更新图表
    updateChart () {
      const dataOption = {
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      const adapterOption = {}
      this.chartInstance.setOption(adapterOption)
      this.chartInstane.resize()
    }
  }
}
</script>

<style lang='less' scoped>
</style>

```

###### 图表基本功能实现

###### UI调整
主题的使用e init第二个参数
坐标轴大小设置 grid
紧挨边缘 boundaryGap
工具提示o tooltip
图例位置和形状 legend
区域面积 areaStyle
颜色渐变  LinearGradient
###### 切换图表
>布局和样式  

字体文件.
![在这里插入图片描述](https://img-blog.csdnimg.cn/f9656bf270c348e8b5abd4bfa200ad04.jpg#pic_center)
> 可选项的渲染

计算属性
数组filter方法

> 标题的设置

计算属性

> 点击箭头

v-on:click
v-show

> 点击可选条目

增加变量choiceType
隐藏可选项布局

![在这里插入图片描述](https://img-blog.csdnimg.cn/a38384c9ef9543a38b5571caeb9e7a55.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

###### 分辨率适配
![在这里插入图片描述](https://img-blog.csdnimg.cn/024c54823f8f48b69df991a214f50f41.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


##### 3、商家分布模块(地图+散点图) 
###### 通用代码结构和流程

```javascript
<!-- 商家分布模式（地图 散点图） -->
<template>
  <div class="com-container">
      地图组件
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      chartInstane: null,
      allData: null
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 初始化echarts对象
    async initChart () {
      this.chartInstane = this.$echarts.init(this.$refs.map_ref, 'chalk')
      // 获取中国数据矢量数据
      // http:// localhost:8999/static/map/china.json
      // 由于我们现在获取的地图矢量数据并不是位于KOA2的后台，所以咱们不能使用this. $http
      const ret = await axios.get('http://localhost:9000/static/map/china.json')
      this.$echarts.registerMap('china', ret.data)
      // 对图表初始化配置控制
      const initOption = {
        geo: {
          type: 'map',
          map: 'china'
        }
      }
      this.chartInstane.setOption(initOption)
    },
    // 获取服务器数据
    async getData () {
      this.updateChart()
    },
    // 更新图表
    updateChart () {
      const dataOption = {
      }
      this.chartInstane.setOption(dataOption)
    },
    screenAdapter () {
      const adapterOption = {}
      this.chartInstane.setOption(adapterOption)
      this.chartInstane.resize()
    }
  }
}
</script>

<style lang='less' scoped>
</style>

```

###### 显示地图
>获取中国地图矢量数据

>注册地图数据

>配置geo

![在这里插入图片描述](https://img-blog.csdnimg.cn/f3247d2c7c9d42f2ade5dd54a2ae25b6.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

###### 显示散点图
> 获取数据

lapi/map
> 处理数据

散点数据
图例数据
> 图表设置

配置series
1、type为effectScatter
2、coordinateSystem为geo

![在这里插入图片描述](https://img-blog.csdnimg.cn/553703e721b54805b16ee2bb375e7508.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

###### uI调整
> 主题的使用 init第二个参数

> 标题的显示 

title
> 地图位置和颜色

geo
geo.itemStyle
>图例的位置和方向 

legend

> 涟漪效果

rippleEffect.scale
rippleEffect.brushType
###### 分辨率适配
###### 地图点击事件 
> 点击事件的监听

ethis.chartlnstance.on('click',()=>0)
> 获取所点击省份的矢量地图数据

省份拼音的对照数据
得到所点击省份地图数据的路径

 > 显示省份

注册地图数据
配置geo
> 回到中国地图

配置geo  map:'china'


![在这里插入图片描述](https://img-blog.csdnimg.cn/ef9491b985e744659ad2d670126e7a30.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

优化
![在这里插入图片描述](https://img-blog.csdnimg.cn/797351b3d81b4258a3f8eee4ad1aac25.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


##### 4、销量排行模块(柱状图)
###### 通用代码结构和流程
RankPage.vue
Rank.vue

> 代码流程结构

初始化图表对象initChart

获取数据getData

处理数据更新图表updateChart

分辨率适配screenAdapter


```javascript
<!-- 销量排行模块 （柱状图） -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="rank_ref"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chartInstane: null,
      allData: null
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 初始化echarts对象
    initChart () {
      this.chartInstane =this.$echarts.init(this.$refs.rank_ref)
      const initOption = {}
      this.chartInstane.setOption(initOption)
    },
    // 获取服务器数据
    async getData () {
      // 获取服务器的数据，对this.allData进行赋值之后，调用updateChart方法更新图表
      this.updateChart()
    },
    // 更新图表
    updateChart () {
      const dataOption = {
      }
      this.chartInstane.setOption(dataOption)
    },
    screenAdapter () {
      const adapterOption = {}
      this.chartInstane.setOption(adapterOption)
      this.chartInstane.resize()
    }
  }
}
</script>

<style lang='less' scoped>
</style>

```

###### 图表基本功能实现
>数据的获取


> 数据的处理


> 图表的设置

![在这里插入图片描述](https://img-blog.csdnimg.cn/25d1600652a04577ac77da80fa4402a2.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

###### UI调整
>主题的使用   

init第二个参数
>标题的设置   

title
>坐标轴大小和位置 

grid

>工具提示 

etooltip

> 颜色设置

颜色渐变
不同数值显示不同的颜色
###### 平移动画的实现
> 数据处理

一次性展示10条数据   datazoom  startValue endValue  
每隔2秒向左移动一条数据  控制datazoom中  startValue 和endValue值  

![在这里插入图片描述](https://img-blog.csdnimg.cn/0fe4014670b54f33935141e6f609ced3.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_11,color_FFFFFF,t_70,g_se,x_16#pic_center)

 > 优化 去datazoom展示 以及边界值重置..


![在这里插入图片描述](https://img-blog.csdnimg.cn/82dcb353253b4fb394daac99829f2bfe.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_16,color_FFFFFF,t_70,g_se,x_16#pic_center)

> 按时平移动画   动画启动与停止

获取数据之后启动定时器
鼠标移出图标是启动
组件销毁停止
鼠标移入
![在这里插入图片描述](https://img-blog.csdnimg.cn/c14b70e65ea8474caead2b6be9235bfe.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_17,color_FFFFFF,t_70,g_se,x_16#pic_center)

###### 分辨率适配
> screenAdapter

标题的文字大小
柱的宽度
柱的圆角
![在这里插入图片描述](https://img-blog.csdnimg.cn/cc97ca7caa014c139c2954188a89f018.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

##### 5、热销商品占比模块(饼图)。
###### 通用代码结构和流程

```javascript
<!-- 热销商品占比模块(饼图) -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstane: null,
      allData: null,
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    // 初始化echarts对象
    initChart() {
      this.chartInstane = this.$echarts.init(this.$refs.hot_ref);
      const initOption = {
        series: {
          type: "pie",
        },
      };
      this.chartInstane.setOption(initOption);
    },
    // 获取服务器数据
    async getData() {
      // 获取服务器的数据，对this.allData进行赋值之后，调用updateChart方法更新图表
      const { data: ret } = await this.$http.get("hotproduct");
      this.allData = ret;
      console.log(ret);
      this.updateChart();
    },
    // 更新图表
    updateChart() {
      const legendData = this.allData[0].children.map((item) => {
        return item.name;
      });
      const seriesData = this.allData[0].children.map((item) => {
        return {
          name: item.name,
          value: item.value,
        };
      });
      const dataOption = {
        legend: {
          data: legendData,
        },
        series: [
          {
            data: seriesData,
          },
        ],
      };
      this.chartInstane.setOption(dataOption);
    },
    screenAdapter() {
      const adapterOption = {};
      this.chartInstane.setOption(adapterOption);
      this.chartInstane.resize();
    },
  },
};
</script>

<style lang='less' scoped>
</style>
```

###### 图表基本功能实现
> 数据的获取

elapi/hotproduct          获取到的是三个类别下所有分类的数据

> 数据的处理

饼图的数据
name
value

图例的数据
> 图表的设置 

type类型为pie
###### 切换数据的实现。

> 点击事件处理
![在这里插入图片描述](https://img-blog.csdnimg.cn/fe022a77b6dd4b21baadcb3b53be1cf9.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
改变currentIndex    分类名称  计算属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/326dd83cc8784ac5b3ba6925677f2242.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_19,color_FFFFFF,t_70,g_se,x_16#pic_center)


###### uI调整
> 主题的使用


> 箭头和分类名称的颜色标题的设置

![在这里插入图片描述](https://img-blog.csdnimg.cn/09937ec55e504596825a219af8036aff.jpg#pic_center)

> 高亮状态显示文字
默认不显示
![在这里插入图片描述](https://img-blog.csdnimg.cn/9606fcbc3e0347fdbd2828a634836bb1.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_18,color_FFFFFF,t_70,g_se,x_16#pic_center)

> 图例的形状和位置

![在这里插入图片描述](https://img-blog.csdnimg.cn/b6252f98dab1433e99e05513ea255396.jpg#pic_center)



> 工具提示
![在这里插入图片描述](https://img-blog.csdnimg.cn/8938161a00cd4e508065365836015b7e.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


###### 分辨率适配由
>标题的文字大小


> 饼图的大小


> 图例的大小


> 箭头和分作名称的大小

![在这里插入图片描述](https://img-blog.csdnimg.cn/bf0544c48bd449d0a0ba258f5501ef0f.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

##### 6、库存与销量模块(圆环饼图) 
###### 通用代码结构和流程
###### 图表基本功能的实现
![在这里插入图片描述](https://img-blog.csdnimg.cn/6123d267f200467abb78169c592a9d8e.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

```javascript
<!-- 6、库存与销量模块(圆环饼图)  -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="stock_ref"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstane: null,
      allData: null,
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    // 初始化echarts对象
    initChart() {
      this.chartInstane = this.$echarts.init(this.$refs.stock_ref, "chalk");
      const initOption = {
        series: {
          type: "pie",
        },
      };
      this.chartInstane.setOption(initOption);
    },
    // 获取服务器数据
    async getData() {
      // 获取服务器的数据，对this.allData进行赋值之后，调用updateChart方法更新图表
      const { data: ret } = await this.$http.get("stock");
      this.allData = ret;
      console.log(ret);
      this.updateChart();
    },
    // 更新图表
    updateChart() {
      // 每个饼图坐标
      const centerArr = [
        ["18%", "40%"],
        ["50%", "40%"],
        ["82%", "40%"],
        ["34%", "75%"],
        ["66%", "75%"],
      ];
      // 处理图标需要的数据
      const showData = this.allData.slice(0, 5);
      const seriesArr = showData.map((item, index) => {
        return {
          type: "pie",
          radius: [110, 100],
          center: centerArr[index],
          data: [
            {
              value: item.sales,
            },
            {
              value: item.stock,
            },
          ],
        };
      });
      const dataOption = {
        series: seriesArr,
      };
      this.chartInstane.setOption(dataOption);
    },
    screenAdapter() {
      const adapterOption = {};
      this.chartInstane.setOption(adapterOption);
      this.chartInstane.resize();
    },
  },
};
</script>

<style lang='less' scoped>
</style>
```

###### uI调整
>主题的使用


> 标题的设置



> 鼠标动画的移除


> 指示线移除


>圆环内文字的显示




>颜色设置
###### 切换动画

> 数据处理

currentIndex 标识当前的页数
每一页显示5个圆环
>启动和停止时机

启动
获取数据之后启动定时器
鼠标移出图表时启动定时器

停止
组件销毁时停止定时器
鼠标移入图表时停止定时器
> 边界值处理

判断currentIndex是否大于1




![在这里插入图片描述](https://img-blog.csdnimg.cn/9da5e63b422a4b0b9e81c9884bd6e0c9.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
.
###### 分辨率适配
> screenAdapter

标题的文字大小
圆环半径
圆环文字
## websocket实现数据推送
保证数据更新实时性
### websocket基本使用
#### 前端
##### 创建对象

```javascript
ws = new WebSocket('ws://localhost:9998')
```
WebSocket是window对象就提供了的,因此不需要额外的包
##### 监听事件
###### 连接成功事件

```javascript
ws.onopen
```

###### 接收数据事件

```javascript
ws.onmessage
```

###### 关闭连接事件

```javascript
ws.onclose
```

##### 发送数据

```javascript
ws.send
```


#### 后端
##### 安装包
npm i ws -S
#### 创建对象

```javascript
const webSocket = require('ws')
// 创建websocket服务端对象，绑定端口号9998
const wss = new webSocket.Server({
    port: 9998
})
```

##### 监听事件
###### 连接事件

```javascript
wss.on("connection", client => {
	console.log("有客户端连接.….")
	})
```

###### 接收数据事件

```javascript
// 对客户端连接事件进行监听
//client：代表时客户端的连接socket对象
wss.on('connection',client =>{
    console.log('有客户端连接成功了。。。');
    //对客户端的连接对象进行message事件的监听
    //msg:由客户端发给服务端的数据
    client.on('message',msg=>{
        console.log('客户端发送数据给服务端了: ' + msg);
        //由服务端向客户端发送数据
        client.send('hello')
    })
})
```

##### 发送数据
```javascript
client.send('hello')
```


#### 案例：
##### 前端

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <button id="connect">连接</button>
    <button id="send" disabled='true'>发送数据</button><br>
    从服务端接收数据如下：<br>
    <span id="recv"></span>
    <script>
        var connect = document.querySelector('#connect')
        var send = document.querySelector('#send')
        var recv = document.querySelector('#recv')
        let ws = null
        connect.onclick = function () {
            ws = new WebSocket('ws://localhost:9998')
            ws.onopen = () => {
                console.log('连接服务端成功。。。');
                send.disabled=false
            }
            ws.onclose = () => {
                console.log('连接服务器失败');
                send.disabled=true
            }
            ws.onmessage = msg => {
                console.log('接收到从服务端发送过来的数据了');
                console.log(msg);
                recv.innerHTML=msg.data
            }
        }
        send.onclick = function () {
            ws.send('hello')
        }
    </script>
</body>

</html>
```
##### 后端

```javascript
const webSocket = require('ws')
// 创建websocket服务端对象，绑定端口号9998
const wss = new webSocket.Server({
    port: 9998
})
// 对客户端连接事件进行监听

//client：代表时客户端的连接socket对象
wss.on('connection', client => {
    console.log('有客户端连接成功了。。。');
    //对客户端的连接对象进行message事件的监听
    //msg:由客户端发给服务端的数据
    client.on('message', msg => {
        console.log('客户端发送数据给服务端了: ' + msg);
        //由服务端向客户端发送数据
        client.send('hello')
    })
})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/3c78174681584155a50392a8b927801b.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 使用websocket改造项目

#### 前端工程
##### 创建socket_service.js
###### 定义类SocketService,并定义成单例设计模式
![在这里插入图片描述](https://img-blog.csdnimg.cn/6c94fa04d50847aa8c99a94d9215e19e.jpg#pic_center)

###### 定义连接服务器的方法connect 
>创建webSocket对象,对服务器进行连接
![在这里插入图片描述](https://img-blog.csdnimg.cn/92101e0b63514dba93f697ed5a5aaffc.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


>在main.js中调用此方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/472f35fc33464649acac57cb362a944d.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


###### 监听事件
>onopen


>onmessage


>onclose


![在这里插入图片描述](https://img-blog.csdnimg.cn/048b8349591d42d58dcddfa3eb0d7435.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

###### 存储回调函数
>  callBackMapping = {}


>registerCallBack(socketType, callBack) {}

> unRegisterCallBack(socketType) {}

![在这里插入图片描述](https://img-blog.csdnimg.cn/80127480744e40bb984d8fb954e5c033.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_17,color_FFFFFF,t_70,g_se,x_16#pic_center)

###### 接收数据的处理
>onmessage 

调用之气那存储得回调函数，传递数据
if action===getdata  后面转对象realData.data改为recvData.data  ⭐⭐⭐错误
![在这里插入图片描述](https://img-blog.csdnimg.cn/5f1cb4fd44834b178e5202fd96bf6020.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

###### 定义发送数据的方法

```javascript
send(data){
        this.ws.send(JSON.stringify(data))
    }
```

###### 挂载SocketService对象到vue的原型对象上 

```javascript
// 其他组件  this.$socket 调用里面得方法
Vue.prototype.$socket= SocketService.Instance
```
方便各个组件使用
##### 组件的改造

>created    

注册回调函数


>destroyed  

取消回调函数



>在原来获取数据的地方,改为发送数据
.

数据的格式需要满足约定形式
![在这里插入图片描述](https://img-blog.csdnimg.cn/6f01d6000d9d429bbfb61e82457265c4.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

##### 报错   需优化
![在这里插入图片描述](https://img-blog.csdnimg.cn/bb618a62537c4ab0b6658a28c36d35a6.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

##### 优化 

> 重发数据机制



![在这里插入图片描述](https://img-blog.csdnimg.cn/3509d4fff84c4bc09822ef8cd296180a.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/7679064a390f40298958d40d6b3310f7.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)





> 断开重连机制



![在这里插入图片描述](https://img-blog.csdnimg.cn/2247a53906e44b90892231cfc3a31839.jpg#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/68f15f369859426dabd2a05187e7b664.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


#### 后端工程

##### 创建web_socket_service
###### 创建Socket服务端对象,绑定端口
###### 监听事件
>connection


>message


###### 将监听事件的代码放到一个函数中,并将这个函数导出

##### 服务端接收数据字段约定

```javascript
{
"action": "getData",
"socketType": "trendData",
"chartIame": "trend",
"value":""
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/83668a2bcc644b5a8161913f838ba3b1.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

##### 服务端发送数据字段约定
![在这里插入图片描述](https://img-blog.csdnimg.cn/2c54ca1cc91a43c9890a516e7430935b.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


## 主题切换\页面合并\全屏切换
###  主题切换
#### 数据的存储
vuex   state theme
mutation  changeTheme

![在这里插入图片描述](https://img-blog.csdnimg.cn/39a8143c54664558ac94f9de2a537e95.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_18,color_FFFFFF,t_70,g_se,x_16#pic_center)

#### 点击切换按钮,修改Vuex中的theme数据

```javascript
this.$store.commit('changeTheme')
```

#### 各个组件监听theme的变化
##### 映射属性

```javascript
import { mapState } from "vuex";
```

```javascript
 computed: {
    ...mapState(["theme"]),
  },
```

##### 监听属性

```javascript
watch() {
    console.log("主题切换");
    this.chartInstance.dispose(); //销毁当前图表
  },
```

##### 完成主题切换
###### 当前图表销毁
###### 重新初始化图表对象
>init函数的第二个参数需要变成主题的名称


>publicindex.html需要先将所有主题引入

```javascript
watch() {
    console.log("主题切换");
    this.chartInstance.dispose(); //销毁当前图表
  },
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9de7884ef83b40e4adf496820a8fdd16.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


###### 完成屏幕适配

```javascript
  watch() {
    console.log("主题切换");
    this.chartInstance.dispose(); //销毁当前图表
    this.initChart(); //重新以新主题名称初始化图标对象
    this.screennAdapter(); //完成屏幕适配·
    this.updateChart(); //更新图表的展示
  },
```

###### 更新图表显示
#### 特殊处理

![在这里插入图片描述](https://img-blog.csdnimg.cn/121b69710a23412bb7c7e396045d7e23.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA56eD5aS055S356We,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

```javascript
const theme = {
  chalk: {
    // 背景颜色
    backgroundColor: '#161522',
    // 标题的文字颜色
    titleColor: '#ffffff',
    // 左上角logo的图标路径
    logoSrc: 'logo_dark.png',
    // 切换主题按钮的图片路径
    themeSrc: 'qiehuan_dark.png',
    // 页面顶部的边框图片
    headerBorderSrc: 'header_border_dark.png'

  },
  vintage: {
    // 背景颜色
    backgroundColor: '#eeeeee',
    // 标题的文字颜色
    titleColor: '#000000',
    // 左上角logo的图标路径
    logoSrc: 'logo_light2.png',
    // 切换主题按钮的图片路径
    themeSrc: 'qiehuan_light.png',
    // 页面顶部的边框图片
    headerBorderSrc: 'header_border_light.png'
  }
}

export function getThemeValue (themeName) {
  return theme[themeName]
}

```

```javascript
import { getThemeValue } from "@/utils/theme_utils";
```

```javascript
color:getThemeValue(this.theme).titleColor
```

#### 联动效果

### 页面组件合并
#### 创建screenPage.vue,并配置路由规则

#### 创建布局和样式

#### 注册组件,并将组件置于合适位置

#### 调整原有组件样式



###  全屏切换

#### 布局样式的调整
#### 全屏状态数据的定义

```javascript
// 定义每一个图表的全屏状态
      fullScreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false,
      },
```

#### 全屏状态样式的定义

```javascript
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}
```

#### 全屏图标的处理
#### 点击事件的处理
![在这里插入图片描述](https://img-blog.csdnimg.cn/e153fbd868fb4197a1144840a205d84d.jpg#pic_center)

#### 联动效果
##### 发送全屏数据给服务器
服务器在收到这个数据时，会转发给每一个处于连接状态的客户端
##### ScreenPage.vue中
created 
注册回调
destroyed 
取消回调
recvData
接收到数据







