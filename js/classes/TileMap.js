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
                let image = new Image();
                image.onload = () => {
                    ctx.drawImage(image, object.pos.x * this.gridSize, object.pos.y * this.gridSize,
                        object.width * this.gridSize, object.height*this.gridSize);
                    }
                ctx.fillStyle = "yellow";
                
                image.src = `/img/spike_${object.dir}.png`;
            }
        }
    }

    getMap(mapIndex) {
        return this.maps.levels[mapIndex - 1];
    }

}