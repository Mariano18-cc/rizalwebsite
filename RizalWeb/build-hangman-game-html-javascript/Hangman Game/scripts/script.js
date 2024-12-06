// Function to play a sound dynamically
const playSound = (soundPath) => {
    const audio = new Audio(soundPath);
    audio.play();
};

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount, isGameOver;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    isGameOver = false; // Reset game-over state
    hangmanImage.src = "gameimage/Pic-0.png";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord
        .split("")
        .map((char) => {
            if (char === " ") {
                return `<li class="space"></li>`;
            }
            return `<li class="letter"></li>`;
        })
        .join("");
    keyboardDiv.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
    gameModal.classList.remove("show");
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = (isVictory) => {
    isGameOver = true; // Mark the game as over
    const modalText = isVictory ? `You found the word:` : "The correct word was:";
    gameModal.querySelector("img").src = `images/${isVictory ? "Thumbs up" : "Over"}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? "Ikaw ang pag-asa nang bayan" : "Game Over!";
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");

    // Play the appropriate end-game sound
    playSound(isVictory ? "sound/victory.mp3" : "sound/failed.mp3");
};

const initGame = (button, clickedLetter) => {
    if (isGameOver) return; // Prevent further actions if the game is over

    let correctGuess = false;

    [...currentWord].forEach((letter, index) => {
        if (letter === clickedLetter && !wordDisplay.querySelectorAll("li")[index].classList.contains("guessed")) {
            correctLetters.push(index);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            correctGuess = true;
        } else if (letter === " " && wordDisplay.querySelectorAll("li")[index].classList.contains("space")) {
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    });

    if (correctGuess) {
        if (!isGameOver) playSound("sound/correct.mp3"); // Play correct sound only if game is not over
    } else {
        wrongGuessCount++;
        hangmanImage.src = `gameimage/Pic-${wrongGuessCount}.png`;
        if (!isGameOver) playSound("sound/wrong.mp3"); // Play wrong sound only if game is not over
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Check for game over conditions
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.replace(/\s+/g, "").length) return gameOver(true);
};

// Create keyboard buttons and add event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
