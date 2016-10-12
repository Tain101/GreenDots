//TODO: this should only really contain metadata for running the game.
//Should there be abstraction between this page and interacting with the window/mouse?
let FPS = 1;

var canvas    = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var context   = canvas.getContext("2d");


let cursorList   = [];
let gameWindow   = null;
let gameInterval = null;

function init() {
    console.log("Initializing Game:");
    console.log("  Generating Game Window:");
    gameWindow = generateGameWindow();
    console.log("  Game Window Generated");
    console.log("Game Initialized!")
    gameInterval = setInterval(gameTick, 1 / FPS * 1000);
}

/**
 * generates containers for starting layout. body with col for button & coins
 *
 * @return {Container} Container holding all other containers & buttons
 */

function generateGameWindow() {
    console.log("generateGameWindow()");
    //generate Containers
    let gameWindowContainter  = new Container('vertical');
    let bodyContainer         = new Container('horizontal');
    let cursorButtonContainer = new Container('vertical');
    let coinButtonContainer   = new Container('vertical');
    gameWindowContainter.add(bodyContainer);
    bodyContainer.add(cursorButtonContainer, coinButtonContainer);

    //generate starting buttons
    let cursorButton = new Button();
    let coinButton = new Button();

    cursorButtonContainer.add(cursorButton);
    coinButtonContainer.add(coinButton);
    return gameWindowContainter;
}

function gameTick(){
    try{
        //clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        //all cursors take action, in order that they were made
        for (var i = 0; i < cursorList.length; i++) {
            cursorList[i].tick();
        }

        //buttons & layout update last
        gameWindow.draw();
    }catch(err){
        console.error(err);
        clearInterval(gameInterval);
    }
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function mouseMoveEvent(event) {
    currentMousePos = getMousePos(canvas, event);
}

function mouseDownEvent(event) {
    // body...
}

function mouseUpEvent(event) {
    // body...
}

function clickEvent(event) {
    let frame = currentMouse.getFrame(currentMouse.delay);
    frame.click = true;
    for (var i = 0; i < buttonList.length; i++) {
        buttonList[i].checkFrame(frame);
    }
}

window.addEventListener('mousemove', mouseMoveEvent, false);
window.addEventListener('mousedown', mouseDownEvent, false);
window.addEventListener('mouseup',   mouseUpEvent,   false);
window.addEventListener('click',     clickEvent,     false);

console.log("Javascript Loaded! FPS: " + FPS);
init();
