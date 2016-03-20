var fps = 60;

function myButtonClick() {
    //in delay seconds,
    var delay = 3;
    //record for duration frames
    var duration = 60*2;

    var interval = setInterval(buttonCountdown, 1000);
    myButton.innerHTML = delay--;
    //make a loop from recording

    function buttonCountdown() {
        myButton.innerHTML = delay--;
        if (delay < 0) {
            clearInterval(interval);
            var mouse = new Mouse(currentMouse, duration);
            mouseList.push(mouse);
            myButton.innerHTML = "button";
        }
    }


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

    //update all mice
    for (var i = 0; i < mouseList.length; i++) {
        mouseList[i].update();
    }

}

var Frame = function(location, timeStamp) {
    this.x = location.x;
    this.y = location.y;
    this.timeStamp = timeStamp;
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
            context.beginPath();
            context.arc(frame.x, frame.y, this.radius, 0, 2 * Math.PI);
            context.fillStyle = this.color;
            context.fill();
        }

    };

    this.update = function() {
        if(!this.isLooping){
            this.draw(this.getFrame(this.delay));
        } else{
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
        this.draw(frame);
        this.frameQueue.push(frame);
    };
};

function updateMousePos(e) {
    currentMousePos = getMousePos(canvas, e);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function clickEvent() {
    currentMouse.isLooping = true;
    currentMouse = new Mouse();
    mouseList.push(currentMouse);
}

var myButton = document.getElementById("myButton");
console.log(myButton);
myButton.addEventListener("click", myButtonClick, false);

window.addEventListener('mousemove', updateMousePos, false);
// window.addEventListener('click', clickEvent, false);

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");


var currentMouse = new Mouse();
currentMouse.color = 'transparent';
var mouseList = [];
mouseList.push(currentMouse);

var currentMousePos = { x: 0, y: 0 };

console.log("Javascript Loaded! FPS: " + fps);
setInterval(gameLoop, 1 / fps * 1000);