// 
const MAX_WRONG_GUESSES = 7;
let current_wrong_guesses = 0;

// get the word_area element
const word_area = document.getElementById("word_area")
const wrong_guesses_tracker = document.getElementById("wrong_guesses_tracker")

// fetch a word from API
let word_to_guess = "";
let word_to_guess_hint = "";
//fetch a word, making function async

async function fetch_word_and_hint () {
  const word_api_url = "https://random-words-api-plum.vercel.app/word"
  try {
    const response = await fetch(word_api_url);

    if( !response.ok ) {
      console.log("Errro getting response")
    }

    const data = await response.json();
    const word = data[0].word.toUpperCase()
    const hint = data[0].definition;

    return {word, hint};
  }
  catch(err){            
        console.error("Catch fetch error", err);
        
        // use words.json as backup.. the api has been very unreliable
        try {
          const response = await fetch("data/words.json");

          if (!response.ok) {
            console.log("Errro getting response");
          }

          const data = await response.json();

          // Pick random item
          const randomIndex = Math.floor(Math.random() * data.length);
          const item = data[randomIndex];

          return {
            word: item.word.toUpperCase(),
            hint: item.hint
          };

        } catch (err) {
          console.error("Error:", err);
          return null;
        }
    }
}

// build a word area
function update_word_area(word, hint) {
  // create containers for letters
  for (let i=0; i<word.length; i++){
    // word_area.innerHTML += "<div>i</div>"
    const alphabet_div = document.createElement("div");
    alphabet_div.classList.add("alphabet"); // for styles in css
    alphabet_div.textContent = "*";
    word_area.appendChild(alphabet_div);
  }

  // update the hint
  const hint_text = document.getElementById("hint_text");
  hint_text.textContent = `${hint}`

}


// build a keyboard
const keyboard = document.getElementById("keyboard")

const keyboardLayout = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Z","X","C","V","B","N","M"]
];

// put keys on keyboard id
keyboardLayout.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row"); // row class css in the style.css

  row.forEach(key => {
    const button = document.createElement("button");
    button.classList.add("button-enabled");
    button.textContent = key;

    button.addEventListener("click", update_word_and_disable_button)   

    rowDiv.appendChild(button);
  });

  keyboard.appendChild(rowDiv);
});

function update_word_and_disable_button(e) {
  const button_clicked = e.target;
  console.log(button_clicked);
  const button_text = button_clicked.textContent;

  // disable the button
  button_clicked.disabled = true;
  button_clicked.classList.remove("button-enabled");
  button_clicked.classList.add("button-disabled");

  // update the guess word if this alphabet is in the word being guessed
  if (word_to_guess.includes(button_text)) {
    console.log(`${button_text} is present`);
    // get all the divs under word_area
    // Get all div elements inside the container
    const alphabet_divs = word_area.querySelectorAll("div");

    // put that alphabet in all the div correspondint to the word_to_guess
    for (let i=0; i<word_to_guess.length; i++) {
      if (button_text == word_to_guess[i]) {
        alphabet_divs[i].textContent = button_text;
      }
    }
  }
  else {
    console.log(`${button_text} does not exist`);
    // update the image

    // update wrong guess counter
    current_wrong_guesses++;
    update_guesses_tracker();

    if (current_wrong_guesses == MAX_WRONG_GUESSES) {
      start_new_game();

      // todo change the alert to a nice pop up
      alert("You lost.");      
    }
    
    // if wront guess counter = 6, pop up that use has lost, with a close button option
  }
}

// when a new game  starts, on first loading a page, refreshing a page or clicking new_game button
function start_new_game() {
  // enable all buttons

  // updated word area
  fetch_word_and_hint().then(function (result){
    if (result) {
      console.log("Word:", result.word);
      console.log("Hint:", result.hint);
      word_to_guess = result.word;
      word_to_guess_hint = result.hint;

      update_word_area(word_to_guess, word_to_guess_hint);
      update_guesses_tracker();
    }
  });
}

function update_guesses_tracker() {
  wrong_guesses_tracker.textContent = `${current_wrong_guesses}/${MAX_WRONG_GUESSES}`;
}


start_new_game();
