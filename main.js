let canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 500;
let context = canvas.getContext("2d");

let player = {
    x: 0,
    y: 0,
    draw: function() { context.fillRect(this.x * 100, this.y * 100, 100, 100); }
}

/*basically not a*/class Enemy {

}

setInterval(loop, 33);

let xpframes = 0;
let xmframes = 0;
let ypframes = 0;
let ymframes = 0;
const buffer = 7;

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
    if(player.x > 2)
        player.x = 2;
    if(player.x < 0)
        player.x = 0;
    if(player.y < 0)
        player.y = 0;
    if(player.y > 2)
        player.y = 2
    player.draw();
}
