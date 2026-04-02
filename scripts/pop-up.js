//get the entire pop up 
const popup         = document.getElementById('pop-up');    
//get the X close button element from the DOM
const closeButton  = document.getElementById("close-pop-up");

//add event listeners...
//detect if user has clicked the X close button....
closeButton.addEventListener('click', function (){
    //remove it from the page
    // popup.style.display = "none";
    popup.classList.add("hide-pop-up");
});

function get_won_message() {
    let html_content_game_won = ""
    html_content_game_won += "<h2>Hurrah, you won.</h2>"
    html_content_game_won += "<p>You did a great job guessing the word. Your vocabulary is getting stronger.</p>"
    return html_content_game_won;
}

function get_lost_message(correct_word, hint) {
    let html_content_game_lost = ""
    html_content_game_lost += "<h2>Oops, you lost.</h2>"
    html_content_game_lost += `<p>The correct word was "${correct_word}". The hint to guess this was "${hint}".</p>`
    html_content_game_lost += `<p>The bright side is you learnt something new. Better luck in next game.</p>`

    return html_content_game_lost;
}