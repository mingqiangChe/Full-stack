var num1 = 2;
var num2 = 0;
var start1 = null;
var start2 = null;
var start3 = null;
var start4 = null;
var start5 = null;
var start6 = null;
var start7 = null;
var start8 = null;

function door() {
	switch (num1) {
		case 0:
			document.getElementById("music2").play();
			document.getElementById("textz").style.width = "400px";
			num1 = 3;
			document.getElementById("door").style.transform = "rotateY(-90deg)";
			document.getElementById("door_down").style.boxShadow = "0px 0px 1000px 500px #fff";
			document.getElementById("door_box").style.zIndex = "1";
			start8 = setInterval(ps1, 3000);
			break;
		case 1:
			document.getElementById("music3").play();
			document.getElementById("door").style.transform = "rotateY(0deg)";
			document.getElementById("door_down").style.boxShadow = "0px 0px 10px 0px white";
			document.getElementById("door").style.backgroundColor = "white";
			start1 = setInterval(closeDoor, 2000);
			var str = '';
			for (var i = 0; i < 8; i++) {
				str += '<div id="ts' + i +
					'" style="width:0px;height:0px;border:20px solid black;position:absolute;top:50%;left:50%;transition:2s;opacity:0;text-align:center;font-size:60px;line-height: 100vh;z-index: 1;"><b>' +
					(7 - i) + '</b></div>';
				document.getElementById("texts").innerHTML = str;
			}
			num1 = 4;
			start3 = setInterval(closeStart2, 5000);
			break;
		case 2:
			document.getElementById("textz").style.width = "400px";
			document.getElementById("door_all").style.top = "20%";
			document.getElementById("door_all").style.width = "20%";
			document.getElementById("door_all").style.height = "60%";
			num1 = 0;
			start7 = setInterval(ps, 3000);
			break;
		case 3:
			document.getElementById("textz").style.width = "400px";
			document.getElementById("textp").style.zIndex = "0";
			document.getElementById("woman").style.top = "60%";
			document.getElementById("woman").style.left = "50%";
			num1 = 1;
			start4 = setInterval(closedoor, 1000);
			break;
		case 4:
			break;
	}
}

function ps() {
	document.getElementById("textz").style.width = "0px";
	document.getElementById("textp").innerHTML = "门的背后是未知，要...开门吗";
	clearInterval(start7);
}

function ps1() {
	document.getElementById("textz").style.width = "0px";
	document.getElementById("textp").style.color = "black";
	document.getElementById("textp").style.zIndex = "2";
	document.getElementById("textp").innerHTML = "要...进去吗？也许是恐惧，也许是可怕的东西的在后面...";
	clearInterval(start8);
}

function starts() {
	kaishi();
	document.getElementById("start").style.height = "0vh";
	document.getElementById("textpp").style.display = "none";
}
var num3 = 0;

function closedoor() {
	num3++;
	if (num3 == 3) {
		door();
		clearInterval(start4);
	}
}

function closeDoor() {
	num2++;
	var body_w = document.getElementById("all").offsetWidth;
	var body_h = document.getElementById("all").offsetHeight;
	var b1_x = Math.ceil(document.getElementById("door_all").getBoundingClientRect().left);
	var b1_y = Math.ceil(document.getElementById("door_all").getBoundingClientRect().top);
	document.getElementById("door_all").style.width = "100%";
	document.getElementById("door_all").style.height = "200%";
	document.getElementById("door_all").style.left = "-1%";
	document.getElementById("door_all").style.top = "-50%";
	if (num2 == 2) {
		clearInterval(start1);
	}
}

var tnum = 0;

function texts() {
	if (start3 != null) {
		clearInterval(start3);
		start3 = null;
	}
	if (tnum != 0) {
		document.getElementById("ts" + (tnum - 1)).innerHTML = '';
	}
	if (tnum == 7) {
		document.getElementById("ts" + tnum).innerHTML =
			'<iframe id="frame" src="lover.html" frameborder="0" width="100%" height="100%"></iframe>';
	}
	document.getElementById("ts" + tnum).style.width = "99%";
	document.getElementById("ts" + tnum).style.height = "99%";
	document.getElementById("ts" + tnum).style.top = "-1%";
	document.getElementById("ts" + tnum).style.left = "-1%";
	document.getElementById("ts" + tnum).style.opacity = "1";
	tnum++;
	if (tnum == 8) {
		document.getElementById("ts7").style.borderWidth = "0px";
		document.getElementById("ts7").style.width = "101%";
		document.getElementById("ts7").style.height = "102%";
		clearInterval(start2);
		document.getElementById("music").pause();
		document.getElementById("music").src="music/浪漫表白钢琴配乐.mp3";
		document.getElementById("music").play();
	}
}

function closeStart2() {
	start2 = setInterval(texts, 1000);
}
//f11效果
function kaishi() {
	document.getElementById("music").play();
	var docElm = document.documentElement;
	//W3C   
	if (docElm.requestFullscreen) {
		docElm.requestFullscreen();
	}
	//FireFox   
	else if (docElm.mozRequestFullScreen) {
		docElm.mozRequestFullScreen();
	}
	//Chrome等   
	else if (docElm.webkitRequestFullScreen) {
		docElm.webkitRequestFullScreen();
	}
	//IE11   
	else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	}
}

var startss = null;

function coordinate(event) {
	startss = setInterval(clickxgt);
	var x = event.clientX;
	var y = event.clientY;
	document.getElementById("dibu").innerHTML = "<div class='ys' id='ys' style='top: " + y + "px;left: " + x +
		"px;'></div>";
}

function clickxgt() {
	clearInterval(startss);
	document.getElementById("ys").style.width = "100px";
	document.getElementById("ys").style.height = "100px";
	document.getElementById("ys").style.top = document.getElementById("ys").offsetTop - 50 + "px";
	document.getElementById("ys").style.left = document.getElementById("ys").offsetLeft - 50 + "px";
	document.getElementById("ys").style.opacity = "0";
}
