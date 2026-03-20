/******************************************************************
 * PART A
 ******************************************************************/

/*
part_a elements
*/
const bike_image_element = document.getElementById("bike-image");
const btn_spin = document.getElementById("btn-spin");
const btn_reverse_spin = document.getElementById("btn-reverse-spin");
const btn_stop = document.getElementById("btn-stop");
const product_image_min_num = 1;
const product_image_max_num = 34;
const delayInMilliseconds = 100;

let bike_animation_frame_handler;
let timeout_handler;

btn_spin.addEventListener("click", spin_image);
btn_reverse_spin.addEventListener("click", spin_image);
btn_stop.addEventListener("click", function(){
    cancelAnimationFrame(bike_animation_frame_handler);
    clearTimeout(timeout_handler);
    // enable both buttons on stop
    btn_spin.disabled = false;
    btn_reverse_spin.disabled = false;
})

function spin_image(event){
    if (event.target.id === "btn-spin"){
        // cancle any previous animation frame, enable reverse spin button while disabling spin button
        cancelAnimationFrame(bike_animation_frame_handler);
        clearTimeout(timeout_handler);
        btn_reverse_spin.disabled = false;

        btn_spin.disabled = true;
        bike_animation_frame_handler = requestAnimationFrame(spin_clockwise);
    }
    else {
        console.log("reverse spin btn clicked");
        // cancle any previous animation frame, enable spin button while disabling reverse-spin button
        cancelAnimationFrame(bike_animation_frame_handler);
        clearTimeout(timeout_handler);
        btn_spin.disabled = false;
        // disable the reverse spin button and start animationframe
        btn_reverse_spin.disabled = true;
        bike_animation_frame_handler = requestAnimationFrame(spin_anticlockwise);
    }
}

function spin_clockwise() {
    let number = parseInt(bike_image_element.src.split("-")[1].split(".")[0]);

    if (number === product_image_max_num) {
        number = product_image_min_num;
    }
    else {
        ++number;
    }

    bike_image_element.src = `images/product/bike-${number}.jpg`

    // call the function again
    timeout_handler = setTimeout( function(){
        bike_animation_frame_handler = requestAnimationFrame(spin_clockwise);
    }, delayInMilliseconds );
    
}

function spin_anticlockwise() {
    let number = parseInt(bike_image_element.src.split("-")[1].split(".")[0]);

    if (number === product_image_min_num) {
        number = product_image_max_num;
    }
    else {
        --number;
    }

    bike_image_element.src = `images/product/bike-${number}.jpg`

    // call the function again
    // call the function again
    timeout_handler = setTimeout( function(){
        bike_animation_frame_handler = requestAnimationFrame(spin_anticlockwise);
    }, delayInMilliseconds );
}

/******************************************************************
 * PART 02
 ******************************************************************/

// const btn_move_right    = document.getElementById('move_right');
// const btn_move_left    = document.getElementById('move_left');
// const btn_move_down    = document.getElementById('move_down');
// const btn_move_up    = document.getElementById('move_up');
// const btn_stop_pacman   = document.getElementById('move_stop');
const pacman_img_html   = document.getElementById('pacman_image');

//use these paths to update image src
const pacman_static_src   = 'images/pacman/pac-man-static.gif';
const pacman_move_src     = 'images/pacman/pac-man-fast.gif';

//we will need an animation handler variable
let pacman_animation_handler;
let timeout_handler_pacman;
//track the status of the animation
let position_horizontal = 0;
let position_vertical = 0;
let move_right = false;
let move_left = false;
let move_down = false;
let move_up = false;

function set_move_direction_and_btn_accessibility (mr=false, ml=false, md=false, mu=false)
{
    move_right = mr;
    move_left = ml;
    move_down = md;
    move_up = mu;

    // if (move_right === true)
    // {
    //     btn_move_right.disabled = true;
    //     btn_move_left.disabled = false;
    //     btn_move_down.disabled = false;
    //     btn_move_up.disabled = false;        
    // }
    // else if (move_left === true)
    // {
    //     btn_move_right.disabled = false;
    //     btn_move_left.disabled = true;
    //     btn_move_down.disabled = false;
    //     btn_move_up.disabled = false;        
    // }
    // else if (move_down === true)
    // {
    //     btn_move_right.disabled = false;
    //     btn_move_left.disabled = false;
    //     btn_move_down.disabled = true;
    //     btn_move_up.disabled = false;        
    // }
    // else if (move_up === true)
    // {
    //     btn_move_right.disabled = false;
    //     btn_move_left.disabled = false;
    //     btn_move_down.disabled = false;
    //     btn_move_up.disabled = true;
    // }
}

//user clicks the right button...
// btn_move_right.addEventListener('click', function(){
//     // stop existing animation
//     cancelAnimationFrame(pacman_animation_handler);
//     clearTimeout(timeout_handler_pacman);
//     //update the HTML image to be animated
//     pacman_img_html.src = pacman_move_src;
//     // set initial image direction
//     pacman_img_html.style.transform = 'scaleX(1)';
//     // set the direction and btn accessibility
//     set_move_direction_and_btn_accessibility(mr=true, ml=false, false, false);
//     //begin the animation using the animation handler
//     //  myHandler = requestAnimationFrame( functionName )
//     //this intiates a single call to the function
//     pacman_animation_handler = requestAnimationFrame(move);
// });
// btn_move_left.addEventListener('click', function(){
//     // stop existing animation
//     cancelAnimationFrame(pacman_animation_handler);
//     clearTimeout(timeout_handler_pacman);
//     //update the HTML image to be animated
//     pacman_img_html.src = pacman_move_src;
//     // set initial image direction
//     pacman_img_html.style.transform = 'scaleX(-1)';

//     // set the direction and btn accessibility
//     set_move_direction_and_btn_accessibility(mr=false, ml=true, false, false);
//     //begin the animation using the animation handler
//     //  myHandler = requestAnimationFrame( functionName )
//     //this intiates a single call to the function
//     pacman_animation_handler = requestAnimationFrame(move);
// });
// btn_move_down.addEventListener('click', function(){
//     // stop existing animation
//     cancelAnimationFrame(pacman_animation_handler);
//     clearTimeout(timeout_handler_pacman);
//     //update the HTML image to be animated
//     pacman_img_html.src = pacman_move_src;
//     // set initial image direction
//     pacman_img_html.style.transform = "rotate(90deg)";

//     // set the direction and btn accessibility
//     set_move_direction_and_btn_accessibility(mr=false, ml=false, md=true, mu=false);
//     //begin the animation using the animation handler
//     //  myHandler = requestAnimationFrame( functionName )
//     //this intiates a single call to the function
//     pacman_animation_handler = requestAnimationFrame(move);
// });
// btn_move_up.addEventListener('click', function(){
//     // stop existing animation
//     cancelAnimationFrame(pacman_animation_handler);
//     clearTimeout(timeout_handler_pacman);
//     //update the HTML image to be animated
//     pacman_img_html.src = pacman_move_src;
//     // set initial image direction
//     pacman_img_html.style.transform = "rotate(-90deg)";

//     // set the direction and btn accessibility
//     set_move_direction_and_btn_accessibility(mr=false, ml=false, md=false, mu=true);
//     //begin the animation using the animation handler
//     //  myHandler = requestAnimationFrame( functionName )
//     //this intiates a single call to the function
//     pacman_animation_handler = requestAnimationFrame(move);
// });

// //user clicks the stop button...
// btn_stop_pacman.addEventListener('click', function(){
//     clearTimeout(timeout_handler_pacman);
//     //stop an aniamtion using the animation handler
//     //  cancelAnimationFrame(myHandler);
//     cancelAnimationFrame(pacman_animation_handler);
//     //update the HTML image to be not animated
//     pacman_img_html.src = pacman_static_src;
// });

// track animation and direction
let animation_running = false;

document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'w': 
            pacman_img_html.src = pacman_move_src;
            set_move_direction_and_btn_accessibility(false, false, false, true);
            pacman_img_html.style.transform = "rotate(-90deg)";
            break;
        case 'a': 
            pacman_img_html.src = pacman_move_src;
            set_move_direction_and_btn_accessibility(false, true, false, false);
            pacman_img_html.style.transform = 'scaleX(-1)';
            break;
        case 's': 
            pacman_img_html.src = pacman_move_src;
            set_move_direction_and_btn_accessibility(false, false, true, false);
            pacman_img_html.style.transform = 'rotate(90deg)';
            break;
        case 'd': 
            pacman_img_html.src = pacman_move_src;
            set_move_direction_and_btn_accessibility(true, false, false, false);
            pacman_img_html.style.transform = 'scaleX(1)';
            break;
        case 'x': 
            cancelAnimationFrame(pacman_animation_handler);
            clearTimeout(timeout_handler_pacman);
            animation_running = false;
            pacman_img_html.src = pacman_static_src;
            return; 
    }
    
    if (!animation_running) {
        animation_running = true;
        pacman_animation_handler = requestAnimationFrame(move);
    }
});

//the function that is called with 
//each new frame of the animation
function move(){

    if(move_right === true){
        position_horizontal++;
        if(position_horizontal >= 100){
            set_move_direction_and_btn_accessibility(mr=false, ml=true, false, false);
            pacman_img_html.style.transform = 'scaleX(-1)';
        }
        pacman_img_html.style.left = `${position_horizontal}%`;
    }else if (move_left === true) {
        position_horizontal--;
        if(position_horizontal <= 1){
            set_move_direction_and_btn_accessibility(mr=true, ml=false, false, false);
            pacman_img_html.style.transform = 'scaleX(1)';
        }
        pacman_img_html.style.left = `${position_horizontal}%`;
    } else if (move_down === true) {
        position_vertical++;
        if(position_vertical >= 100){
            set_move_direction_and_btn_accessibility(mr=false, ml=false, md=false, mu=true);
            pacman_img_html.style.transform = "rotate(-90deg)";
        }
        pacman_img_html.style.top = `${position_vertical}%`;
    } else if (move_up === true) {
        position_vertical--;
        if(position_vertical <= 1){
            set_move_direction_and_btn_accessibility(mr=false, ml=false, md=true, mu=false);
            pacman_img_html.style.transform = "rotate(90deg)";
        }
        pacman_img_html.style.top = `${position_vertical}%`;
    }

    timeout_handler_pacman = setTimeout(function(){
        console.log(move_right);
        // console.log(move_left);
        //request the next frame in the animation
        pacman_animation_handler = requestAnimationFrame(move);    
    }, 50)
}