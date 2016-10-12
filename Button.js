// Button.js - button object
let Button = function(argument) {
    let self       = this;
    let title      = "new button";
    let wasPressed = false;
    let onClick    = function(){console.error("this button has no function")};

    function draw() {
        console.log("button draw");

    }

    function tick() {
        if(wasPressed){
            onClick();
        }
        wasPressed = false;
        draw();
    };

    self.tick = tick;
    self.draw = draw;
};