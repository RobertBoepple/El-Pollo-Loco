let canvas;
let ctx;
let world;
let isMuted = false;
let keyboard = new Keyboard();

function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    init();
}

function backToMenu() {
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
}

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    console.log('My character is', world.character);


    window.addEventListener("keydown", (e) => {
        if(e.keyCode == 37){
            keyboard.LEFT = true;
        }
        if(e.keyCode == 39){
            keyboard.RIGHT = true;
        }
        if(e.keyCode == 38){
            keyboard.UP = true;
        }
        if(e.keyCode == 40){
            keyboard.DOWN = true;
        }
        if(e.keyCode == 32){
            keyboard.SPACE = true;
        }
        if(e.keyCode == 68){
            keyboard.D = true;
        }
    });

    window.addEventListener("keyup", (e) => {
        if(e.keyCode == 37){
            keyboard.LEFT = false;
        }
        if(e.keyCode == 39){
            keyboard.RIGHT = false;
        }
        if(e.keyCode == 38){
            keyboard.UP = false;
        }
        if(e.keyCode == 40){
            keyboard.DOWN = false;
        }
        if(e.keyCode == 32){
            keyboard.SPACE = false;
        }
        if(e.keyCode == 68){
            keyboard.D = false;
        }
    });
    

function stopGame() {
    clearAllIntervals();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
}