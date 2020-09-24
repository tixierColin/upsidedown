class TileMap {
    constructor() {
        this.gridSize = canvas.height/50;
        this.maps;
        this.loadMaps();
    }

    loadMaps() {
        this.maps = {"levels":[{"exits":[6,2,9,null],"blocks":[{"pos":{"x":0,"y":45},"height":5,"width":50,"type":"floor"},{"pos":{"x":30,"y":0},"height":5,"width":20,"type":"floor"},{"pos":{"x":0,"y":0},"height":5,"width":20,"type":"floor"},{"pos":{"x":20,"y":35.3},"type":"door","numKeyReq":3},{"pos":{"x":47,"y":0},"height":35,"width":5,"type":"floor"},{"pos":{"x":23,"y":13},"height":4,"width":4,"type":"arrow","dir":"t"},{"pos":{"x":40,"y":38},"height":4,"width":4,"type":"arrow","dir":"r"},{"pos":{"x":5,"y":38},"height":4,"width":4,"type":"arrow","dir":"l"}]},{"exits":[null,null,3,1],"blocks":[{"pos":{"x":15,"y":25},"height":5,"width":15,"type":"floor"},{"pos":{"x":30,"y":25},"height":35,"width":5,"type":"floor"},{"pos":{"x":0,"y":45},"height":5,"width":20,"type":"floor"},{"pos":{"x":7,"y":7},"height":3,"width":3,"type":"reverse"},{"pos":{"x":20,"y":20},"type":"spike","dir":"t"},{"pos":{"x":20,"y":7},"height":3,"width":3,"type":"reverse"},{"pos":{"x":35,"y":7},"height":3,"width":3,"type":"reverse"},{"pos":{"x":35,"y":45},"height":5,"width":20,"type":"floor"},{"pos":{"x":45,"y":0},"height":30,"width":5,"type":"floor"},{"pos":{"x":20,"y":13},"height":4,"width":4,"type":"arrow","dir":"r"}]},{"exits":[2,4,null,5],"blocks":[{"pos":{"x":0,"y":25},"height":5,"width":10,"type":"floor"},{"pos":{"x":4,"y":40},"height":3,"width":7,"type":"reverse"},{"pos":{"x":0,"y":25},"height":5,"width":10,"type":"floor"},{"pos":{"x":10,"y":20},"height":5,"width":5,"type":"floor"},{"pos":{"x":20,"y":13},"height":4,"width":4,"type":"arrow","dir":"t"}]},{"exits":[null,null,null,3],"blocks":[{"pos":{"x":22.5,"y":10},"height":5,"width":5,"type":"reverse"},{"pos":{"x":23,"y":20},"type":"key","taken":false}]},{"exits":[null,3,null,null],"blocks":[{"pos":{"x":10,"y":10},"height":4,"width":4,"type":"arrow","dir":"t"},{"pos":{"x":22.5,"y":35},"height":5,"width":5,"type":"floor"}]},{"exits":[7,null,1,null],"blocks":[{"pos":{"x":0,"y":45},"height":5,"width":50,"type":"floor"},{"pos":{"x":0,"y":0},"height":5,"width":50,"type":"floor"},{"pos":{"x":0,"y":30},"height":50,"width":5,"type":"floor"},{"pos":{"x":7,"y":15},"height":4,"width":4,"type":"arrow","dir":"l"}]},{"exits":[null,null,6,8],"blocks":[{"pos":{"x":40,"y":0},"height":2,"width":10,"type":"floor"},{"pos":{"x":20,"y":0},"height":2,"width":10,"type":"floor"},{"pos":{"x":34,"y":10},"height":3,"width":3,"type":"reverse"},{"pos":{"x":14,"y":15},"height":2,"width":10,"type":"floor"},{"pos":{"x":0,"y":0},"height":2,"width":15,"type":"floor"},{"pos":{"x":0,"y":0},"height":50,"width":3,"type":"floor"},{"pos":{"x":0,"y":48},"height":2,"width":33,"type":"floor"},{"pos":{"x":14,"y":15},"height":15,"width":2,"type":"floor"},{"pos":{"x":20,"y":38},"height":3,"width":3,"type":"reverse"},{"pos":{"x":24,"y":30},"height":2,"width":15,"type":"floor"},{"pos":{"x":39,"y":30},"height":50,"width":20,"type":"floor"},{"pos":{"x":24,"y":25},"type":"spike","dir":"t"},{"pos":{"x":34,"y":25},"type":"spike","dir":"t"},{"pos":{"x":39,"y":25},"type":"spike","dir":"t"},{"pos":{"x":17.5,"y":17},"type":"spike","dir":"b"},{"pos":{"x":14,"y":43},"type":"spike","dir":"t"},{"pos":{"x":19,"y":43},"type":"spike","dir":"t"}]},{"exits":[null,7,null,null],"blocks":[{"pos":{"x":0,"y":47},"height":3,"width":50,"type":"floor"},{"pos":{"x":33,"y":25},"height":3,"width":25,"type":"floor"},{"pos":{"x":47,"y":0},"height":50,"width":3,"type":"floor"},{"pos":{"x":0,"y":0},"height":3,"width":30,"type":"floor"},{"pos":{"x":20,"y":3},"type":"spike","dir":"b"},{"pos":{"x":21,"y":13},"height":3,"width":3,"type":"reverse"},{"pos":{"x":0,"y":0},"height":50,"width":3,"type":"floor"},{"pos":{"x":0,"y":0},"height":50,"width":10,"type":"floor"},{"pos":{"x":20,"y":25},"height":3,"width":13,"type":"floor"},{"pos":{"x":20,"y":20},"type":"spike","dir":"t"},{"pos":{"x":25,"y":20},"type":"spike","dir":"t"},{"pos":{"x":20,"y":42},"type":"spike","dir":"t"},{"pos":{"x":25,"y":28},"type":"spike","dir":"b"},{"pos":{"x":40,"y":38},"type":"key","taken":false}]},{"exits":[1,12,10,null],"blocks":[{"pos":{"x":0,"y":5},"height":3,"width":45,"type":"floor"},{"pos":{"x":0,"y":0},"height":0,"width":3,"type":"floor"},{"pos":{"x":0,"y":47},"height":3,"width":10,"type":"floor"},{"pos":{"x":0,"y":0},"height":35,"width":3,"type":"floor"},{"pos":{"x":45,"y":0},"height":1.5,"width":5,"type":"floor"},{"pos":{"x":42.9,"y":0},"height":8,"width":2.1,"type":"floor"},{"pos":{"x":17,"y":23},"height":3,"width":3,"type":"reverse"},{"pos":{"x":33,"y":23},"height":3,"width":3,"type":"reverse"},{"pos":{"x":43,"y":30},"height":3,"width":3,"type":"reverse"},{"pos":{"x":16,"y":8},"type":"spike","dir":"b"},{"pos":{"x":32,"y":8},"type":"spike","dir":"b"},
        {"pos":{"x":4,"y":0.5},"height":4,"width":4,"type":"arrow","dir":"t"},
        {"pos":{"x":8,"y":0},"type":"spike","dir":"t"},{"pos":{"x":13,"y":0},"type":"spike","dir":"t"},{"pos":{"x":18,"y":0},"type":"spike","dir":"t"},{"pos":{"x":23,"y":0},"type":"spike","dir":"t"},{"pos":{"x":28,"y":0},"type":"spike","dir":"t"},{"pos":{"x":33,"y":0},"type":"spike","dir":"t"},{"pos":{"x":38,"y":0},"type":"spike","dir":"t"},{"pos":{"x":25,"y":35},"height":4,"width":4,"type":"arrow","dir":"r"}]},{"exits":[9,11,null,null],"blocks":[{"pos":{"x":0,"y":47},"height":3,"width":50,"type":"floor"},{"pos":{"x":47,"y":0},"height":50,"width":3,"type":"floor"},{"pos":{"x":0,"y":0},"height":1.5,"width":20,"type":"floor"},{"pos":{"x":10,"y":30},"height":3,"width":3,"type":"reverse"},{"pos":{"x":15,"y":1.5},"type":"spike","dir":"b"},{"pos":{"x":10,"y":1.5},"type":"spike","dir":"b"},{"pos":{"x":5,"y":1.5},"type":"spike","dir":"b"},{"pos":{"x":0,"y":1.5},"type":"spike","dir":"b"},{"pos":{"x":23,"y":5},"height":4,"width":4,"type":"arrow","dir":"l"},{"pos":{"x":23,"y":10},"height":4,"width":4,"type":"arrow","dir":"t"}]},{"exits":[12,null,null,10],"blocks":[{"pos":{"x":0,"y":0},"height":3,"width":50,"type":"floor"},{"pos":{"x":0,"y":26},"height":3,"width":50,"type":"floor"},{"pos":{"x":47,"y":29},"height":21,"width":3,"type":"floor"},{"pos":{"x":0,"y":48.5},"height":1.5,"width":20,"type":"floor"},{"pos":{"x":0,"y":11.5},"height":14.5,"width":1.5,"type":"floor"},{"pos":{"x":47,"y":0},"height":50,"width":3,"type":"floor"},{"pos":{"x":30,"y":40},"height":2,"width":2,"type":"reverse"},{"pos":{"x":5,"y":16},"height":3,"width":3,"type":"reverse"},{"pos":{"x":15,"y":16},"height":3,"width":3,"type":"reverse"},{"pos":{"x":25,"y":16},"height":3,"width":3,"type":"reverse"},{"pos":{"x":35,"y":16},"height":3,"width":3,"type":"reverse"},{"pos":{"x":10,"y":10},"height":3,"width":3,"type":"reverse"},{"pos":{"x":20,"y":10},"height":3,"width":3,"type":"reverse"},{"pos":{"x":30,"y":10},"height":3,"width":3,"type":"reverse"},{"pos":{"x":40,"y":10},"height":3,"width":3,"type":"reverse"},{"pos":{"x":50,"y":10},"height":3,"width":3,"type":"reverse"},{"pos":{"x":1.5,"y":21},"type":"spike","dir":"t"},{"pos":{"x":6.5,"y":21},"type":"spike","dir":"t"},{"pos":{"x":11.5,"y":21},"type":"spike","dir":"t"},{"pos":{"x":16.5,"y":21},"type":"spike","dir":"t"},{"pos":{"x":21.5,"y":21},"type":"spike","dir":"t"},{"pos":{"x":26.5,"y":21},"type":"spike","dir":"t"},{"pos":{"x":31.5,"y":21},"type":"spike","dir":"t"},{"pos":{"x":11.5,"y":3},"type":"spike","dir":"b"},{"pos":{"x":16.5,"y":3},"type":"spike","dir":"b"},{"pos":{"x":21.5,"y":3},"type":"spike","dir":"b"},{"pos":{"x":26.5,"y":3},"type":"spike","dir":"b"},{"pos":{"x":31.5,"y":3},"type":"spike","dir":"b"},{"pos":{"x":36.5,"y":3},"type":"spike","dir":"b"},{"pos":{"x":41.5,"y":3},"type":"spike","dir":"b"},{"pos":{"x":26.9,"y":29},"type":"spike","dir":"b"},{"pos":{"x":31.9,"y":29},"type":"spike","dir":"b"},{"pos":{"x":36.9,"y":29},"type":"spike","dir":"b"},{"pos":{"x":41.9,"y":29},"type":"spike","dir":"b"},{"pos":{"x":21.9,"y":29},"type":"spike","dir":"b"},{"pos":{"x":42,"y":20},"type":"key","taken":false}]},
        {"exits":[null,null,11,9],"blocks":[{"pos":{"x":16.5,"y":25}, "height":3, "width":3, "type":"reverse"},{"pos":{"x":0,"y":0},"height":3,"width":50,"type":"floor"},{"pos":{"x":0,"y":0},"height":50,"width":3,"type":"floor"},{"pos":{"x":42,"y":48.5},"height":1.5,"width":8,"type":"floor"},{"pos":{"x":18,"y":18},"height":3,"width":33,"type":"floor"},{"pos":{"x":35,"y":28},"height":3,"width":3,"type":"reverse"},{"pos":{"x":26,"y":46},"height":3,"width":3,"type":"reverse"},{"pos":{"x":18,"y":21},"type":"spike","dir":"b"},{"pos":{"x":23,"y":21},"type":"spike","dir":"b"},{"pos":{"x":28,"y":21},"type":"spike","dir":"b"},{"pos":{"x":33,"y":21},"type":"spike","dir":"b"},{"pos":{"x":38,"y":21},"type":"spike","dir":"b"},{"pos":{"x":3,"y":3},"type":"spike","dir":"b"},{"pos":{"x":8,"y":3},"type":"spike","dir":"b"}]}]};
        run();
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