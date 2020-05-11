let canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 500;
let context = canvas.getContext("2d");

let player = {
    x: 0,
    y: 0,
    draw: function() { context.fillRect(this.x, this.y, 100, 100); }
}

/*basically not a*/class Enemy {

}

setInterval(loop, 33);

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(Keyboarder.isDown(37))
        player.x--;
    if(Keyboarder.isDown(39))
        player.x++;
    if(Keyboarder.isDown(38))
        player.y--;
    if(Keyboarder.isDown(40))
        player.y++;
    if(player.x > 900)
        player.x = 900;
    if(player.x < 0)
        player.x = 0;
    if(player.y < 0)
        player.y = 0;
    if(player.y > 400)
        player.y = 400
    player.draw();
}
