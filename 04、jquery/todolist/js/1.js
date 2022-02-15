/*
 * @Author: your name
 * @Date: 2022-01-17 20:15:57
 * @LastEditTime: 2022-01-17 20:50:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /GitHub/Full-stack/04、jquery/案例/todolist/js/1.js
 */
$(function(){
  load();
  $("#title").on('keydown',function(event){
    if(event.keyCode === 13){
      if($(this).val()===""){
        alert('请输入您要的操作');
      }else{
        var local = getDate();
        local.push({title:$(this).val(),done:false});
        saveDate(local);
        load();
        $(this).val("");
      }
    }
// 渲染加载数据
function load(){
  var data = getDate(); 
}

  })

function getDate(){
  var data = localStorage.getItem('todolist')
  if(data!== null){
    return JSON.parse(data);
  }else{
    return [];
  }
}
function saveDate(data){
  localStorage.setItem()
}

})
