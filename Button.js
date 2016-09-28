// Button.js - button object

let title = "new button";
let wasPressed = false;
let onClick = function(){console.error("this button has no function")};

function tick() {
    if(wasPressed){
        onClick();
    }
    wasPressed = false;
};