// Cursor.js - cursor object

let PRE_RECORD_COLOR = red;
let RECORDING_COLOR  = yellow;
let RUNNING_COLOR    = green;
let MOUSE_DOWN_COLOR = blue;
let CURSOR_SIZE      = 10; //TODO: this should be a % of screensize, currently in pixels

let RECORD_DELAY_SECONDS = 3; //TODO: these may stop being constansts,
let RECORD_TIME_SECONDS  = 5; //instead future upgrades?

//should be 'preRecording' 'Recording' or 'Running'.
let state = null;

//queue of positions & actions for each game frame,
//the cursor loops through this queue to animate.
let frameQueue = [];



function record(){

}

function tick() {
    prevFrame = currentFrame;
    currentFrame = this.frameQueue.shift();
    frameQueue.push(currentFrame);
    currentPos = currentFrame.pos;
    if(prevFrame.mouse != 'down' && currentFrame.mouse == 'down'){ //start of mouse press
        onClick();
    }
    draw();
}

function draw(){
    let x     = currentFrame.pos.x;
    let y     = currentFrame.pos.y;
    let color = currentFrame.status;
    context.beginPath();
    context.arc(x, y, CURSOR_SIZE, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
}
//     if (mouse && duration) {
//         this.frameQueue = mouse.getRecording(duration);
//         this.isLooping = true;
//     }

//     this.getRecording = function(duration) {
//         var sliceIndex = this.frameQueue.length - duration;
//         return this.frameQueue.slice(sliceIndex);
//     };

//     //true if queueSize is not too large
//     //false if queueSize is too large
//     this.checkQueueSize = function() {
//         //      current queue size     < maximum queue size
//         return (this.frameQueue.length < this.queueSize);
//     };

//     this.draw = function(frame) {
//         if (!!frame) {
//             //TODO have the mice remember their original color
//             //or something smarter
//             if (frame.click) {
//                 this.color = 'blue';
//             } else if (this === currentMouse) {
//                 this.color = 'red';
//             } else {
//                 this.color = 'green';
//             }

//             context.beginPath();
//             context.arc(frame.x, frame.y, this.radius, 0, 2 * Math.PI);
//             context.fillStyle = this.color;
//             context.fill();
//         }

//     };

//     this.update = function() {
//         if (!this.isLooping) {
//             this.draw(this.getFrame(this.delay));
//         } else {
//             this.iterateFrame();
//         }
//     };

//     this.getFrame = function(delay) {
//         var frameIndex = this.frameQueue.length - delay;
//         if (frameIndex < 0) {
//             frameIndex = 0;
//         }
//         return this.frameQueue[frameIndex];
//     };

//     //play oldest frame
//     this.popFrame = function() {
//         var frame = this.frameQueue.shift();
//         this.draw(frame);
//     };

//     //add frame to mouse
//     this.pushFrame = function(location, time) {
//         var frame = new Frame(location, time);
//         this.frameQueue.push(frame);
//         //if the queue is full, pop.
//         if (!this.checkQueueSize()) {
//             this.frameQueue.shift();
//         }
//     };

//     //play oldest frame, add back onto queue
//     this.iterateFrame = function() {
//         var frame = this.frameQueue.shift();
//         if (frame.click) {
//             for (var i = 0; i < buttonList.length; i++) {
//                 buttonList[i].checkFrame(frame);
//             }
//         }
//         this.draw(frame);
//         this.frameQueue.push(frame);
//     };
// };
