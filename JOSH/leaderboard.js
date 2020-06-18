//import java.util.ArrayList;  // import the ArrayList class

//loading player 1 final score
const player1value = document.getElementById("player1").getAttribute("value");
const player1 = document.getElementById("player1");
const player1score = player1.getElementsByClassName("finalscore");
//checking finalscore for player 1 loaded
//console.log(player1score)

//loading player 2 final score
const player2 = document.getElementById("player2");
const player2score = player2.getElementsByClassName("finalscore");

//loading player 3 final score
const player3 = document.getElementById("player3");
const player3score = player3.getElementsByClassName("finalscore");

//loading player 4 final score
const player4 = document.getElementById("player4");
const player4score = player4.getElementsByClassName("finalscore");

//loading player 5 final score
const player5 = document.getElementById("player5");
const player5score = player5.getElementsByClassName("finalscore");

// ArrayList<String> totalscore = new ArrayList<String>();
// totalscore.add(player1score);
// totalscore.add(player2score);
// totalscore.add(player3score);
// totalscore.add(player4score);
// totalscore.add(player5score);
// console.log(totalscore)

//I wanted to use arrayLists for storing the player scores, however I couldn't figure
//out how to import the java.util package with this being a script

LEADERBOARDADJUST = function leaderboardAdjust() {
    this.adjust = function() {
        player1valueInteger = parseInt(player1value);

        //finalscore couldn't be see inside draw.js, so redefined it here
        finalscore1 = car.score * 100;

        //checking scores properly stored
        console.log(player1valueInteger)
        console.log(finalscore1)

        if (finalscore1 > player1valueInteger) {
            finalscore1string = toString(finalscore1)
            document.getElementById("player1").getAttribute("value") = finalscore1string
            player1score.innerText = finalscore1

            console.log(finalscore1string)
            //finalscore1 doesn't seem to be converting back to string
            //find another method to convert int to string so finalscore1
            //can be converted to a string

            //add in a swap names feature
            //requires a input name feature before launch
            //have names stored in server database along with high score of that user
            //when creating name check database to see if name already being used
            //if in use display: 'please choose a new name as that name is in use'
            //and don't hide the start screen
        }
        else {
            return
        }

        //repeat function every row using a for loop
        //checks every score and once a score that is lower than final score of player
        //is found execute command above to swap value, score text and name of player
    }
}