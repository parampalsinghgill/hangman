// fetch a word from API
const word_api_url = "https://random-word-api.herokuapp.com/word"
//fetch a file
    fetch(word_api_url)    
        //accept response    
        .then(function( response ){
            //if successful response...
            if( response.ok ){
                //...forward to next then() as JSON object
                return response.json();
            }
        })
        .then(function( data ){
            //access the JSON data by name
            //eg: if the JSON file includes a variable named message...
            console.log(data.message);
            // out01.innerHTML = `<img src='${data.message}' alt='${data.message}'>`;

        })
        //.catch if fetch failed 
        //possibly due to not running over http
        .catch(function(){            
            console.log("Catch fetch error");
        });


// build a word area
const word_to_guess = "Gaggu".toUpperCase();
const word_area = document.getElementById("word_area")
// word_area.innerHTML = "Updated"

// create containers for letters
for (let i=0; i<word_to_guess.length; i++){
  // word_area.innerHTML += "<div>i</div>"
  const alphabet_div = document.createElement("div");
  alphabet_div.classList.add("alphabet"); // for styles in css
  alphabet_div.textContent = "*";
  word_area.appendChild(alphabet_div);
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
    button.textContent = key;

    button.addEventListener("click", update_word_and_disable)   

    rowDiv.appendChild(button);
  });

  keyboard.appendChild(rowDiv);
});

function update_word_and_disable(e) {
  const button_clicked = e.target;
  const button_text = button_clicked.textContent;

  // disable the button

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
  }
}