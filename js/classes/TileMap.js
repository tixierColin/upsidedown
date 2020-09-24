class TileMap {
    constructor() {
        this.gridSize = canvas.height/50;
        this.maps;
        this.loadMaps();
    }

    loadMaps() {
        fetch("./maps/maps.json")
        .then(reponse => reponse.json())
        .then(maps => {
            this.maps = maps;
            run();
        });
    }

    renderMap(mapIndex) {
        for (let [key, object] of Object.entries(this.maps["levels"][mapIndex - 1]["blocks"])) {
            if (object.type == "floor") {
                ctx.fillStyle = "#c2c2c2";
                ctx.fillRect(object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                    object.width * this.gridSize, object.height*this.gridSize);
            } else if (object.type == "reverse") {
                ctx.fillStyle = "#ffa600";
                ctx.fillRect(object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                    object.width * this.gridSize, object.height*this.gridSize);
            } else if (object.type == "spike") {
                object.width = 5;
                object.height = 5;
                ctx.drawImage(imgsSpike[object.dir], object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                    object.width * this.gridSize, object.height*this.gridSize);
            } else if (object.type == "arrow") {
                ctx.drawImage(imgsArrows[object.dir], object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                    object.width * this.gridSize, object.height*this.gridSize);
            } else if (object.type == "key" && !object.taken) {
                object.height = 4;
                object.width = 4;
                let radius = 3;
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(object.pos.x* this.gridSize +object.width/2 * this.gridSize, object.pos.y* this.gridSize + object.width/2 * this.gridSize,
                    radius * this.gridSize, 0, 2 * Math.PI);
                ctx.fill();
                ctx.drawImage(keyimg, object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                    object.width * this.gridSize, object.height*this.gridSize);
               
            } else if (object.type == "door") {
                object.height = 10;
                object.width = 10;
                ctx.drawImage(doorimg, object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                    object.width * this.gridSize, object.height*this.gridSize);
            }
        }
    }

    getMap(mapIndex) {
        return this.maps.levels[mapIndex - 1];
    }

    resetKeys() {
        for (let map of this.maps.levels) {
            for (let block of map.blocks) {
                if (block.type == "key") {
                    block.taken = false;
                }
            }
        }
    }
}