const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let numCorrect = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = word => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = buttonEl => {
  buttonEl.disabled = true;
};

const disableAllLetterButtons = () => {
  const buttons = document.querySelectorAll('button');

  for (const button of buttons) {
    button.disabled = true;
  }
  
}


// Return `true` if `letter` is in the word.
//
const isLetterInWord = letter => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, word) => {
  const letterDivs = document.querySelectorAll(`div.${letter}`);
  
  for (const letterDiv of letterDivs) {
      letterDiv.innerHTML = letter;
      numCorrect += 1;
  }

  // if num of div.letters == len(word)
  if (word.length === numCorrect) {
    disableAllLetterButtons();
    document.querySelector('#win').style.display = '';
  }
};


// <a id="win" style="display: none;">
// Congratulations! 🥳 You won!
// </a>


//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  // Replace this with your code

  if (numWrong < 5) {
    const sharkPhoto = document.querySelector('img');
    sharkPhoto.setAttribute('src',`/static/images/guess${numWrong}.png`);
  } 
    else {
    disableAllLetterButtons()
    document.querySelector('#play-again').style.display = ''; 
  };
}

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};


// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  const buttons = document.querySelectorAll('button');
  // add an event handler to handle clicking on a letter

  for (const button of buttons) {
    button.addEventListener('click', (evt) => {
      const clickedBtn = evt.target;

      // you should disable the button so the letter can't be clicked again
      disableLetterButton(clickedBtn);
  
      const letter = clickedBtn.textContent;

      // you should then check if the currently clicked letter is in the word
      if (isLetterInWord(letter)) {
      // if it is, call `handleCorrectGuess`
        handleCorrectGuess(letter, word); 
      } else {
        // if it is not, call `handleWrongGuess`
        handleWrongGuess(letter);
      }
    })
  }

  // add an event handler to handle clicking on the Play Again button
  document.querySelector('#play-again').addEventListener('click', resetGame);
  document.querySelector('#win').addEventListener('click', resetGame);

})();