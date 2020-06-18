//all variables that can remain constant
const startMenuElement = document.querySelector(".start-menu")
const gameOverElement = document.querySelector(".game-over-message")
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 15;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const funfactor = 100;
const startButton = document.getElementById("startButton")
const restartButton = document.getElementById("restartButton")
const life1 = document.getElementById("life1")
const life2 = document.getElementById("life2")
const life3 = document.getElementById("life3")
// const finalscoreElement = document.getElementById

//all variables that change
let car;
let points;
let enemies;
let enemies2;
let enemies3;
let enemiesbonuschance = 0;
let enemiesbonuschance2 = 0;
let bonuslives;
let bonusliveschance = 0;
let spacePressed = false;
let shiftPressed = false;
let directionPast;
let finalscore;
let leaderboardadjust = new LEADERBOARDADJUST;
// let totalenemies = new TOTALENEMIES;


SETUP = (function setup() {
    car = new CAR;
    points = new POINTS;
    enemies = new ENEMIES;
    enemies2 = new ENEMIES;
    enemies3 = new ENEMIES;
    bonuslives = new BONUSLIVES;

    //gives the first points a starting place
    points.pickLocation();


        window.setInterval(() => {
            //clear previous postions of moving objects
            //update moving objects new locations based on their speeds
            //redraw all objects in their new positions
            ctx.clearRect(0,0, canvas.width, canvas.height);
            car.update();
            enemies.update();
            enemies.draw();
            enemies2.update();
            enemies2.draw();
            enemies3.update();
            enemies3.draw();
            car.draw();
            points.draw();
            bonuslives.draw();

            let hundredpercent1 = (Math.random() * 100)
            let hundredpercent2 = (Math.random() * 100)

            //once car.lives reachs 1 grants the chance that a bonus
            //life can spawn
            if (bonusliveschance == 1) {
                if (hundredpercent1 <= bonusliveschance) {
                    bonuslives.pickLocation();
                    //once spawned removes chance for additional
                    //bonus lives to spawn
                    bonusliveschance = 0;
                }
            }

            //using increments so if enemies changed such that all enemies contained within
            //one array can increment and add a new enemey to the array
            if (car.incr < 1000 && car.incr >= 500) {
                enemies.pickLocation();
                enemies.chooseSpeed();
                car.incr += 500;
                console.log(car.incr)
                //car.incr = 0     would be added with array feature
            }
            console.log(car.incr)

            if (car.incr < 2000 && car.incr >= 1500) {
                //chance to spawn a second enemy that increase with score
                if (hundredpercent2 <= enemiesbonuschance) {
                    console.log(car.incr)
                    enemies2.pickLocation();
                    enemies2.chooseSpeed();
                    enemiesbonuschance = 0;
                    car.incr += 500;
                }
            }

            if (car.incr < 3000 && car.incr >= 2500) {
                //chance to spawn a third enemy that increase with score
                if (hundredpercent2 <= enemiesbonuschance2) {
                    enemies3.pickLocation();
                    enemies3.chooseSpeed();
                    enemiesbonuschance2 = 0
                    car.incr += 500;
                }
            }


            if (car.eat(points)) {
                //reset points location
                points.pickLocation();
                //increase chance to spawn 2nd and 3rd enemies
                enemiesbonuschance += 0.1;
                enemiesbonuschance2 += 0.01;
            }

            if (car.bonuslife(bonuslives)) {
                //reveal 2nd heart indicator again
                life2.classList.remove('gone')
                //hide the bonuslives off the canvas
                bonuslives.x = canvas.width + (scale * 2) ;
                bonuslives.y = canvas.height + (scale * 2) ;
            }

            if (car.collide(enemies)) {
                //checking if player has enough lives to keep player
                //or if it is gameover
                if (car.lives > 1 ) {
                    if (car.lives == 3){
                        //respawn the enemy that hit the car
                        enemies.pickLocation();
                        enemies.chooseSpeed();
                        //lower lives
                        car.lives -= 1;
                        console.log(car.lives)
                        //adjust heart visual life indicator
                        lifeCounter()
                    }
                    else if (car.lives == 2) {
                        //trigger chance to spawn bonuslives
                        bonusliveschance = 1

                        enemies.pickLocation();
                        enemies.chooseSpeed();
                        car.lives -= 1;
                        console.log(car.lives)
                        lifeCounter()
                    }
                }
                else {
                    car.lives -= 1;
                    lifeCounter()
                    //stop the game
                    gameEnd()
                }
            }

            //repeat for second enemy (could probably combine all collides
            //if enemys stored as an array)
            if (car.collide2(enemies2)) {
                if (car.lives > 1 ) {
                    if (car.lives == 3){
                        enemies2.pickLocation();
                        enemies2.chooseSpeed();
                        car.lives -= 1;
                        console.log(car.lives)
                        lifeCounter()
                    }
                    else if (car.lives == 2) {
                        bonusliveschance = 1
                        enemies2.pickLocation();
                        enemies2.chooseSpeed();
                        car.lives -= 1;
                        console.log(car.lives)
                        lifeCounter()
                    }
                }
                else {
                    car.lives -= 1;
                    lifeCounter()
                    gameEnd()
                }
            }

            //repeat for third enemy
            if (car.collide3(enemies3)) {
                if (car.lives > 1 ) {
                    if (car.lives == 3){
                        enemies3.pickLocation();
                        enemies3.chooseSpeed();
                        car.lives -= 1;
                        console.log(car.lives)
                        lifeCounter()
                    }
                    else if (car.lives == 2) {
                        bonusliveschance = 1
                        enemies3.pickLocation();
                        enemies3.chooseSpeed();
                        car.lives -= 1;
                        console.log(car.lives)
                        lifeCounter()
                    }
                }
                else {
                    car.lives -= 1;
                    lifeCounter()
                    gameEnd()
                }
            }

            //adjust the score counter to always reflect the current score of player
            document.querySelector('.score') 
                .innerText = car.score * funfactor;

        }, 100);
}());

//checking for arrow key presses and adjusting cars direction to match
window.addEventListener('keydown', ((evt) => {
    //checking which key is pressed
    //console.log(evt)
    if (evt.key == " " || evt.key == "Shift") {
        return
    }
    else {
        const direction = evt.key.replace('Arrow','');
        car.changeDirection(direction);
        directionPast = direction;
        //checking that space and shift key presses aren't recorded as directions
        //console.log(direction)
    }
}))

//checking for keys being held down
window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

//if space or shift pressed speed up/slow the car down
function keyDownHandler(e) {
    if(e.key == " ") {
        spacePressed = true;
        car.bonusControls1(spacePressed);
    }
    else if(e.key == "Shift") {
        shiftPressed = true;
        car.bonusControls2(shiftPressed);
    }
}
//once space/shift released gives car speed in previous direction again
function keyUpHandler(e) {
    if(e.key == " ") {
        spacePressed = false;
        car.changeDirection(directionPast);
        
    }
    else if(e.key == "Shift") {
        shiftPressed = false;
        car.changeDirection(directionPast);
    }
}

function gameEnd() {

    //revealing game over screen
    gameOverElement.classList.add('show')
    //storing the final score
    finalScore = car.score * funfactor;
    //stopping and resetting the car
    car.x = 0;
    car.y = 0;
    car.xSpeed = 0;
    car.ySpeed = 0;
    //stopping and resetting the enemies
    enemies.xSpeed = 0;
    enemies.ySpeed = 0;
    enemies.x = canvas.width;
    enemies.y = canvas.height;
    enemies2.xSpeed = 0;
    enemies2.ySpeed = 0;
    enemies2.x = canvas.width;
    enemies2.y = canvas.height;
    enemies3.xSpeed = 0;
    enemies3.ySpeed = 0;
    enemies3.x = canvas.width;
    enemies3.y = canvas.height;
    car.incr = 0;

    //check for stored score
    console.log(finalScore);

    leaderboardadjust.adjust();

}

//Reset the game and relaunch the game
function newGame() {
    //removing startMenu screen
    startMenuElement.classList.add('hide')
    //removing GameOver screen
    gameOverElement.classList.remove('show')
    //resetting game
    car.score = 0;
    car.x = 0;
    car.y = 0;
    car.xSpeed = 0;
    car.ySpeed = 0;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    car.lives = 3;
    lifeCounter();
    bonusliveschance = 0;
    enemiesbonuschance = 0;
    enemiesbonuschance2 = 0;
    //relaunching game
    SETUP;

    //checking lives reset
    console.log(car.lives)
}

//checking for game start/ game restart buttons pressed
startButton.addEventListener('click', newGame)
restartButton.addEventListener('click', newGame)


function lifeCounter() {

    //resetting the life counter
    if (car.lives == 3 ) {
        life1.classList.remove('gone')
        life2.classList.remove('gone')
        life3.classList.remove('gone')
        bonuslives.x = canvas.width + (scale * 2) ;
        bonuslives.y = canvas.height + (scale * 2) ;
    }

    //hiding the life-hearts to show a life has been lost
    else if (car.lives == 2 ) {
        life3.classList.add('gone')
    }
    else if (car.lives == 1 ) {
        life2.classList.add('gone')
    }
    else if (car.lives == 0) {
        life1.classList.add('gone')
    }

}