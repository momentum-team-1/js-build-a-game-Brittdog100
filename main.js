let canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 500;
let context = canvas.getContext("2d");

const offsetx = 100;
const offsety = 100;

let bodies = [];

let xpframes = 0;
let xmframes = 0;
let ypframes = 0;
let ymframes = 0;
const buffer = 10;
const grid = 2;
const maxes = 2;
const espeed = 0.025;
let score = 0;
let scoreframes = 0;
const scorefade = 10;
let high = 0;

function drawBoard() {
    context.fillStyle = "blue";
    context.fillRect(offsetx, offsety, 300, 300)
}

function drawScore() {
    context.font = "64px Arial";
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.fillText(score, 150 + offsetx, 150 + offsety, 300)
}

function testCollision(e) {
    
}

let player = {
    x: 1,
    y: 1,
    draw: function() {
        context.fillStyle = "black";
        context.fillRect((this.x * 100) + 5 + offsetx, (this.y * 100) + 5 + offsety, 90, 90);
    }
}
let goal = {
    x: -1,
    y: 0,
    draw: function() {
        context.fillStyle = "green";
        context.fillRect((this.x * 100) + 30 + offsetx, (this.y * 100) + 30 + offsety, 40, 40);
    },
    resetPos: function() {
        this.x = Math.round(Math.random() * 2);
        this.y = Math.round(Math.random() * 2);
        if(this.x === player.x && this.y === player.y)
            this.resetPos();
    }
}

class Enemy {
    constructor() {
        this.axis = Math.round(Math.random());
        this.dir = (Math.round(Math.random()) === 0) ? 1 : -1;
        this.x = 0;
        this.y = 0;
        if(this.axis === 0) {
            if(this.dir === 1)
                this.x = -1;
            else
                this.x = 3;
            this.y = Math.round(Math.random() * 2);
        } else {
            if(this.dir === 1)
                this.y = -1;
            else
                this.y = 3;
            this.x = Math.round(Math.random() * 2);
        }
        bodies.push(this);
    }
    draw() {
        context.fillStyle = "red";
        context.fillRect(Math.round(this.x * 100) + 20 + offsetx, Math.round(this.y * 100) + 20 + offsety, 60, 60);
    }
    move() {
        if(this.axis === 0)
            this.x += espeed * this.dir;
        else
            this.y += espeed * this.dir;
        if(this.x > 3 || this.y > 3 || this.x < -1 || this.y < -1)
            bodies.splice(bodies.indexOf(this), 1);
        }
}

goal.resetPos();
setInterval(loop, 20);

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(Keyboarder.isDown(37)) {
        if(xmframes++ === 0 || xmframes > buffer)
            player.x--;
    } else
        xmframes = 0;
    if(Keyboarder.isDown(39)) {
        if(xpframes++ === 0 || xpframes > buffer)
            player.x++;
    } else
        xpframes = 0;
    if(Keyboarder.isDown(38)) {
        if(ymframes++ === 0 || ymframes > buffer)
            player.y--;
    } else
        ymframes = 0;
    if(Keyboarder.isDown(40)) {
        if(ypframes++ === 0 || ypframes > buffer)
            player.y++;
    } else
        ypframes = 0;
    if(player.x > grid)
        player.x = grid;
    if(player.x < 0)
        player.x = 0;
    if(player.y < 0)
        player.y = 0;
    if(player.y > grid)
        player.y = grid;
    drawBoard();
    goal.draw();
    player.draw();
    for(enemy of bodies) {
        enemy.move();
        enemy.draw();
    }
    if(Math.random() < 0.05 && bodies.length <= maxes)
        new Enemy();
    drawScore();
}
