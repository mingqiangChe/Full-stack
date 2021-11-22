var allnum = 0;

function bodys() {
	switch (allnum) {
		case 0:
			text2();
			start2 = setInterval(man, 1000);
			start4 = setInterval(bird1, 2000);
			document.getElementById("texts1").style.opacity = "0";
			allnum = 1;
			break;
		case 1:
			sediao();
			start16 = setInterval(sediaoss, 500);
			start17 = setInterval(bodys, 2000);
			allnum = 2;
			break;
		case 2:
			start15 = setInterval(sediaos2, 30);
			clearInterval(start17);
			allnum = 3;
			setInterval(kks, 1500);
			break;
		case 3:

			break;
	}
}
var xgnum = 0;
var xgcount = 0;
var start1 = setInterval(xgCount, 1000);
var start2 = null;
var start3 = setInterval(woman, 2000);
var start4 = null;
var start5 = null;
var start6 = null;
var start7 = null;
var start9 = null;
var start10 = null;
var start11 = null;
var start12 = null;
var start13 = null;
var start14 = null;
var start15 = null;
var start16 = null;
var start17 = null;

function xg() {
	if (xgnum == 0) {
		document.getElementById("xg").style.left = "-7%";
		document.getElementById("xg").style.top = "25%";
		xgnum = 1;
	} else {
		document.getElementById("xg").style.left = "101%";
		document.getElementById("xg").style.top = "2%";
		xgnum = 0;
	}
}
setInterval(xg, 5000);

function xgCount() {
	xgcount++;
	if (xgcount == 7) {
		document.getElementById("xg").style.display = "none";
	}
	if (xgcount == 14) {
		document.getElementById("xg").style.display = "block";
	}
	if (xgcount == 20) {
		document.getElementById("xg").style.display = "none";
	}
	if (xgcount == 24) {
		document.getElementById("xg").style.display = "block";
		xgcount = 14;
	}
}
var birdnum = 0;
var deg1 = 0;
var deg2 = 0;
var birdnum1 = 0;

function bird() {
	if (birdnum == 0) {
		document.getElementById("bird").style.transform = "rotateX(0deg)";
		document.getElementById("woman").style.transform = "rotateZ(-2deg)";
		birdnum = 1;
	} else {
		document.getElementById("bird").style.transform = "rotateX(45deg)";
		document.getElementById("woman").style.transform = "rotateZ(2deg)";
		birdnum = 0;
	}
}
var start8 = setInterval(bird, 1000);

function man() {
	deg1 += 80;
	deg1 += 110;
	document.getElementById("man").style.opacity = "1";
	document.getElementById("manq1").style.transform = "rotateZ(" + deg1 + "deg)";
	document.getElementById("manq2").style.transform = "rotateZ(-" + deg1 + "deg)";
}

function bird1() {
	birdnum1++;
	document.getElementById("bird").style.width = "60px";
	document.getElementById("bird").style.height = "60px";
	document.getElementById("flower").style.width = "30px";
	if (birdnum1 == 2) {
		document.getElementById("bird").style.width = "0px";
		document.getElementById("bird").style.height = "0px";
		clearInterval(start4);
		man1();
		start5 = setInterval(man2, 5000);
		start14 = setInterval(text2s, 200);
		start6 = setInterval(man2count, 1000);
	}
}
var womannum = 0;

function woman() {
	womannum++;
	document.getElementById("woman").style.left = "80%";
	if (womannum == 2) {
		clearInterval(start3);
	}
}

function man1() {
	document.getElementById("man").style.top = "18%";
	document.getElementById("man").style.left = "37%";
	document.getElementById("manhand").style.transform = "rotateZ(-30deg)";
	document.getElementById("manhand").style.width = "60px";
	document.getElementById("flower").style.transform = "rotateZ(0deg)";
}
var man2num = 0;

function man2() {
	document.getElementById("man").style.top = "85%";
	document.getElementById("man").style.left = "40%";
	document.getElementById("flower").style.transition = "5s";
	document.getElementById("flower").style.top = "84%";
	document.getElementById("flower").style.left = "44%";
}

function man2count() {
	man2num++;
	if (man2num == 5) {
		clearInterval(start5);
	}
	if (man2num == 6) {
		clearInterval(start6);
		clearInterval(start2);
		document.getElementById("manq1").style.opacity = "0";
		document.getElementById("manq2").style.opacity = "0";
		start7 = setInterval(man3, 1000);
	}
}
var man3num = 0;
var man3num1 = 0;

function man3() {
	man3num1++;
	if (man3num == 0) {
		document.getElementById("man").style.transform = "rotateZ(-2deg)";
		man3num = 1;
	} else {
		document.getElementById("man").style.transform = "rotateZ(2deg)";
		man3num = 0;
	}
	if (man3num1 == 5) {
		document.getElementById("man").style.left = "70%";
		document.getElementById("flower").style.left = "74%";
	}
	if (man3num1 == 10) {
		clearInterval(start7);
		document.getElementById("man").style.transform = "rotateZ(15deg)";
		document.getElementById("flower").style.transform = "rotateZ(15deg)";
		document.getElementById("flower").style.transformOrigin = "bottom";
		document.getElementById("flower").style.left = "77%";
		document.getElementById("man").style.transition = " all 2s linear";
		document.getElementById("flower").style.transition = "all 2s linear";
		woman1();
	}
}

function woman1() {
	document.getElementById("womanhand").style.width = "60px";
	clearInterval(start8);
	start9 = setInterval(flower1, 1000);
}
var flower1num = 0;
var deg3 = 0;

function flower1() {
	flower1num++;
	deg3 += 90;
	document.getElementById("flower").style.transition = "all 5s linear";
	if (flower1num > 4) {
		document.getElementById("flower").style.transformOrigin = "center";
		document.getElementById("flower").style.transform = "rotateZ(" + deg3 + "deg)"
		document.getElementById("flower").style.top = "15%";
		document.getElementById("flower").style.opacity = "0";
	}
	if (flower1num == 9) {
		rdmnum();
		document.getElementById("fireworks").style.opacity = "1";
		document.getElementById("heart").style.opacity = "1";
	}
	if (flower1num > 9) {
		twyuan();
		fireworks();
		document.getElementById("twyuan0").style.transform = "rotateZ(" + rdmnum1 + "deg)";
		document.getElementById("twyuan1_0").style.transform = "rotateZ(" + rdmnum2 + "deg)";
		document.getElementById("twyuan2_0").style.transform = "rotateZ(" + rdmnum3 + "deg)";
		document.getElementById("twyuan3_0").style.transform = "rotateZ(" + rdmnum4 + "deg)";
		document.getElementById("twyuan4_0").style.transform = "rotateZ(" + rdmnum5 + "deg)";
		document.getElementById("twyuan5_0").style.transform = "rotateZ(" + rdmnum6 + "deg)";
		clearInterval(start9);
		strat10 = setInterval(twyuan2, 1000);
		document.getElementById("heart").style.top = "70%";
		hearts();
		start12 = setInterval(heartss, 1000);
	}
}

function fireworks() {
	for (var i = 0; i < 10; i++) {
		document.getElementById("twyuan4_" + i).innerHTML = '<div class="twyuan4_' + (i + 1) + '" id="twyuan4_' + (i + 1) +
			'" style="width: ' + (11 - i) + 'px;height: ' + (11 - i) +
			'px;border-radius: 50%;position: relative;top: 3px;background: #44ff00;transition: all 1s linear;"></div>';
		document.getElementById("twyuan3_" + i).innerHTML = '<div class="twyuan3_' + (i + 1) + '" id="twyuan3_' + (i + 1) +
			'" style="width: ' + (11 - i) + 'px;height: ' + (11 - i) +
			'px;border-radius: 50%;position: relative;top: 3px;background: orange;transition: all 1s linear;"></div>';
		document.getElementById("twyuan2_" + i).innerHTML = '<div class="twyuan2_' + (i + 1) + '" id="twyuan2_' + (i + 1) +
			'" style="width: ' + (11 - i) + 'px;height: ' + (11 - i) +
			'px;border-radius: 50%;position: relative;top: 3px;background: red;transition: all 1s linear;"></div>';
		document.getElementById("twyuan1_" + i).innerHTML = '<div class="twyuan1_' + (i + 1) + '" id="twyuan1_' + (i + 1) +
			'" style="width: ' + (11 - i) + 'px;height: ' + (11 - i) +
			'px;border-radius: 50%;position: relative;top: 3px;background: aqua;transition: all 1s linear;"></div>';
		document.getElementById("twyuan" + i).innerHTML = '<div class="twyuan' + (i + 1) + '" id="twyuan' + (i + 1) +
			'" style="width: ' + (11 - i) + 'px;height: ' + (11 - i) +
			'px;border-radius: 50%;position: relative;top: 3px;background: pink;transition: all 1s linear;"></div>';
		document.getElementById("twyuan5_" + i).innerHTML = '<div class="twyuan5_' + (i + 1) + '" id="twyuan5_' + (i + 1) +
			'" style="width: ' + (11 - i) + 'px;height: ' + (11 - i) +
			'px;border-radius: 50%;position: relative;top: 3px;background: #ffff00;transition: all 1s linear;"></div>';
	}
}
var rdmnum1x = 0;
var rdmnum1y = 0;
var rdmnum1 = 0;
var rdmnum2x = 0;
var rdmnum2y = 0;
var rdmnum2 = 0;
var rdmnum3x = 0;
var rdmnum3y = 0;
var rdmnum3 = 0;
var rdmnum4x = 0;
var rdmnum4y = 0;
var rdmnum4 = 0;
var rdmnum5x = 0;
var rdmnum5y = 0;
var rdmnum5 = 0;
var rdmnum6x = 0;
var rdmnum6y = 0;
var rdmnum6 = 0;

function rdmnum() {
	rdmnum1 = Math.round(Math.random() * 360);
	rdmnum2 = Math.round(Math.random() * 360);
	rdmnum3 = Math.round(Math.random() * 360);
	rdmnum4 = Math.round(Math.random() * 360);
	rdmnum5 = Math.round(Math.random() * 360);
	rdmnum6 = Math.round(Math.random() * 360);
	if (rdmnum1 <= 90) {
		rdmnum1x = Math.round(100 * Math.cos((90 - rdmnum1) * Math.PI / 180));
		rdmnum1y = Math.round(Math.sqrt(10000 - rdmnum1x * rdmnum1x));
	}
	if (rdmnum1 <= 180 && rdmnum1 > 90) {
		rdmnum1x = Math.round(100 * Math.cos((rdmnum1 - 90) * Math.PI / 180));
		rdmnum1y = Math.round(Math.sqrt(10000 - rdmnum1x * rdmnum1x));
		rdmnum1y = '-' + rdmnum1y;
	}
	if (rdmnum1 <= 270 && rdmnum1 > 180) {
		rdmnum1x = Math.round(100 * Math.cos((270 - rdmnum1) * Math.PI / 180));
		rdmnum1y = Math.round(Math.sqrt(10000 - rdmnum1x * rdmnum1x));
		rdmnum1x = '-' + rdmnum1x;
		rdmnum1y = '-' + rdmnum1y;
	}
	if (rdmnum1 <= 360 && rdmnum1 > 270) {
		rdmnum1x = Math.round(100 * Math.cos((rdmnum1 - 270) * Math.PI / 180));
		rdmnum1y = Math.round(Math.sqrt(10000 - rdmnum1x * rdmnum1x));
		rdmnum1x = '-' + rdmnum1x;
	}
	//
	if (rdmnum2 <= 90) {
		rdmnum2x = Math.round(100 * Math.cos((90 - rdmnum2) * Math.PI / 180));
		rdmnum2y = Math.round(Math.sqrt(10000 - rdmnum2x * rdmnum2x));
		rdmnum2y -= 12;
	}
	if (rdmnum2 <= 180 && rdmnum2 > 90) {
		rdmnum2x = Math.round(100 * Math.cos((rdmnum2 - 90) * Math.PI / 180));
		rdmnum2y = Math.round(Math.sqrt(10000 - rdmnum2x * rdmnum2x));
		rdmnum2y -= 12;
		rdmnum2y = '-' + rdmnum2y;
	}
	if (rdmnum2 <= 270 && rdmnum2 > 180) {
		rdmnum2x = Math.round(100 * Math.cos((270 - rdmnum2) * Math.PI / 180));
		rdmnum2y = Math.round(Math.sqrt(10000 - rdmnum2x * rdmnum2x));
		rdmnum2x = '-' + rdmnum2x;
		rdmnum2y -= 12;
		rdmnum2y = '-' + rdmnum2y;
	}
	if (rdmnum2 <= 360 && rdmnum2 > 270) {
		rdmnum2x = Math.round(100 * Math.cos((rdmnum2 - 270) * Math.PI / 180));
		rdmnum2y = Math.round(Math.sqrt(10000 - rdmnum2x * rdmnum2x));
		rdmnum2x = '-' + rdmnum2x;
		rdmnum2y -= 12;
	}
	//
	if (rdmnum3 <= 90) {
		rdmnum3x = Math.round(100 * Math.cos((90 - rdmnum3) * Math.PI / 180));
		rdmnum3y = Math.round(Math.sqrt(10000 - rdmnum3x * rdmnum3x));
		rdmnum3y -= 24;
	}
	if (rdmnum3 <= 180 && rdmnum3 > 90) {
		rdmnum3x = Math.round(100 * Math.cos((rdmnum3 - 90) * Math.PI / 180));
		rdmnum3y = Math.round(Math.sqrt(10000 - rdmnum3x * rdmnum3x));
		rdmnum3y -= 24;
		rdmnum3y = '-' + rdmnum3y;
	}
	if (rdmnum3 <= 270 && rdmnum3 > 180) {
		rdmnum3x = Math.round(100 * Math.cos((270 - rdmnum3) * Math.PI / 180));
		rdmnum3y = Math.round(Math.sqrt(10000 - rdmnum3x * rdmnum3x));
		rdmnum3x = '-' + rdmnum3x;
		rdmnum3y -= 24;
		rdmnum3y = '-' + rdmnum3y;
	}
	if (rdmnum3 <= 360 && rdmnum3 > 270) {
		rdmnum3x = Math.round(100 * Math.cos((rdmnum3 - 270) * Math.PI / 180));
		rdmnum3y = Math.round(Math.sqrt(10000 - rdmnum3x * rdmnum3x));
		rdmnum3x = '-' + rdmnum3x;
		rdmnum3y -= 24;
	}
	//
	if (rdmnum4 <= 90) {
		rdmnum4x = Math.round(100 * Math.cos((90 - rdmnum4) * Math.PI / 180));
		rdmnum4y = Math.round(Math.sqrt(10000 - rdmnum4x * rdmnum4x));
		rdmnum4y -= 36;
	}
	if (rdmnum4 <= 180 && rdmnum4 > 90) {
		rdmnum4x = Math.round(100 * Math.cos((rdmnum4 - 90) * Math.PI / 180));
		rdmnum4y = Math.round(Math.sqrt(10000 - rdmnum4x * rdmnum4x));
		rdmnum4y -= 36;
		rdmnum4y = '-' + rdmnum4y;
	}
	if (rdmnum4 <= 270 && rdmnum4 > 180) {
		rdmnum4x = Math.round(100 * Math.cos((270 - rdmnum4) * Math.PI / 180));
		rdmnum4y = Math.round(Math.sqrt(10000 - rdmnum4x * rdmnum4x));
		rdmnum4x = '-' + rdmnum4x;
		rdmnum4y -= 36;
		rdmnum4y = '-' + rdmnum4y;
	}
	if (rdmnum4 <= 360 && rdmnum4 > 270) {
		rdmnum4x = Math.round(100 * Math.cos((rdmnum4 - 270) * Math.PI / 180));
		rdmnum4y = Math.round(Math.sqrt(10000 - rdmnum4x * rdmnum4x));
		rdmnum4y -= 36;
		rdmnum4x = '-' + rdmnum4x;
	}
	//
	if (rdmnum5 <= 90) {
		rdmnum5x = Math.round(100 * Math.cos((90 - rdmnum5) * Math.PI / 180));
		rdmnum5y = Math.round(Math.sqrt(10000 - rdmnum5x * rdmnum5x));
		rdmnum5y -= 48;
	}
	if (rdmnum5 <= 180 && rdmnum5 > 90) {
		rdmnum5x = Math.round(100 * Math.cos((rdmnum5 - 90) * Math.PI / 180));
		rdmnum5y = Math.round(Math.sqrt(10000 - rdmnum5x * rdmnum5x));
		rdmnum5y -= 48;
		rdmnum5y = '-' + rdmnum5y;
	}
	if (rdmnum5 <= 270 && rdmnum5 > 180) {
		rdmnum5x = Math.round(100 * Math.cos((270 - rdmnum5) * Math.PI / 180));
		rdmnum5y = Math.round(Math.sqrt(10000 - rdmnum5x * rdmnum5x));
		rdmnum5x = '-' + rdmnum5x;
		rdmnum5y -= 48;
		rdmnum5y = '-' + rdmnum5y;
	}
	if (rdmnum5 <= 360 && rdmnum5 > 270) {
		rdmnum5x = Math.round(100 * Math.cos((rdmnum5 - 270) * Math.PI / 180));
		rdmnum5y = Math.round(Math.sqrt(10000 - rdmnum5x * rdmnum5x));
		rdmnum5x = '-' + rdmnum5x;
		rdmnum5y -= 48;
	}
	//
	if (rdmnum6 <= 90) {
		rdmnum6x = Math.round(100 * Math.cos((90 - rdmnum6) * Math.PI / 180));
		rdmnum6y = Math.round(Math.sqrt(10000 - rdmnum6x * rdmnum6x));
		rdmnum6y -= 60;
	}
	if (rdmnum6 <= 180 && rdmnum6 > 90) {
		rdmnum6x = Math.round(100 * Math.cos((rdmnum6 - 90) * Math.PI / 180));
		rdmnum6y = Math.round(Math.sqrt(10000 - rdmnum6x * rdmnum6x));
		rdmnum6y -= 60;
		rdmnum6y = '-' + rdmnum6y;
	}
	if (rdmnum6 <= 270 && rdmnum6 > 180) {
		rdmnum6x = Math.round(100 * Math.cos((270 - rdmnum6) * Math.PI / 180));
		rdmnum6y = Math.round(Math.sqrt(10000 - rdmnum6x * rdmnum6x));
		rdmnum6x = '-' + rdmnum6x;
		rdmnum6y -= 60;
		rdmnum6y = '-' + rdmnum6y;
	}
	if (rdmnum6 <= 360 && rdmnum6 > 270) {
		rdmnum6x = Math.round(100 * Math.cos((rdmnum6 - 270) * Math.PI / 180));
		rdmnum6y = Math.round(Math.sqrt(10000 - rdmnum6x * rdmnum6x));
		rdmnum6x = '-' + rdmnum6x;
		rdmnum6y -= 60;
	}
}

function twyuan() {
	document.getElementById("twyuan0").style.top = rdmnum1y + "px";
	document.getElementById("twyuan0").style.left = rdmnum1x + "px";
	document.getElementById("twyuan1_0").style.top = rdmnum2y + "px";
	document.getElementById("twyuan1_0").style.left = rdmnum2x + "px";
	document.getElementById("twyuan2_0").style.top = rdmnum3y + "px";
	document.getElementById("twyuan2_0").style.left = rdmnum3x + "px";
	document.getElementById("twyuan3_0").style.top = rdmnum4y + "px";
	document.getElementById("twyuan3_0").style.left = rdmnum4x + "px";
	document.getElementById("twyuan4_0").style.top = rdmnum5y + "px";
	document.getElementById("twyuan4_0").style.left = rdmnum5x + "px";
	document.getElementById("twyuan5_0").style.top = rdmnum5y + "px";
	document.getElementById("twyuan5_0").style.left = rdmnum5x + "px";
}

function twyuan2() {
	clearInterval(start10);
	document.getElementById("twyuan0").style.transform = "rotateZ(180deg)";
	document.getElementById("twyuan1_0").style.transform = "rotateZ(180deg)";
	document.getElementById("twyuan2_0").style.transform = "rotateZ(180deg)";
	document.getElementById("twyuan3_0").style.transform = "rotateZ(180deg)";
	document.getElementById("twyuan4_0").style.transform = "rotateZ(180deg)";
	document.getElementById("twyuan5_0").style.transform = "rotateZ(180deg)";
	strat11 = setInterval(twyuan3, 1000);
}

function twyuan3() {
	clearInterval(strat11);
	document.getElementById("twyuan0").style.transition = "3s";
	document.getElementById("twyuan1_0").style.transition = "3s";
	document.getElementById("twyuan2_0").style.transition = "3s";
	document.getElementById("twyuan3_0").style.transition = "3s";
	document.getElementById("twyuan4_0").style.transition = "3s";
	document.getElementById("twyuan5_0").style.transition = "3s";
	document.getElementById("twyuan0").style.top = "700px";
	document.getElementById("twyuan1_0").style.top = "700px";
	document.getElementById("twyuan2_0").style.top = "700px";
	document.getElementById("twyuan3_0").style.top = "700px";
	document.getElementById("twyuan4_0").style.top = "700px";
	document.getElementById("twyuan5_0").style.top = "700px";
	document.getElementById("twyuan0").style.opacity = "0";
	document.getElementById("twyuan1_0").style.opacity = "0";
	document.getElementById("twyuan2_0").style.opacity = "0";
	document.getElementById("twyuan3_0").style.opacity = "0";
	document.getElementById("twyuan4_0").style.opacity = "0";
	document.getElementById("twyuan5_0").style.opacity = "0";
}

function hearts() {
	document.getElementById("heart1s").style.height = "101%";
	document.getElementById("heart2s").style.height = "101%";
	document.getElementById("heart3s").style.width = "101%";
	document.getElementById("heart3s").style.height = "101%";
}
var heartsnum = 0;

function heartss() {
	heartsnum++;
	if (heartsnum == 4) {
		document.getElementById("heart1").style.boxShadow = "0px 0px 100px 10px red";
		document.getElementById("heart2").style.boxShadow = "0px 0px 100px 10px red";
		document.getElementById("heart3").style.boxShadow = "0px 0px 100px 10px red";
	}
	if (heartsnum > 4) {
		clearInterval(start12);
		setInterval(yanhuas, 800);
	}
}
var yhnum = 0;

function yanhuas() {
	yhnum++;
	if (yhnum == 1) {
		var rdm3num = 0;
		var rdm4num = 0;
		var rdm6num = 0;
		do {
			rdm3num = Math.round(Math.random() * 600);
			rdm4num = Math.round(Math.random() * 600);
			rdm6num = Math.round(Math.random() * 600);
		} while (rdm3num < 250 || rdm4num < 300 || rdm6num < 270);
		document.getElementById("yh1").style.top = "-" + rdm6num + "px";
		document.getElementById("yh21").style.top = "-" + rdm3num + "px";
		document.getElementById("yh21").style.left = "200px";
		document.getElementById("yh31").style.top = "-" + rdm4num + "px";
		document.getElementById("yh31").style.left = "-200px";
	}
	if (yhnum == 2) {
		document.getElementById("yh1").style.backgroundColor = "transparent";
		document.getElementById("yh21").style.backgroundColor = "transparent";
		document.getElementById("yh31").style.backgroundColor = "transparent";
		document.getElementById("yh2").style.width = "150px";
		document.getElementById("yh2").style.height = "150px";
		document.getElementById("yh2").style.top = "-75px";
		document.getElementById("yh2").style.left = "-85px";
		document.getElementById("yh2").style.borderWidth = "7px";
		document.getElementById("yh22").style.width = "120px";
		document.getElementById("yh22").style.height = "120px";
		document.getElementById("yh22").style.top = "-60px";
		document.getElementById("yh22").style.left = "-50px";
		document.getElementById("yh22").style.borderWidth = "6px";
		document.getElementById("yh32").style.width = "130px";
		document.getElementById("yh32").style.height = "130px";
		document.getElementById("yh32").style.top = "-65px";
		document.getElementById("yh32").style.left = "-65px";
		document.getElementById("yh32").style.borderWidth = "6.5px";
	}
	if (yhnum == 4) {
		// document.getElementById("yh2").style.top = "0px";
		// document.getElementById("yh2").style.transform = "rotateX(30deg)";
		// document.getElementById("yh22").style.top = "0px";
		// document.getElementById("yh22").style.transform = "rotateX(30deg)";
		// document.getElementById("yh32").style.top = "0px";
		// document.getElementById("yh32").style.transform = "rotateX(30deg)";
	}
	if (yhnum == 5) {
		document.getElementById("yh2").style.opacity = "0";
		document.getElementById("yh22").style.opacity = "0";
		document.getElementById("yh32").style.opacity = "0";
	}
	if (yhnum == 6) {
		var rdm1num = Math.round(Math.random() * 360);
		var rdm2num = Math.round(Math.random() * 360);
		var rdm5num = Math.round(Math.random() * 360);
		document.getElementById("yanhua").innerHTML = '<div class="yh1" id="yh1" style="background-color: hsla(' + rdm1num +
			',100%,50%,1);"><div class="yh2" id="yh2" style="background: radial-gradient(transparent, hsla(' + rdm1num +
			',100%,50%,1)); box-shadow: 0px 0px 100px 1px hsla(' + rdm1num +
			',100%,50%,1);border-color: hsla(' + rdm1num + ',100%,50%,1);"></div></div>';
		document.getElementById("yanhua2").innerHTML = '<div class="yh21" id="yh21" style="background-color: hsla(' + rdm2num +
			',100%,50%,1);"><div class="yh22" id="yh22" style="background: radial-gradient(transparent, hsla(' + rdm2num +
			',100%,50%,1)); box-shadow: 0px 0px 100px 1px hsla(' + rdm2num +
			',100%,50%,1);border-color: hsla(' + rdm2num + ',100%,50%,1);"></div></div>';
		document.getElementById("yanhua3").innerHTML = '<div class="yh31" id="yh31" style="background-color: hsla(' + rdm5num +
			',100%,50%,1);"><div class="yh32" id="yh32" style="box-shadow: 0px 0px 100px 1px hsla(' + rdm5num +
			',100%,50%,1);border-color: hsla(' + rdm5num + ',100%,50%,1);background: radial-gradient(transparent, hsla(' +
			rdm5num + ',100%,50%,1));"></div></div>';
		yhnum = 0;
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

var str = [
	"小","男","孩","从","天","空","中","取","过","海","鸥","送","来","的","玫","瑰","轻","轻","地","落","在","水","面","上",",",
	"男","孩","慢","慢","地","靠","近","小","女","孩","并","温","柔","的","将","玫","瑰","献","给","了","她"
];

function text2() {
	for (var i = 0; i < str.length; i++) {
		document.getElementById("text2").innerHTML += '<div id="textss' + i +
			'" style="opacity: 0;transition: 0.5s;float:left;">' + str[i] + '</div>';
	}
}
var text2num = 0;

function text2s() {
	document.getElementById("textss" + text2num).style.opacity = "1";
	text2num++;
	if (text2num == str.length) {
		text3s();
		clearInterval(start14);
	}
}

function text3s() {
	document.getElementById("text3").style.height = "400px";
}

function sediao() {
	document.getElementById("sediao").style.backgroundColor = "white";
	document.getElementById("sediao").style.opacity = "1";
}
var sediaonum4 = 0;

function sediaos() {
	for (var i = 0; i < 325; i++) {
		document.getElementById("sediao").innerHTML +=
			"<div id='sd" + i +
			"' style='width: 2%;height: 4%;position: absolute;top: 50%;left: 50%;transition: 0.5s;background-color: black;'></div>";
	}
}

function sediao2s() {
	for (var i = 0; i < 325; i++) {
		document.getElementById("sediao").innerHTML +=
			"<div id='sed" + i +
			"' style='width: 2%;height: 4%;position: absolute;top: 50%;left: 50%;transition: 0.5s;background-color: black;'></div>";
	}
}

function sediao3s() {
	for (var i = 0; i < 325; i++) {
		document.getElementById("sediao").innerHTML +=
			"<div id='sedi" + i +
			"' style='width: 2%;height: 4%;position: absolute;top: 50%;left: 50%;transition: 0.5s;background-color: black;'></div>";
	}
}

function sediao4s() {
	for (var i = 0; i < 325; i++) {
		document.getElementById("sediao").innerHTML +=
			"<div id='sedia" + i +
			"' style='width: 2%;height: 4%;position: absolute;top: 50%;left: 50%;transition: 0.5s;background-color: black;'></div>";
	}
}
var sediaossnum = 0;

function sediaoss() {
	sediaossnum++;
	switch (sediaossnum) {
		case 1:
			sediaos();
			break;
		case 2:
			sediao2s();
			break;
		case 3:
			sediao3s();
			break;
		case 4:
			sediao4s();
			clearInterval(start16);
			break;
	}
}
var sediaonum = 0;
var sediaonum2 = 0;
var sediaonum3 = 0;
var sediaonum5 = 98;
var sediaonum6 = 96;

function sediaos2() {
	if (sediaonum != 0 && sediaonum % 25 == 0) {
		sediaonum3 += 4;
		sediaonum2 = 0;
		sediaonum5 = 98;
		sediaonum6 -= 4;
	}
	document.getElementById("sd" + sediaonum).style.top = sediaonum3 + "%";
	document.getElementById("sd" + sediaonum).style.left = sediaonum2 + "%";
	document.getElementById("sed" + sediaonum).style.top = sediaonum3 + "%";
	document.getElementById("sed" + sediaonum).style.left = sediaonum5 + "%";
	document.getElementById("sedi" + sediaonum).style.top = sediaonum6 + "%";
	document.getElementById("sedi" + sediaonum).style.left = sediaonum2 + "%";
	document.getElementById("sedia" + sediaonum).style.top = sediaonum6 + "%";
	document.getElementById("sedia" + sediaonum).style.left = sediaonum5 + "%";
	if (sediaonum == 324) {
		document.getElementById("sediao").style.backgroundColor = "black";
		document.getElementById("texts2").style.opacity = "1";
		clearInterval(start15);
		sediaotext();
		document.getElementById("kk").style.opacity = "0.4";
	}
	sediaonum++;
	sediaonum2 += 2;
	sediaonum5 -= 2;
}

function sediaotext() {
	document.getElementById("sd294").style.border = "1px solid white";
	document.getElementById("sd295").style.border = "1px solid white";
	document.getElementById("sd269").style.border = "1px solid white";
	document.getElementById("sd270").style.border = "1px solid white";
	document.getElementById("sd288").style.border = "1px solid white";
	document.getElementById("sd266").style.border = "1px solid white";
	document.getElementById("sd291").style.border = "1px solid white";
	document.getElementById("sd267").style.border = "1px solid white";
	document.getElementById("sd292").style.border = "1px solid white";
	document.getElementById("sd259").style.border = "1px solid white";
	document.getElementById("sd260").style.border = "1px solid white";
	document.getElementById("sd284").style.border = "1px solid white";
	document.getElementById("sd285").style.border = "1px solid white";
	document.getElementById("sd261").style.border = "1px solid white";
	document.getElementById("sd286").style.border = "1px solid white";
	document.getElementById("sd273").style.border = "1px solid white";
	document.getElementById("sd298").style.border = "1px solid white";
	document.getElementById("sd272").style.border = "1px solid white";
	document.getElementById("sd297").style.border = "1px solid white";
	document.getElementById("sed274").style.border = "1px solid white";
	document.getElementById("sed299").style.border = "1px solid white";
	document.getElementById("sed298").style.border = "1px solid white";
	document.getElementById("sed271").style.border = "1px solid white";
	document.getElementById("sed270").style.border = "1px solid white";
	document.getElementById("sed295").style.border = "1px solid white";
	document.getElementById("sed296").style.border = "1px solid white";
	document.getElementById("sed267").style.border = "1px solid white";
	document.getElementById("sed292").style.border = "1px solid white";
	document.getElementById("sed268").style.border = "1px solid white";
	document.getElementById("sed293").style.border = "1px solid white";
	document.getElementById("sed264").style.border = "1px solid white";
	document.getElementById("sed289").style.border = "1px solid white";
	document.getElementById("sed265").style.border = "1px solid white";
	document.getElementById("sed290").style.border = "1px solid white";
	document.getElementById("sed262").style.border = "1px solid white";
	document.getElementById("sed261").style.border = "1px solid white";
	document.getElementById("sed287").style.border = "1px solid white";
	document.getElementById("sed286").style.border = "1px solid white";
	document.getElementById("sed285").style.border = "1px solid white";
	document.getElementById("sed273").style.border = "1px solid white";
	//
	document.getElementById("sd294").style.left = "100%";
	document.getElementById("sd295").style.left = "100%";
	document.getElementById("sd269").style.left = "100%";
	document.getElementById("sd270").style.left = "100%";
	document.getElementById("sd288").style.left = "100%";
	document.getElementById("sd266").style.left = "100%";
	document.getElementById("sd291").style.left = "100%";
	document.getElementById("sd267").style.left = "100%";
	document.getElementById("sd292").style.left = "100%";
	document.getElementById("sd259").style.left = "100%";
	document.getElementById("sd260").style.left = "100%";
	document.getElementById("sd284").style.left = "100%";
	document.getElementById("sd285").style.left = "100%";
	document.getElementById("sd261").style.left = "100%";
	document.getElementById("sd286").style.left = "100%";
	document.getElementById("sd273").style.left = "100%";
	document.getElementById("sd298").style.left = "100%";
	document.getElementById("sd272").style.left = "100%";
	document.getElementById("sd297").style.left = "100%";
	document.getElementById("sed274").style.left = "100%";
	document.getElementById("sed273").style.left = "100%";
	document.getElementById("sed299").style.left = "100%";
	document.getElementById("sed298").style.left = "100%";
	document.getElementById("sed271").style.left = "100%";
	document.getElementById("sed270").style.left = "100%";
	document.getElementById("sed295").style.left = "100%";
	document.getElementById("sed296").style.left = "100%";
	document.getElementById("sed267").style.left = "100%";
	document.getElementById("sed292").style.left = "100%";
	document.getElementById("sed268").style.left = "100%";
	document.getElementById("sed293").style.left = "100%";
	document.getElementById("sed264").style.left = "100%";
	document.getElementById("sed289").style.left = "100%";
	document.getElementById("sed265").style.left = "100%";
	document.getElementById("sed290").style.left = "100%";
	document.getElementById("sed262").style.left = "100%";
	document.getElementById("sed261").style.left = "100%";
	document.getElementById("sed287").style.left = "100%";
	document.getElementById("sed286").style.left = "100%";
	document.getElementById("sed285").style.left = "100%";
}
var deg4 = 0;

function kks() {
	for (var i = 1; i <= 24; i++) {
		document.getElementById("kk" + i).style.transform = " rotateY(" + deg4 + "deg) translateZ(600px)";
		deg4 += 15;
	}
}
