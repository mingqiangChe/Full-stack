const oneOppoMenu = function () {
  this.event()
}
oneOppoMenu.prototype.event = function () {
  window.addEventListener("click", function (e) {
    console.log(e)
  })
}
new oneOppoMenu()
