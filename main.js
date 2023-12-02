let currMoleTile;
let score = 0;
let molesPeeped = 0;
let maxMoles = 10; // Set the maximum number of moles to peep (this will peep 10 moles in total)
let gameOver = false;

// this will start the game
function startGAME() { 
  buttonstart = document.getElementById("start"); //this is the start button
  buttonstart.addEventListener("click", setGame);
}

// 1000 milliseconds = 1 second, every 1 second it will spawn a mole in a hole
function setGame() {
  setInterval(setMole, 1000); 
}

let randomnum = Math.floor(Math.random() * 9);

// make a new number so it will not be the same
function getRandomTile() {
  let newnum;

  do {
    newnum = Math.floor(Math.random() * 9); 
  } while (newnum === randomnum);

  randomnum = newnum;
  return randomnum;
}

function setMole() {
  // Check if maximum number of moles has been peeped 
  if (gameOver || molesPeeped >= maxMoles) {
    endGame(); // End the game (gameoverscreen)
    return;
  }

  // Clear the current mole tile another mole will peep
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }

  // mole element
  let mole = document.createElement("img");
  mole.src = "./mole.png"; 

  // random tile for the mole to peep
  let num = getRandomTile();

  // Set the current mole tile and append a ("child") the mole to it
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);

  // Add a click event listener to the mole to known if a mole is clicked
  mole.addEventListener("click", moleHit);

  // Increment the count of moles peeped
  molesPeeped++;

  // Check if the maximum number of moles has been reached (end of the game) 
  if (molesPeeped >= maxMoles) {
    endGame();
  }
}

function moleHit() {
  // Display a new image of a whacked mole ("a mole that's been hit")
  currMoleTile.innerHTML = "";
  let whackedMole = document.createElement("img");
  whackedMole.src = "./whacked-mole.png"; 
  currMoleTile.appendChild(whackedMole);

  // Update the score by 10 (perfect score is 100) 
  score += 10;
  document.getElementById("score").innerText = score.toString();
}

function endGame() {
  // Check if the game is over
  if (gameOver) {
    return;
  }

  gameOver = true;

  // Display game over screen after delay (2sec)
  setTimeout(() => {
    let gameOverScreen = document.createElement("div");
    gameOverScreen.innerHTML = "<h1>Game Over!</h1>";

    // Display the final score
    let finalScore = document.createElement("p");
    finalScore.innerText = "Final Score: " + score;
    gameOverScreen.appendChild(finalScore);

    // Display the number of moles peeped
    let molesPeepedText = document.createElement("p");
    molesPeepedText.innerText = "Moles Peeped: " + molesPeeped;
    gameOverScreen.appendChild(molesPeepedText);

    // Display a start button to restart the game
    let startButton = document.createElement("button");
    startButton.innerText = "Play Again";
    startButton.addEventListener("click", restartGame);
    gameOverScreen.appendChild(startButton);

    // Append game over screen to another container so that it will be displayed
    document.body.appendChild(gameOverScreen);
  }, 2000); // the delay time before the game over screen (2sec)
}

function restartGame() {
  // Start the game again
  // this will re-fresh the tab hehehe ;) 
  location.reload();
}