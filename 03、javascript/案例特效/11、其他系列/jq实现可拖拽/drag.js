    /*
      dragObj:  拖拽对象
      parent: 指定区域           
    */
    
    function dragFn (dragObj,parent) {
      $(dragObj).mousedown(function (e) {
        var _this = $(this)
        var parent_h = $(parent)[0].offsetHeight
            parent_w = $(parent)[0].offsetWidth
            drag_h = $(this)[0].offsetHeight
            drag_w = $(this)[0].offsetWidth
        var dragX = e.clientX - $(this)[0].offsetLeft
        var dragY = e.clientY - $(this)[0].offsetTop
        
        // 当前拖拽对象层级优先
        $(this).css('z-index','9').siblings().css('z-index','1')

        $(document).mousemove(function (e) {
          var l = e.clientX - dragX
          var t = e.clientY - dragY
          if (l < 0) {
            l = 0
          } else if (l > parent_w - drag_w) {
            l = parent_w - drag_w
          }
          if (t < 0) {
            t = 0
          } else if (t > parent_h - drag_h) {
            t = parent_h - drag_h
          }
          _this.css({
            left: l + 'px',
            top: t + 'px',
          })
        })
      })
      $(document).mouseup(function () {
        $(this).off('mousemove')
      })
    }