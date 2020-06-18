ENEMIES = function Enemies() {
    this.x;
    this.y;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.pickLocation = function() {
        if ((Math.floor(Math.random() * 2 - 1) + 1 ) >= 1 ) {
            if ((Math.floor(Math.random() * 2 - 1) + 1 ) >= 1 ) {
                this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
                this.y = 0 - scale;
            }
            else {
                this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
                this.y = canvas.width;
            }
        }
        else {
            if ((Math.floor(Math.random() * 2 - 1) + 1 ) >= 1 ) {
                this.x = 0 - scale;
                this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
            }
            else {
                this.x = canvas.height
                this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
            }
        }
    }

    this.draw = function() {
        ctx.fillStyle = "#008000";
        ctx.fillRect(this.x - scale, this.y - scale, scale * 3, scale * 3)
    }

    this.update = function() {

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }

        if (this.x < 0 - scale) {
            this.x = canvas.width;
        }

        if (this.y < 0 - scale) {
            this.y = canvas.height;
        }
    }

    this.chooseSpeed = function() {

        const splitter = (Math.random() * 4)
        const scaled_x_Speed = ((Math.floor(Math.random() * rows * 0.1 - 1) + 1 ) * scale)
        const scaled_y_Speed = ((Math.floor(Math.random() * columns * 0.1 - 1) + 1 ) * scale)

        if ((splitter) > 3) {

            this.xSpeed = scaled_x_Speed
            this.ySpeed = scaled_y_Speed

        }
        else if ( 3 > (splitter) >= 2 ) {
            this.xSpeed = -scaled_x_Speed
            this.ySpeed = scaled_y_Speed

        }
        else if ( 2 > (splitter) >= 1 ) {
            this.xSpeed = scaled_x_Speed
            this.ySpeed = -scaled_y_Speed
        }
        else {
            this.xSpeed = -scaled_x_Speed
            this.ySpeed = -scaled_y_Speed

        }

        if (this.ySpeed == 0 || this.xSpeed == 0 ) {
            this.chooseSpeed()
        }
    }
}