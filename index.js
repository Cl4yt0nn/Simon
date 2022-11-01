let colorArr = ['g','r','y','b'];
let colorToGuess = [];
let counter = 0;
let animRunning = true;
let pulseCounter = 0;
let pulsey = undefined;
let displayColors = undefined;
let score = -1;

if (localStorage.getItem("highscore")) {
    console.log('Highscore Successfully Loaded');
} else {
    localStorage.setItem("highscore",0);
}
document.getElementById("highscore").innerHTML = "Highscore: " + localStorage.getItem("highscore");

addEventListener('keydown',(event)=>{
    if (event.key == "q") {
        picked('g');
    } else if (event.key == "w") {
        picked('r');
    } else if (event.key == "a") {
        picked('y');
    } else if (event.key == "s") {
        picked('b');
    }
});
function startGame() {
    document.getElementById("start").disabled = true;
    document.getElementById("start").style.background = "#727272";
    animRunning = false;
    document.getElementById("start").className = "fadeout";
    score = -1;
    newColor();
}
function picked(c) {
    if (animRunning == false) {
        if (c == colorToGuess[counter]) {
            let cs = c + 's';
            document.getElementById(cs).currentTime = 0;
            document.getElementById(cs).play();
            counter++;
            document.getElementById(c).classList.add("pulse");
            setTimeout(noMorePulseClass,400);
        } else {
            endGame();
        }
        if (counter == colorToGuess.length) {
            newColor();
        }
    }
}

//NEW COLOR FUNCTION, CALL WHEN NEW COLOR NEEDS TO BE CALLED AFTER PLAYER GUESSES CORRECTLY
function newColor() {
    colorToGuess.push(colorArr[Math.round(Math.random() * (colorArr.length - 1))]);
    counter = 0;
    animRunning = true;
    setTimeout(displayColorsInterval,800);
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
    if (localStorage.getItem("highscore") < score) {
        localStorage.setItem("highscore",score);
        document.getElementById("highscore").innerHTML = "Highscore: " + localStorage.getItem("highscore");
    }
}
function displayColorsInterval() {
    displayColors = setInterval(pulses,450);
}
function pulses() {
    if (pulseCounter <= (colorToGuess.length - 1)) {
        let ps = colorToGuess[pulseCounter] + "s";
        document.getElementById(ps).currentTime = 0;
        document.getElementById(ps).play();
        pulsey = document.getElementById(colorToGuess[pulseCounter]);
        pulsey.classList.add("pulse");
        setTimeout(noMorePulseClass,400);
        pulseCounter++;
    } else {
        clearInterval(displayColors);
        pulseCounter = 0;
        animRunning = false;
    }
}
function noMorePulseClass() {
    document.getElementById("g").className = "color";
    document.getElementById("r").className = "color";
    document.getElementById("y").className = "color";
    document.getElementById("b").className = "color";
}

function endGame() {
    document.getElementById("ds").play();
    document.body.className = "flash";
    document.getElementById("start").disabled = false;
    document.getElementById("start").style.background = "#37dd58";
    colorToGuess = [];
    setTimeout(removeFlash,3100);
}
function enable() {
    document.getElementById("start").disabled = false;
}
function removeFlash() {
    document.body.className = "";
}