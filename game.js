//TODO: this should only really contain metadata for running the game.
let FPS = 60;

let Container = require('Container.js');
let cursorList = [];
let gameWindow = null;

function init() {
    gameWindow = generateGameWindow();
}

/**
 * generates containers for starting layout. body with col for button & coins
 *
 * @return {Container} Container holding all other containers & buttons
 */

function generateGameWindow() {
    let returnContainer       = new Container('vertical');
    let bodyContainer         = new Container('horizontal');
    let cursorButtonContainer = new Container('vertical');
    let coinButtonContainer   = new Container('vertical');
    returnContainer.add(bodyContainer);
    bodyContainer.add(cursorButtonContainer, coinButtonContainer);
}

function gameTick(){
    canvas.clear();
    for(cursor in cursorList){
        cursor.tick();
    }
    gameWindow.tick();
}


function newMouseButtonClick(button) {
    var delay = 3;
    var duration = 2 * fps;
    var newMouseCost = 10;

    if (game.money > newMouseCost && !button.isPressed) {
        //prevent spamming
        button.isPressed = true;

        game.money -= newMouseCost;

        var interval;
        button.text = delay--;
        //make a loop from recording

        /*jshint -W082 */
        /*Suppress function inside block declaration*/
        function buttonCountdown() {
            button.text = delay--;
            if (delay < duration / fps) {
                button.color = 'blue';
            }
            if (delay < 0) {
                clearInterval(interval);
                var mouse = new Mouse(currentMouse, duration);
                mouseList.push(mouse);
                button.text = "Button";
                button.color = 'black';
                button.isPressed = false;
            }
        }

        interval = setInterval(buttonCountdown, 1000);

    }
}

function clickButtonClick(button) {
    game.money++;
    button.text = game.money;
}

function gameLoop() {
    //update Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //get mouse info
    //record to current Mouse instance
    currentMouse.pushFrame(currentMousePos, Date.now());


    //clear board
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < buttonList.length; i++) {
        buttonList[i].draw();
    }

    //update all mice
    for (var i = 0; i < mouseList.length; i++) {
        mouseList[i].update();
    }
}

var Game = function() {
    this.money = 0;
};

var Frame = function(location, timeStamp) {
    this.x = location.x;
    this.y = location.y;
    this.timeStamp = timeStamp;
    this.click = false;
};

var Button = function(rect, onClick) {
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
    this.color = 'black';
    this.textColor = 'white';
    this.text = "button";
    this.onClick = onClick;

    //flag to prevent loops
    this.isPressed = false;

    this.draw = function() {
        //draw box
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        //draw text
        context.fillStyle = this.textColor;
        context.font = this.height + "px Arial";
        context.fillText(this.text, this.x + this.width / 3, this.y + this.height * 9 / 10);
    };

    this.checkFrame = function(frame) {
        if (frame.x > this.x && frame.x < this.x + this.width) {
            if (frame.y > this.y && frame.y < this.y + this.height) {
                //call button.onClick
                this.click();
            }
        }
    };

    this.click = function() {
        this.onClick(this);
    };
};



function mouseMoveEvent(event) {
    currentMousePos = getMousePos(canvas, event);
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function clickEvent(event) { //jshint ignore:line
    var frame = currentMouse.getFrame(currentMouse.delay);
    frame.click = true;
    for (var i = 0; i < buttonList.length; i++) {
        buttonList[i].checkFrame(frame);
    }

}

window.addEventListener('mousemove', mouseMoveEvent, false);
window.addEventListener('mousedown', mouseDownEvent, false);
window.addEventListener('mouseup', mouseUpEvent, false);
window.addEventListener('click', clickEvent, false);


var newMouseButton = new Button({ x: 15, y: 15, width: 154, height: 21 }, newMouseButtonClick);
var clickButton = new Button({ x: 200, y: 15, width: 154, height: 21 }, clickButtonClick);
clickButton.text = 0;
var buttonList = [];
buttonList.push(newMouseButton);
buttonList.push(clickButton);

var currentMouse = new Mouse();
currentMouse.color = 'red';
var mouseList = [];
mouseList.push(currentMouse);

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var currentMousePos = { x: -100, y: -100 };

var game = new Game();

console.log("Javascript Loaded! FPS: " + fps);
setInterval(gameLoop, 1 / fps * 1000);