class Player extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, "red", width, height);
        this.vel = new Vector();
        this.defaultPos = new Vector(x, y);
        this.grounded = false;
        this.direction = "down";
        this.friction = 0.8;
        this.currentMap = 1;
        this.alreadyTouched = [];
        this.keys = 0;
        this.living = true;
        this.win = false;
    }
    /*draw() {
        let image = new Image();
        image.onload = () => {
            ctx.drawImage(image, this.pos.x, this.pos.y, this.width, this.height);
        }
        image.src = "/img/rob.png" 
    }*/
    update() {
        this.draw();
        if (this.living) {
            this.posCalc();
            this.colDectection();
            this.exit();
        }
    }
    reset() {
        this.currentMap = 1;
        this.pos = new Vector(this.defaultPos.x, this.defaultPos.y);
        this.vel = new Vector();
        this.direction = "down";
        this.keys = 0;
        tileMap.resetKeys();
        this.living = true;
        this.win = false;
    }
    posCalc() {
        if (this.grounded) {
            this.vel.x = 0;
            this.vel.y = 0;
            this.alreadyTouched = [];
        }
        if (this.grounded && keys[65]) {
            this.direction = this.direction == "up" ? "down" : "up";
        }
        if (!this.grounded) {
            if (this.direction == "down") {
                this.vel.y += 0.2;
            } else if (this.direction == "up") {
                this.vel.y -= 0.2;
            }
            if (keys[37]) {
                this.vel.x -= 0.55;
            } else if (keys[39]) {
                this.vel.x += 0.55;
            }
        }
        
        this.vel.x *= this.friction;
        this.pos.add(this.vel);
    }
    colDectection() {
        let fall = true;
        let obstacles = tileMap.getMap(this.currentMap).blocks;
        for (let [key, obstacle] of Object.entries(obstacles)) {
            let col = false;
            if (obstacle.type != "spike") {
                col = this.collision(obstacle.width * tileMap.gridSize,
                    obstacle.height * tileMap.gridSize,
                    obstacle.pos.x * tileMap.gridSize,
                    obstacle.pos.y * tileMap.gridSize);
            } else {
                let triangle = [];
                let obj = {
                    "pos": {
                        "x": obstacle.pos.x * tileMap.gridSize,
                        "y": obstacle.pos.y * tileMap.gridSize
                    },
                    "width": obstacle.width * tileMap.gridSize,
                    "height": obstacle.height * tileMap.gridSize
                }
                if (obstacle.dir == "l") { // left
                    triangle[0] = Point(obj.pos.x, obj.pos.y + (obj.height * 0.58));
                    triangle[1] = Point(obj.pos.x + obj.width, obj.pos.y);
                    triangle[2] = Point(obj.pos.x + obj.width, obj.pos.y + obj.height);
                } else if (obstacle.dir == "r") { // right
                    triangle[0] = Point(obj.pos.x, obj.pos.y);
                    triangle[1] = Point(obj.pos.x, obj.pos.y + obj.height);
                    triangle[2] = Point(obj.pos.x + obj.width, obj.pos.y + (obj.height * 0.42)); 
                } else if (obstacle.dir == "b") { // buttom
                    triangle[0] = Point(obj.pos.x, obj.pos.y);
                    triangle[1] = Point(obj.pos.x + obj.width, obj.pos.y);
                    triangle[2] = Point(obj.pos.x + (obj.width * 0.58), obj.pos.y + obj.height);
                } else { // top
                    triangle[0] = Point(obj.pos.x + (obj.width * 0.42), obj.pos.y);
                    triangle[1] = Point(obj.pos.x, obj.pos.y + obj.height);
                    triangle[2] = Point(obj.pos.x + obj.width, obj.pos.y + obj.width);
                }
                col =   IsPointInTriangle(Point(this.pos.x, this.pos.y), triangle[0], triangle[1], triangle[2]) ||
                        IsPointInTriangle(Point(this.pos.x + this.width, this.pos.y), triangle[0], triangle[1], triangle[2]) ||
                        IsPointInTriangle(Point(this.pos.x, this.pos.y + this.height), triangle[0], triangle[1], triangle[2]) ||
                        IsPointInTriangle(Point(this.pos.x + this.width, this.pos.y + this.height), triangle[0], triangle[1], triangle[2]);
            }
            
            if (obstacle.type == "floor" && col) {
                if (col == "bottom") {
                    this.pos.y = obstacle.pos.y * tileMap.gridSize - this.height - 0.3;
                    if (this.direction == "down") {
                        this.grounded = true;
                        fall = false;
                    }
                }
                if (col == "top") {
                    this.pos.y = obstacle.pos.y * tileMap.gridSize + obstacle.height * tileMap.gridSize + 0.3;
                    if (this.direction == "up") {
                        this.grounded = true;
                        fall = false;
                    }
                } if (col == "right") {
                    this.pos.x = obstacle.pos.x * tileMap.gridSize - this.width - 0.3;
                    this.vel.x = 0
                }
                if (col == "left") {
                    this.pos.x = obstacle.pos.x * tileMap.gridSize + obstacle.width * tileMap.gridSize + 0.3;
                    this.vel.x = 0
                }
            }
            if (col && obstacle.type == "key" && !obstacle.taken) {
                obstacle.taken = true;
                this.keys ++;
            }
            if (col && obstacle.type == "reverse" && !this.grounded && !this.alreadyTouched.includes(key) && keys[65]) {
                this.alreadyTouched = [];
                this.alreadyTouched.push(key)
                this.direction = this.direction == "up" ? "down" : "up";
                this.vel.y = 0;
            }
            if (col && obstacle.type == "spike") {
               this.living = false;
            }
            if (col && obstacle.type == "door") {
                if (obstacle.numKeyReq != this.keys) {
                    ctx.fillStyle = "white";
                    ctx.font = "30px Arial";
                    ctx.textAlign = "center"; 
                    ctx.fillText(`missing ${obstacle.numKeyReq - this.keys} keys!`, canvas.width/2, canvas.height/2 +30);
                } else {
                    ctx.fillStyle = "white";
                    ctx.font = "30px Arial";
                    ctx.textAlign = "center"; 
                    ctx.fillText("press \"E\" to escape", canvas.width/2, canvas.height/2 +30);
                    if (keys[69]) {
                        this.win = true;
                    }
                }
            }
        }
        if (fall) {
            this.grounded = false;
        }
    }

    exit() {
        let currentLvl = tileMap.getMap(this.currentMap);
        if (player.pos.x > 500 && currentLvl.exits[2] != null) {
            this.currentMap = currentLvl.exits[2];
            this.pos.x = 0;
        } else if (player.pos.x > 500) {
            this.living = false;
        }
        if (player.pos.x + this.width < 0 && currentLvl.exits[0] != null) {
            this.currentMap = currentLvl.exits[0];
            this.pos.x = 500;
        } else if (player.pos.x + this.width < 0) {
            this.living = false;
        }
        if (player.pos.y + this.height < 0  && currentLvl.exits[1] != null) {
            this.currentMap = currentLvl.exits[1];
            this.pos.y = 500;
        } else if (player.pos.y + this.height < 0) {
            this.living = false;
        }
        if (player.pos.y > 500 && currentLvl.exits[3] != null) {
            this.currentMap = currentLvl.exits[3];
            this.pos.y = 0;
        } else if (player.pos.y > 500) {
            this.living = false;
        }
    }
}


/* ######################################################################################################## */
/* ######################################################################################################## */
/* ######################################################################################################## */


let Point = (x,y) => {return {x,y}}

function IsPointInTriangle(pt, v1, v2, v3) {
    let ABCArea = CalcTringleArea(v1, v2, v3),
        PBCArea = CalcTringleArea(pt, v2, v3),
        PACArea = CalcTringleArea(pt, v1, v3),
        PABArea = CalcTringleArea(v1, v2, pt);

        return (ABCArea == (PBCArea + PACArea + PABArea)); 
}

function CalcTringleArea(v1, v2, v3) {
    return Math.abs(((v1.x * (v2.y - v3.y)) + (v2.x * (v3.y - v1.y)) + (v3.x * (v1.y - v2.y)))/2);
}