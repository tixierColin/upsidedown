let imgsArrows = {};
let imgsSpike = {};
let dirs = ["t", "l", "r", "b"]
for (const i in dirs) {
    let spikeImg = new Image();
    spikeImg.src = `./assets/images/spike_${dirs[i]}.png`;
    imgsSpike[dirs[i]] = spikeImg;

    let arrowImg = new Image();
    arrowImg.src = `./assets/images/arrow_${dirs[i]}.png`;
    imgsArrows[dirs[i]] = arrowImg;
}

let keyimg = new Image();
keyimg.src = "./assets/images/key.png";

let doorimg = new Image();
doorimg.src = "./assets/images/door.png";

let playerimg = new Image();
playerimg.src = "./assets/images/ratatacos.png";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let tileMap = new TileMap();
let player = new Player(250, 300, 35, 30);

let keys = [];
document.addEventListener('keydown', function(e){
    keys[e.which] = true;
});
document.addEventListener('keyup', function(e){
    keys[e.which] = false;
});

function run () {
    setInterval(()=>{
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0d0d0d";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (player.win) {
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "center"; 
            ctx.fillText("Good job you managed to escape the ship!", canvas.width/2, canvas.height/2 - 30);
            ctx.fillText("but the rescue capsule hit an asteroid...", canvas.width/2, canvas.height/2);
            ctx.fillText("YOU ARE NOW DED!", canvas.width/2, canvas.height/2 +30);
            ctx.fillText("press \"R\" to restart", canvas.width/2, canvas.height/2 +60);
            if (keys[82]) {
                player.reset();
            }
        } else {
            tileMap.renderMap(player.currentMap);
            player.update();
        }
        if (!player.living) {
            ctx.fillStyle = "#d61d00";
            ctx.fillRect(0, canvas.height/2 + 5, canvas.width, 30);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.textAlign = "center"; 
            ctx.fillText("WASTED", canvas.width/2, canvas.height/2 +30);
            ctx.fillText("press \"R\" to restart", canvas.width/2, canvas.height/2 +60);
            if (keys[82]) {
                player.reset();
            }
        }
    }, 1000/60);
}