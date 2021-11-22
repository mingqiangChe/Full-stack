// 屏幕滚动
function scroll(){
	if(window.pageXOffset!=undefined){
		return {
			"left":window.pageXOffset,
			"top":window.pageYOffset
		}
	}else if(document.compatMode!='BackCompat'){
		return {
			"left":document.body.scrollLeft,
			"top":document.body.scrollTop
		}
	}else {
		return {
			"left":document.documentElement.scrollLeft,
			"top":document.documentElement.scrollTop
		}
	}
}
