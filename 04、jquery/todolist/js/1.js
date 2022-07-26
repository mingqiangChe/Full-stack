$(function () {
  load()
  $("#title").on("keydown", function (event) {
    if (event.keyCode === 13) {
      if ($(this).val() === "") {
        alert("请输入您要的操作")
      } else {
        var local = getDate()
        local.push({ title: $(this).val(), done: false })
        saveDate(local)
        load()
        $(this).val("")
      }
    }
    // 渲染加载数据
    function load() {
      var data = getDate()
    }
  })

  function getDate() {
    var data = localStorage.getItem("todolist")
    if (data !== null) {
      return JSON.parse(data)
    } else {
      return []
    }
  }
  function saveDate(data) {
    localStorage.setItem()
  }
})
