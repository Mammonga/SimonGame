var buttonColors=["red","blue","green","yellow"];
var randomChosenColor;
var gamePattern=[];
var userClickedPattern=[];
var gameState=false;
var level=0;

function nextSequence(){
    level++;

    $("h1").text("level "+ level);

    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);


}

$(".btn").click(function(){
     var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(color){
    var audio= new Audio("./sounds/"+color+".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed")
    setTimeout(function(){
        $("#"+color).removeClass("pressed")
    },100)
}

$(document).keypress(function(){
    if(gameState!=true){
        nextSequence();
        gameState=true;
    }
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
    if(userClickedPattern.length=== gamePattern.length)
        {
            setTimeout(function(){
                userClickedPattern=[];
                nextSequence();
            },1000)
        }}else{
            $("h1").text("Game Over");
            var wrong=new Audio("./sounds/wrong.mp3");
            wrong.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200)
            setTimeout(function(){
                startOver();
            },5000)
        }

    }
function startOver(){
    userClickedPattern=[];
    gamePattern=[];
    $("h1").text("Press A Key to Start");
    gameState=false;
    level=0;
}