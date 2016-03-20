var fps = 60;

function newMouseButtonClick(button) {
    //prevent spamming
    if (!button.isPressed) {
        button.isPressed = true;
        //in delay seconds,
        var delay = 3;
        //record for duration frames
        var duration = 60 * 2;
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
    button.text++;
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

var Mouse = function(mouse, duration) {
    this.radius = 10;
    this.color = 'green';

    this.delay = 1;
    this.queueSize = 800;

    this.frameQueue = [];
    this.isLooping = false;

    if (mouse && duration) {
        this.frameQueue = mouse.getRecording(duration);
        this.isLooping = true;
    }

    this.getRecording = function(duration) {
        var sliceIndex = this.frameQueue.length - duration;
        return this.frameQueue.slice(sliceIndex);
    };

    //true if queueSize is not too large
    //false if queueSize is too large
    this.checkQueueSize = function() {
        //      current queue size     < maximum queue size
        return (this.frameQueue.length < this.queueSize);
    };

    this.draw = function(frame) {
        if (!!frame) {
            //TODO have the mice remember their original color
            //or something smarter
            if (frame.click) {
                this.color = 'blue';
            } else if (this === currentMouse) {
                this.color = 'red';
            } else {
                this.color = 'green';
            }

            context.beginPath();
            context.arc(frame.x, frame.y, this.radius, 0, 2 * Math.PI);
            context.fillStyle = this.color;
            context.fill();
        }

    };

    this.update = function() {
        if (!this.isLooping) {
            this.draw(this.getFrame(this.delay));
        } else {
            this.iterateFrame();
        }
    };

    this.getFrame = function(delay) {
        var frameIndex = this.frameQueue.length - delay;
        if (frameIndex < 0) {
            frameIndex = 0;
        }
        return this.frameQueue[frameIndex];
    };

    //play oldest frame
    this.popFrame = function() {
        var frame = this.frameQueue.shift();
        this.draw(frame);
    };

    //add frame to mouse
    this.pushFrame = function(location, time) {
        var frame = new Frame(location, time);
        this.frameQueue.push(frame);
        //if the queue is full, pop.
        if (!this.checkQueueSize()) {
            this.frameQueue.shift();
        }
    };

    //play oldest frame, add back onto queue
    this.iterateFrame = function() {
        var frame = this.frameQueue.shift();
        if (frame.click) {
            for (var i = 0; i < buttonList.length; i++) {
                buttonList[i].checkFrame(frame);
            }
        }
        this.draw(frame);
        this.frameQueue.push(frame);
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

function clickEvent(event) {//jshint ignore:line
    var frame = currentMouse.getFrame(currentMouse.delay);
    frame.click = true;
    for (var i = 0; i < buttonList.length; i++) {
        buttonList[i].checkFrame(frame);
    }

}

window.addEventListener('mousemove', mouseMoveEvent, false);
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

var currentMousePos = { x: 0, y: 0 };

console.log("Javascript Loaded! FPS: " + fps);
setInterval(gameLoop, 1 / fps * 1000);