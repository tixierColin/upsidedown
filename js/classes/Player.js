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
                if (obstacle.dir == "t" || obstacle.dir == "b") {
                    col = this.collision(20,
                        obstacle.height * tileMap.gridSize,
                        obstacle.pos.x * tileMap.gridSize + obstacle.width * tileMap.gridSize/2 -10,
                        obstacle.pos.y * tileMap.gridSize);
                } else {
                    col = this.collision(obstacle.width * tileMap.gridSize,
                        20,
                        obstacle.pos.x * tileMap.gridSize,
                        obstacle.pos.y * tileMap.gridSize + obstacle.height * tileMap.gridSize/2 -10);
                }
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