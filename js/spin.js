var x = 0;
var y = 0;
var deg = 30;
var watch = true;
var Enemys = [];

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function getRange() {

}

function spawnEnemy() {
    let cnt = Math.floor(Math.random() * 10);
    cnt = Math.floor(cnt - 5) / 2;
    for(let i = 0; i < cnt; i++) {
        Enemys.push(new Enemy());
    }
}

function rotate() {
    var bar = document.getElementById('character');
    deg += watch?1:-1;
    if(Math.abs(deg) == 360) deg = 0;
    bar.style.transform = 'rotate(' + deg + 'deg)';
}

function interval() {
    rotate();
}

window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case 'w': y -= 1; break;
        case 'a': x -= 1; break;
        case 's': y += 1; break;
        case 'd': x += 1; break;
        case ' ': watch = !watch;
        default: break;
    }
});

setInterval(interval, 5);