let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let tileMap = new TileMap();
let player = new Player(250, 300, 48, 70);


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
        player.update();
        tileMap.renderMap(player.currentMap);
    }, 1000/60);
}