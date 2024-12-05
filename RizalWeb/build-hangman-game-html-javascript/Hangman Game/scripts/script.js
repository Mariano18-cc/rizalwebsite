const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Resetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "gameimage/Pic-0.png"; // Assuming Pic-0.png is the starting image
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord
        .split("")
        .map((char) => {
            if (char === " ") {
                return `<li class="space"></li>`; // Empty placeholder for spaces
            }
            return `<li class="letter"></li>`; // Placeholder for letters
        })
        .join("");
    keyboardDiv.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
    gameModal.classList.remove("show");
};

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Keep spaces intact
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = (isVictory) => {
    // After the game is complete, showing the modal with relevant details
    const modalText = isVictory ? `You found the word:` : "The correct word was:";
    gameModal.querySelector("img").src = `images/${isVictory ? "Thumbs up" : "Over"}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? "Ikaw ang pag-asa nang bayan" : "Game Over!";
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
};

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter exists in the currentWord
    let correctGuess = false;

    [...currentWord].forEach((letter, index) => {
        if (letter === clickedLetter && !wordDisplay.querySelectorAll("li")[index].classList.contains("guessed")) {
            correctLetters.push(index); // Track correct letter index
            wordDisplay.querySelectorAll("li")[index].innerText = letter; // Reveal the letter
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            correctGuess = true;
        } else if (letter === " " && wordDisplay.querySelectorAll("li")[index].classList.contains("space")) {
            // Automatically mark spaces as guessed
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    });

    if (!correctGuess) {
        // Increment wrong guesses and update the hangman image
        wrongGuessCount++;
        hangmanImage.src = `gameimage/Pic-${wrongGuessCount}.png`;
    }

    button.disabled = true; // Disable the clicked button
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
