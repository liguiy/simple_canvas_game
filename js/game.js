//制作画布
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//渲染背景
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// 英雄画面
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// 怪兽画面
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

//游戏结束画面
var gameOverReady = false;
var gameOverImage = new Image();
gameOverImage.onload = function(){

}
gameOverImage.src = "";

//英雄对象
var hero = {
	speed: 256 //英雄每秒钟移动的速度
};
//怪兽对象
var monster = {};

//抓到怪兽的个数
var monstersCaught = 0;

//按键控制器
var keysDown = {};
//监听方向键按下操作
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
//监听方向键抬起操作
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//当英雄抓到怪兽后重置英雄位置
var reset = function () {
	//英雄起始位置在画布中心
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	//随机出现怪兽
	monster.x = 32 + (Math.random() * (canvas.width - 96));
	monster.y = 32 + (Math.random() * (canvas.height - 96));
};

//更新游戏角色属性
var update = function (modifier) {
	if (38 in keysDown) { // 上
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // 下
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // 左
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // 右
		hero.x += hero.speed * modifier;
	}
	//英雄是否合怪兽位置重合
	if (isCaught()) {
		//加分
		++monstersCaught;
		//重置角色位置
		reset();
	}
};
/**
 * 是否抓到怪兽
 */
var isCaught = function(){
	return hero.x <= (monster.x + 32)&& monster.x <= (hero.x + 32)&& hero.y <= (monster.y + 32)&& monster.y <= (hero.y + 32);
}
/**
 * 是否游戏结束
 */
var isGameOver = function(){
	//当英雄撞墙时游戏结束
    return hero.x <= 32||hero.x >= (canvas.width - 32)|| hero.y<=32||hero.y>=(canvas.height - 32);
}
/**
 * 游戏结束
 */
var gameOver = function (){

}

//渲染画面
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}


	// 得分
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("SCORE: " + monstersCaught, 32, 32);
};

//主函数
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 5000);
	render();
	then = now;
	requestAnimationFrame(main);
};

//重置角色位置
reset();
// 游戏开始
var then = Date.now();
main();
