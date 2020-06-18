BONUSLIVES = function BonusLives() {
    this.x = canvas.width + (scale * 2) ;
    this.y = canvas.height + (scale * 2) ;
    this.flash = 0;
    this.border = 3;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    }

    this.draw = function() {
        if (this.flash == 0) {
            ctx.fillStyle = "#1bd9a6";
            ctx.fillRect(this.x, this.y, scale, scale)
            ctx.fillStyle = "#c3d9d3"
            ctx.fillRect(this.x + this.border, this.y + this.border, scale - (this.border * 2), scale - (this.border * 2))
            this.flash += 1;
        }
        else {
            ctx.fillStyle = "#c3d9d3";
            ctx.fillRect(this.x, this.y, scale, scale)
            ctx.fillStyle = "#1bd9a6"
            ctx.fillRect(this.x + this.border, this.y + this.border, scale - (this.border * 2), scale - (this.border * 2))
            this.flash -= 1;
        }

    }
}