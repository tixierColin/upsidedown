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
        this.posCalc();
        this.colDectection();
        this.exit();
    }
    reset() {
        this.pos = this.defaultPos;
        this.currentMap = 1;
        this.vel = new Vector();
        this.direction = "down";
    }
    posCalc() {
        if (this.grounded) {
            this.vel.x = 0;
            this.vel.y = 0;
            this.alreadyTouched = [];
        }
        //console.log(keys);
        if (this.grounded && keys[65]) {
            this.direction = this.direction == "up" ? "down" : "up";
        }
        if (!this.grounded) {
            if (this.direction == "down") {
                this.vel.y += 0.05;
            } else if (this.direction == "up") {
                this.vel.y -= 0.05;
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
            let col = this.collision(obstacle.width * tileMap.gridSize,
                obstacle.height * tileMap.gridSize,
                obstacle.pos.x * tileMap.gridSize,
                obstacle.pos.y * tileMap.gridSize);
            if (obstacle.type == "floor") {
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

            if (col && obstacle.type == "reverse" && !this.grounded && !this.alreadyTouched.includes(key) && keys[65]) {
                this.alreadyTouched.push(key)
                this.direction = this.direction == "up" ? "down" : "up";
                this.vel.y = 0;
                console.log(this.vel.y);
            }
            if (col && obstacle.type == "spike") {
                this.reset();
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
        }
        if (player.pos.x < 0 && currentLvl.exits[0] != null) {
            this.currentMap = currentLvl.exits[0];
            this.pos.x = 500;
        }
        if (player.pos.y < 0  && currentLvl.exits[1] != null) {
            this.currentMap = currentLvl.exits[1];
            this.pos.y = 500;
        }
        if (player.pos.y > 500 && currentLvl.exits[3] != null) {
            this.currentMap = currentLvl.exits[3];
            this.pos.y = 0;
        }
    }
}