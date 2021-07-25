// jshint esversion: 6
const startBtn = document.getElementById("testbutton1");

var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red" , "blue" , "green" , "yellow"];

var level = -1;
var started = true;

$(".testbutton").click(function() {
  if (started) {
    $("#level-title").text("Your Score is  " + level);
    nextSequence();
    started = false;
    startBtn.style.display = "none";
  }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over!! Final Score "+level);
        startBtn.style.display = "inline";
        $("#testbutton1").text("Restart");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        startOver();
      }

}

function nextSequence(){
   userClickedPattern = [];
   level++;
   $("#level-title").text("Score " + level);
   var randomNumber = Math.random();
   randomNumber = randomNumber * 4;
   randomNumber  = Math.floor(randomNumber);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);
}


function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

function startOver() {
  level = -1;
  gamePattern = [];
  started = true;
}
