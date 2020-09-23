let imgsArrows = {};
let imgsSpike = {};
let dirs = ["t", "l", "r", "b"]
for (const i in dirs) {
    let spikeImg = new Image();
    spikeImg.src = `/img/spike_${dirs[i]}.png`;
    imgsSpike[dirs[i]] = spikeImg;

    let arrowImg = new Image();
    arrowImg.src = `/img/arrow_${dirs[i]}.png`;
    imgsArrows[dirs[i]] = arrowImg;
}

let keyimg = new Image();
keyimg.src = "/img/key.png";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let tileMap = new TileMap();
let player = new Player(250, 300, 20, 40);


// keyboard control VVV
//let key = {}
let keys = [];
document.addEventListener('keydown', function(e){
    keys[e.which] = true;
});
document.addEventListener('keyup', function(e){
    keys[e.which] = false;
});

function run () {
    setInterval(()=>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tileMap.renderMap(player.currentMap);
        player.update();
    }, 1000/60);
}