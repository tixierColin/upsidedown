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
                ctx.fillStyle = "green";
                ctx.fillRect(object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                    object.width * this.gridSize, object.height*this.gridSize);
            } else if (object.type == "reverse") {
                ctx.fillStyle = "yellow";
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
                object.height = 5;
                object.width = 5;
                ctx.drawImage(keyimg, object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                    object.width * this.gridSize, object.height*this.gridSize);
            }
        }
    }

    getMap(mapIndex) {
        return this.maps.levels[mapIndex - 1];
    }

}