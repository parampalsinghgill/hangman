// 
const MAX_WRONG_GUESSES = 7;
let current_wrong_guesses = 0;
let correct_alphabets = [];

// from pop up section
const popup_content = document.getElementById("pop_up_content");

// from wrapper section
// get the word_area element
const word_area = document.getElementById("word_area")
const wrong_guesses_tracker = document.getElementById("wrong_guesses_tracker")
const hangman_image = document.getElementById("hangman_image")
// const btn_new_game = document.getElementById("btn_new_game")
const wrong_guess_container = document.getElementById("wrong_guess_container")

// link the start_new_game method to the btn_new_game class, one btn on main page, second on pop up
const new_game_buttons = document.querySelectorAll(".btn-new-game");
console.dir(new_game_buttons);
new_game_buttons.forEach(btn => {
  btn.addEventListener("click", start_new_game);
});

let handler_toggle_warning = null;

// 
// btn_new_game.addEventListener("click", start_new_game);

// fetch a word from API
let word_to_guess = "";
let word_to_guess_hint = "";
//fetch a word, making function async

async function fetch_word_and_hint () {
  const word_api_url = "https://radom-words-api-plum.vercel.app/word"
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
    // add it to correct_alphabets array
    correct_alphabets.push(button_text);

    // get all the divs under word_area
    // Get all div elements inside the container
    const alphabet_divs = word_area.querySelectorAll("div");

    // put that alphabet in all the div correspondint to the word_to_guess
    for (let i=0; i<word_to_guess.length; i++) {
      if (button_text == word_to_guess[i]) {
        alphabet_divs[i].textContent = button_text;
      }
    }
    // check if game is won
    if (is_game_won(word_to_guess, correct_alphabets))
    {
      console.log("Game is won");
      let won_html = get_won_message();
      popup_content.innerHTML = won_html;
      popup.classList.remove("hide-pop-up");
      popup.classList.add("show-pop-up");
    }
  }
  else {
    console.log(`${button_text} does not exist`);
    // update the image
    let current_img_src = hangman_image.src;
    console.log(current_img_src);
    // split by / and get th last element in array
    let current_img_filename = current_img_src.split("/").pop();
    console.log(current_img_filename);
    let match = current_img_filename.match(/\d+/);
    console.log(match);
    let new_img_number = Number(match[0]) + 1;
    console.log(new_img_number);
    hangman_image.src = `images/hangman/hangman-${new_img_number}.PNG`

    // update wrong guess counter
    current_wrong_guesses++;
    update_guesses_tracker();

    if (current_wrong_guesses == 5) {
      handler_toggle_warning = setInterval(() => {
        toggle_warning(wrong_guess_container);
        }, 1000);
    }

    if (current_wrong_guesses == MAX_WRONG_GUESSES) {
      let lost_html = get_lost_message(word_to_guess, word_to_guess_hint);
      popup_content.innerHTML = lost_html;
      popup.classList.remove("hide-pop-up");
      popup.classList.add("show-pop-up");
      // start_new_game();

      // todo change the alert to a nice pop up
      // if wront guess counter = 7, pop up that use has lost, with a close button option
      // alert("You lost.");      
    }
  }
}

// when a new game  starts, on first loading a page, refreshing a page or clicking new_game button
function start_new_game() {
  console.log("New Game function fired");

  // hide pop up (if new game clicked from the pop up window)
  popup.classList.add("hide-pop-up");
  // clear handler anyways
  clearInterval(handler_toggle_warning);
  // remove the waring class from container in case
  wrong_guess_container.classList.remove("warning");
  // enable all buttons
  const buttons = document.querySelectorAll("button.button-disabled");
  // loop through them and enable all disabled
  buttons.forEach(btn => {
    btn.disabled = false;
    btn.classList.add("button-enabled");
    btn.classList.remove("button-disabled");
  });
  // reset the picture
  hangman_image.src = `images/hangman/hangman-0.PNG`

  // reset the wrong counter
  current_wrong_guesses = 0;

  // clear the previous word area
  const divs = word_area.querySelectorAll("div");
  divs.forEach(div => div.remove());

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

function is_game_won(word, correct_alphabets) {
  for (let letter of word) {
    if (!correct_alphabets.includes(letter)) {
      return false;
    }
  }
  return true;
}

function toggle_warning(dom_element) {
  dom_element.classList.toggle("warning");
}


start_new_game();
