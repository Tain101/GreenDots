// Container.js - row/column of buttons or of more containers
let SPACING = 3;//should be %, current in px

let alignment = null; //horizontal or verital
let children  = [];

function add(obj) {
    children.push(obj);
};

function get(index) {
    return children[index];
};

function tick(){
    for(child in children){
        child.tick();
    }
}