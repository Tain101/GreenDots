// Container.js - row/column of buttons or of more containers
let SPACING = 0.03; //3%

let Container = function(alignment) {
    let self       = this;
    let children   = [];

    self.rect = {x: 0, y: 0, w: canvas.width, h: canvas.height};
    self.alignment = alignment || "vertical"; //horizontal or vertical

    function add(child) {
        child.parent = self;
        children.push(child);
        console.log("adding child: ");
        console.log(child);
        console.log("to Container: ");
        console.log(self);
    };

    function get(index) {
        return children[index];
    };

    function drawChildren(parentX, parentY) {
        let childWidth  = self.rect.w * SPACING * 2;
        let childHeight = self.rect.h * SPACING * 2;
        if(alignment === "vertical"){
            childHeight /= children.length;
        }else{
            childWidth  /= children.length;
        }

        let x = self.rect.x + SPACING + parentX;
        let y = self.rect.y + SPACING + parentY;
        for (var i = 0; i < children.length; i++) {
            children[i].rect = {x: x, y: y, w: childWidth, h: childHeight};
            children[i].draw();
            x += childWidth;
            y += childHeight;
        }
    }

    function draw() {
        let x = self.rect.x + self.rect.w * SPACING;
        let y = self.rect.y + self.rect.h * SPACING;
        let w = self.rect.w - self.rect.w * SPACING * 2;
        let h = self.rect.h - self.rect.h * SPACING * 2;
        if(isNaN(x+y+w+h)){
            throw Error("invalid Container rect: \n [" + x + ", " + y + ", " + w + ", " + h + "]");
        }
        console.log("Drawing Container:");
        console.log("[" + x + ", " + y + ", " + w + ", " + h + "]");

        // context.lineWidth = "1";
        context.beginPath();
        context.strokeRect(x, y, w, h);
        // context.stroke();
        drawChildren(x, y);
    };

    self.add  = add;
    self.get  = get;
    self.draw = draw;

};