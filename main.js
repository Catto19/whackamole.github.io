let interval;
let currMoleTile;
let score = 0;
let total = 0;
let molesPeeped = 0;
let maxMoles = 10;
let gameOver = false;
let currentLevel = 1;
let maxScore;

function startGame() { 
  document.getElementById("start").style.display = "none";
  setGame();
}

function setGame() { // Set up the game based on the current level
  if (currentLevel === 1) {
    interval = setInterval(setMole, 2500);
    maxScore = 100;
  } else if (currentLevel === 2) {
    interval = setInterval(setMole, 2000);
    maxMoles = 15;
    maxScore = 150;
  } else if (currentLevel === 3) {
    interval = setInterval(setMole, 1500);
    maxMoles = 20;
    maxScore = 200;
  }else if (currentLevel === 4) {
    interval = setInterval(setMole, 1000);
    maxMoles = 25;
    maxScore = 250;
  }
  updateDisplay(); // Display current level and score on the screen
}

function updateDisplay() { // Update the display with the current level and score
  document.getElementById("score").innerText = "Level: " + currentLevel + " | Score: " + score;
}

let randomnum = Math.floor(Math.random() * 9);
function getRandomTile() { // make a new number so it will not be the same
  let newnum;

  do {
    newnum = Math.floor(Math.random() * 9); 
  } while (newnum === randomnum);

  randomnum = newnum;
  return randomnum;
}

function setMole() {
  if (currMoleTile) {
    currMoleTile.innerHTML = ""; // Clear the current mole tile another mole will peep
  }
  if (molesPeeped == maxMoles) { // Check if the maximum number of moles has been reached (end of the game) 
    endGame();
    return;
  }
  let mole = document.createElement("img");  // mole element
  mole.src = "mole.png"; 
  let num = getRandomTile(); // random tile for the mole to peep
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
  mole.addEventListener("click", moleHit);
  molesPeeped++; // num of moles peeped
}

function moleHit() { // Display a new image of a whacked mole ("a mole that's been hit")
  currMoleTile.innerHTML = "";
  let whackedMole = document.createElement("img");
  whackedMole.src = "whacked-mole.png"; 
  currMoleTile.appendChild(whackedMole);
  score += 10; // Update the score by 10 
  document.getElementById("score").innerText = score.toString();
  updateDisplay();
}

function endGame() {
  total += score;
  gameOver = true;
  clearInterval(interval);  
  if (score >= maxScore) {
    if (currentLevel < 4) {
      nextLevel();
    } else {
      winner();
    }
  } else {
    playAgainGameOver();
  }
}


function playAgainGameOver() {  
  let gameOverScreen = document.createElement("div");
  gameOverScreen.innerHTML = "<h1>Game Over!</h1>";

  let finalScore = document.createElement("p"); // Display final score
  finalScore.innerText = "Final Score: " + total;
  gameOverScreen.appendChild(finalScore);

  let molesPeepedText = document.createElement("p"); // Display moles peeped count
  molesPeepedText.innerText = "Moles Peeped: " + molesPeeped;
  gameOverScreen.appendChild(molesPeepedText);

  let gameOverButton = document.createElement("button"); // Display a start button to restart the game
  gameOverButton.innerText = "Play Again";
  gameOverButton.addEventListener("click", () => {restartGame()});
  gameOverScreen.appendChild(gameOverButton);

  document.body.appendChild(gameOverScreen); // Append game over screen 

function nextLevel() {
  currentLevel+=1
  
    let nextLevelScreen = document.createElement("div");
    nextLevelScreen.innerHTML = "<h1>Next Level!</h1>";
    
    let totalScore = document.createElement("p");
    totalScore.innerText = "Total Score: " + total;
    nextLevelScreen.appendChild(totalScore);

    let molesPeepedText = document.createElement("p");
    molesPeepedText.innerText = "Moles Peeped: " + molesPeeped;
    nextLevelScreen.appendChild(molesPeepedText);

    let nextLevelButton = document.createElement("button");
    nextLevelButton.innerText = "Play Next Level";
    nextLevelButton.addEventListener("click", () => {
    resetGame();
    setGame(); 
    document.body.removeChild(nextLevelScreen);
    })
    nextLevelScreen.appendChild(nextLevelButton);
    document.body.appendChild(nextLevelScreen);
    currMoleTile.innerHTML = "";
    
}

function winner() {
  let WinnerScreen = document.createElement("div");
  WinnerScreen.innerHTML = "<h1>YOU WON!</h1>";
  let playAgainButton = document.createElement("button");
  playAgainButton.innerText = "Play Again";
  playAgainButton.addEventListener("click", restartGame);
  WinnerScreen.appendChild(playAgainButton);
  document.body.appendChild(WinnerScreen);
}

function resetGame() {
  score = 0;
  molesPeeped = 0;
  gameOver = false;
  currMoleTile.innerHTML = "";
}

function restartGame() { // Start the game again reload the page
  location.reload();
}
