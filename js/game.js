let canvas;
let ctx;
let world;
let isMuted = false;
let help = false;
let fullscreen = false;
let keyboard = new Keyboard();

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

/**
 * Starts the game by initializing the level and setting up the environment.
 * Hides the start screen and shows the game screen.
 */
function startGame() {
    initLevel();
    init();
    document.getElementById('start-screen').classList.add('d-none');
}

/**
 * Initializes mobile controls by setting up touch events for key press and release.
 * Logs 'init mobile' to the console for debugging purposes.
 */
function initMobile() {
    console.log('init mobile');
    mobileKeyPressEvents();
    mobileKeyReleaseEvents();
}

/**
 * Returns to the main menu by hiding the win and lose screens and showing the start screen.
 */
function backToMenu() {
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('lose-screen').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
}

/**
 * Restarts the game by hiding the win and lose screens and calling `startGame` again.
 */
function reStart() {
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('lose-screen').classList.add('d-none');
    startGame();
}

/**
 * Displays the win screen and stops the game.
 */
function gameWon() {
    document.getElementById('win-screen').classList.remove('d-none');
    stopGame();
}

/**
 * Displays the lose screen and stops the game.
 */
function gameLost() {
    document.getElementById('lose-screen').classList.remove('d-none');
    stopGame();
}

/**
 * Stops the game by calling `world.endGame()` and clearing all active intervals.
 */
function stopGame() {
    world.endGame();
    clearAllIntervals();
}

/**
 * Clears all intervals that have been set on the window object.
 * This prevents any remaining intervals from running after the game has stopped.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * Initializes the game by setting up the canvas, world, and event listeners for keyboard input.
 * This function listens for both keydown and keyup events to update the `keyboard` object accordingly.
 * It maps specific key codes to actions (e.g., arrow keys and spacebar) and updates their states in the `keyboard` object.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // Listen for keydown events to set the respective key state to true in the keyboard object
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

    // Listen for keyup events to set the respective key state to false in the keyboard object
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


/**
 * Toggles the mute state for the audio.
 * If the audio is muted, it updates the icon to show sound. If not, it updates the icon to show no sound.
 */
function toggleMute() {
    let audioImage = document.getElementById("sound");
    if (isMuted) {
        audioImage.src = 'img/icons/sound.png';
    } else {
        audioImage.src = 'img/icons/no_sound.png';
    }
    isMuted = !isMuted;
}


/**
 * Toggles fullscreen mode for the canvas container.
 * If the content is not in fullscreen, it enters fullscreen and changes the fullscreen icon.
 * If the content is in fullscreen, it exits fullscreen and restores the fullscreen icon.
 */
function toggleFullscreen() {
    let content = document.getElementById("canvas-container");
    let fullscreenImage = document.getElementById("fullscreen");
    if (fullscreen) {
        fullscreenImage.src = 'img/icons/fullscreen.png';
        exitFullscreen();
        content.classList.remove('fullscreen');
    } else {
        fullscreenImage.src = 'img/icons/close_fullscreen.png';
        enterFullscreen(document.getElementById("canvas-container"));
        content.classList.add('fullscreen');
    }
    fullscreen = !fullscreen;
}

/**
 * Enters fullscreen mode for the given element.
 * 
 * @param {HTMLElement} element - The DOM element to be displayed in fullscreen mode.
 */
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

/**
 * Exits fullscreen mode.
 * If the document is currently in fullscreen mode, it will exit.
 */
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

/**
 * Toggles the visibility of the help page and updates the help icon.
 * If the help page is visible, it hides the page and changes the help icon to a gamepad.
 * If the help page is hidden, it shows the page and changes the help icon to a close icon.
 */
function toggleHelpPage() {
    let helpImage = document.getElementById("help");
    if (help) {
        document.getElementById('help-page').classList.add('d-none');
        helpImage.src = 'img/icons/gamepad.png';
    } else {
        document.getElementById('help-page').classList.remove('d-none');
        helpImage.src = 'img/icons/close.svg';
    }
    help = !help   
}



/**
 * Adds touchstart events for mobile buttons.
 * This function binds the mobile controls to specific keys and updates the `keyboard` object accordingly.
 */
function mobileKeyPressEvents() {
    addTouchStartEvent('left-btn', 'LEFT');
    addTouchStartEvent('right-btn', 'RIGHT');
    addTouchStartEvent('jump-btn', 'SPACE');
    addTouchStartEvent('throw-btn', 'D');
}

/**
 * Adds a touchstart event to a specific button and updates the corresponding key's status in the `keyboard` object.
 * 
 * @param {string} buttonId - The ID of the button that triggers the touchstart event.
 * @param {string} key - The key represented by the button (e.g., 'LEFT', 'RIGHT', 'SPACE', 'D').
 */
function addTouchStartEvent(buttonId, key) {
    const button = document.getElementById(buttonId);
    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });
}

/**
 * Adds touchend events for mobile buttons.
 * This function removes the mobile controls from the keys and sets their status to `false` in the `keyboard` object.
 */
function mobileKeyReleaseEvents() {
    addTouchEndEvent('left-btn', 'LEFT');
    addTouchEndEvent('right-btn', 'RIGHT');
    addTouchEndEvent('jump-btn', 'SPACE');
    addTouchEndEvent('throw-btn', 'D');
}

/**
 * Adds a touchend event to a specific button and sets the corresponding key's status to `false` in the `keyboard` object.
 * 
 * @param {string} buttonId - The ID of the button that triggers the touchend event.
 * @param {string} key - The key represented by the button (e.g., 'LEFT', 'RIGHT', 'SPACE', 'D').
 */
function addTouchEndEvent(buttonId, key) {
    const button = document.getElementById(buttonId);
    button.addEventListener('touchend', () => {
        keyboard[key] = false;
    });
}


