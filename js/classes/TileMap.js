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
            } else if (object.type == "reverse") {
                ctx.fillStyle = "yellow";
            } else if (object.type == "spike") {
                ctx.fillStyle = "purple";
            }
            ctx.fillRect(object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                object.width * this.gridSize, object.height*this.gridSize);
            
        }
    }

    getMap(mapIndex) {
        return this.maps.levels[mapIndex - 1];
    }

}