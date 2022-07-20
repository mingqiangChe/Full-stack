# vue 项目功能点实现方案

radio 下拉框等组件的绑定需要改成动态的：value
form 表单如果循环渲染 那么可以将 form 表单绑定值为 item
定制下拉框展示 可以在下拉框属性 :value 中绑定 “ ‘${item.value}(${item.label})‘ ” 类似这种格式
