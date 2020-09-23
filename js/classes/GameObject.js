class GameObject {
    constructor(x, y, color, width, height, img) {
        this.pos = new Vector(x, y);
        this.color = color;
        this.width = width;
        this.height = height;
        this.img = img;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y,
        this.width, this.height)
    }

    collision(width, height, x, y) {
        let colDir = false;
        let vX = (this.pos.x + (this.width / 2)) - (x + (width / 2));
        let vY = (this.pos.y + (this.height / 2)) - (y + (height / 2));
        let halfWidth = (this.width / 2) + (width / 2);
        let halfHeight = (this.height / 2) + (height / 2);


        if (Math.abs(vX) < halfWidth + 0.5 && Math.abs(vY) < halfHeight + 0.5) {
            let oX = halfWidth - Math.abs(vX);
            let oY = halfHeight - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "top";
                } else {
                    colDir = "bottom";
                }
            } else {
                if (vX > 0) {
                    colDir = "left";
                } else {
                    colDir = "right";
                }
            }
        }
        return colDir;
    }
}