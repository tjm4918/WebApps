CAR = function Car() {
    //car variables
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 1;
    this.tail = [];
    this.score = 0;
    this.lives = 3;
    this.incr= 0;

    this.draw = function() {
        //drawing the car

        for (let i=0; i<this.tail.length; i++) {
            ctx.fillStyle = "#8B4513"
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillStyle = "#FFDEAD";
        ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function() {

        //updating the tails position behind the car

        for (let i=0; i<this.tail.length -1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y };

        //updating the current position of the car based on its speed

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        //allowing the car to go off the canvas and loop back on the opposite side

        if (this.x >= canvas.width) {
            this.x = 0;
        }

        if (this.y >= canvas.height) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }
    }


    this.changeDirection = function(direction) {

        //change car speed/direction based on direction input from arrow keys
        switch(direction) {
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = -scale * 1;
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = scale * 1;
                break;
            case 'Left':
                this.xSpeed = -scale * 1;
                this.ySpeed = 0;
                break;
            case 'Right':
                this.xSpeed = scale * 1;
                this.ySpeed = 0;
                break;
        }
    }

    this.bonusControls1 = function(spacePressed) {

        //stopping/starting car when space pressed
        if (spacePressed) {
            this.xSpeed = 0;
            this.ySpeed = 0; 

        }
    }
    this.bonusControls2 = function(shiftPressed) {

        //speeding the car up when shift pressed
        if (shiftPressed ===true) {

            //making sure speeding up in same direction as currently moving
            if (this.xSpeed > 1 * scale || this.ySpeed > 1 * scale ||
                this.xSpeed < -( 1 * scale )|| this.ySpeed < -( 1 * scale )) {
                return;
            }
            else {
                this.xSpeed = this.xSpeed * 2;
                this.ySpeed = this.ySpeed * 2; 
            }
        }
        
    }


    this.eat = function(points) {

        //check for collision of car and point
        if (this.x === points.x && this.y === points.y) {
            //increase car score
            this.score++;

            //increase increment
            this.incr += 100;
            //check increment increase
            //console.log(this.incr)
            return true;
        }

        return false;
    }

    this.collide = function(enemies) {

        //check for collision between enemies and car
        if ((this.x == enemies.x && this.y == enemies.y) ||
            (this.x == enemies.x - scale && this.y == enemies.y) ||
            (this.x == enemies.x - scale && this.y == enemies.y - scale) ||
            (this.x == enemies.x - scale && this.y == enemies.y + scale) ||
            (this.x == enemies.x && this.y == enemies.y - scale) ||
            (this.x == enemies.x && this.y == enemies.y + scale) ||
            (this.x == enemies.x + scale && this.y == enemies.y) ||
            (this.x == enemies.x + scale && this.y == enemies.y - scale) ||
            (this.x == enemies.x + scale && this.y == enemies.y + scale)) {
            return true;
        }

        return false;
    }

    this.collide2 = function(enemies2) {

        //check for collision between enemies and car
        if ((this.x == enemies2.x && this.y == enemies2.y) ||
            (this.x == enemies2.x - scale && this.y == enemies2.y) ||
            (this.x == enemies2.x - scale && this.y == enemies2.y - scale) ||
            (this.x == enemies2.x - scale && this.y == enemies2.y + scale) ||
            (this.x == enemies2.x && this.y == enemies2.y - scale) ||
            (this.x == enemies2.x && this.y == enemies2.y + scale) ||
            (this.x == enemies2.x + scale && this.y == enemies2.y) ||
            (this.x == enemies2.x + scale && this.y == enemies2.y - scale) ||
            (this.x == enemies2.x + scale && this.y == enemies2.y + scale)) {
            return true;
        }

        return false;
    }

    this.collide3 = function(enemies3) {

        //check for collision between enemies and car
        if ((this.x == enemies3.x && this.y == enemies3.y) ||
            (this.x == enemies3.x - scale && this.y == enemies3.y) ||
            (this.x == enemies3.x - scale && this.y == enemies3.y - scale) ||
            (this.x == enemies3.x - scale && this.y == enemies3.y + scale) ||
            (this.x == enemies3.x && this.y == enemies3.y - scale) ||
            (this.x == enemies3.x && this.y == enemies3.y + scale) ||
            (this.x == enemies3.x + scale && this.y == enemies3.y) ||
            (this.x == enemies3.x + scale && this.y == enemies3.y - scale) ||
            (this.x == enemies3.x + scale && this.y == enemies3.y + scale)) {
            return true;
        }

        return false;
    }

    this.bonuslife = function(bonuslives) {

        //check for collision of car and bonus lives
        if (this.x === bonuslives.x && this.y === bonuslives.y) {
            //increase cars life
            this.lives++;
            console.log(this.lives)
            return true;
        }

        return false;
    }

    // this.chooseVehicle = function() {
    // }
}

