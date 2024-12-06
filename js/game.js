let canvas;
let ctx;
let world;
let isMuted = false;
let fullscreen = false;
let keyboard = new Keyboard();

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function startGame() {
    initLevel();
    init();
    document.getElementById('start-screen').classList.add('d-none');
    
}

function backToMenu() {
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('lose-screen').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
}

function gameWon() {
    document.getElementById('win-screen').classList.remove('d-none');
    stopGame();
}

function gameLost() {
    document.getElementById('lose-screen').classList.remove('d-none');
    stopGame();
}

function stopGame() {
    clearAllIntervals();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

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
    
}

function toggleMute() {
    let audioImage = document.getElementById("sound");
    if (isMuted) {
        audioImage.src = 'img/icons/sound.png';
    } else {
        audioImage.src = 'img/icons/no_sound.png';
    }
    isMuted = !isMuted;
}

function toggleFullscreen() {
    let content = document.getElementById("canvas-container");
    let fullscreenImage = document.getElementById("fullscreen");
    if (fullscreen) {
        fullscreenImage.src = 'img/icons/fullscreen.png';
        exitFullscreen();
        content.classList.remove('fullscreen');
    }
    else {
        fullscreenImage.src = 'img/icons/close_fullscreen.png';
        enterFullscreen(document.getElementById("canvas-container"));
        content.classList.add('fullscreen');
    }
    fullscreen = !fullscreen;
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function exitHandler() {
    let content = document.getElementById("canvas-container");
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        document.getElementById("fullscreen").src = 'img/icons/fullscreen.png';
        content.classList.remove('fullscreen');
        fullscreen = false;
    }
}