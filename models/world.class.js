class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBoss = new StatusBarBoss();
  statusCoin = new CoinStatusBar();
  statusBottle = new BottleStatusBar();
  throwableObjects = [];
  coinsCollected = 0;
  bottlesCollected = 0;
  maxBottles = 5;
  gameOver = false;
  collisionWithEndboss = false;
  background_music = new Audio('../El-Pollo-Loco/audio/game_music.mp3');
  chickenDead_sound = new Audio('../El-Pollo-Loco/audio/chicken.mp3');
  bottleBroken_sound = new Audio('../El-Pollo-Loco/audio/glass.mp3');
  collectCoin_sound = new Audio('../El-Pollo-Loco/audio/coin.mp3');
  collectBottle_sound = new Audio('../El-Pollo-Loco/audio/bottle.mp3');
  jump_sound = new Audio('../El-Pollo-Loco/audio/jump.mp3');
  walking_sound = new Audio('../El-Pollo-Loco/audio/walking.mp3');
  characterHurt_sound = new Audio('../El-Pollo-Loco/audio/hurt.mp3');
  finalbossHurt_sound = new Audio('../El-Pollo-Loco/audio/finalboss_hurt.mp3');
  throwObject_sound = new Audio('../El-Pollo-Loco/audio/throw.mp3');
  gameOver_sound = new Audio('../El-Pollo-Loco/audio/game_over.mp3');
  win_sound = new Audio('../El-Pollo-Loco/audio/win.mp3');
  drawableObject = new DrawableObject();

  allSounds = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();

    this.allSounds = [
      this.background_music,
      this.chickenDead_sound,
      this.bottleBroken_sound,
      this.collectCoin_sound,
      this.collectBottle_sound,
      this.jump_sound,
      this.walking_sound,
      this.characterHurt_sound,
      this.finalbossHurt_sound,
      this.throwObject_sound,
      this.win_sound,
      this.gameOver_sound,
    ];
    this.setAllSoundsVolume(0.3);
  }

  /**
   * Sets up the world and plays background music if not muted.
   */
  setWorld() {
    this.character.world = this;
    if (!isMuted) {
      this.background_music.volume = 0.3;
      this.background_music.loop = true;
      this.background_music.play();
    }
  }

  /**
   * Starts the game loop to handle updates and render the game state.
   */
  run() {
    requestAnimationFrame(() => {
      if (!this.gameOver) {
        this.checkCollisions();
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
        this.checkThrowObjects();
        this.checkCollisionCharacterEndboss();
        this.checkCollisonEndbosswithThrowableObjects();
        this.checkBackgroundMusic();
        this.run();
      }
    });
  }

  /**
   * Stops all sounds by pausing them and resetting their current time.
   */

  stopAllSounds() {
    this.allSounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  /**
   * Ends the game by setting the gameOver flag and stopping all sounds.
   */
  endGame() {
    this.gameOver = true;
    this.stopAllSounds();
  }

  /**
   * Checks if background music should be played based on mute status.
   */
  checkBackgroundMusic() {
    if (isMuted) {
      this.background_music.pause();
    } else if (!this.gameOver) {
      this.background_music.play();
    }
  }

  /**
   * Checks if a throwable bottle should be thrown and performs the throw action.
   */
  checkThrowObjects() {
    if (this.canThrowBottle()) {
      this.throwBottle();
    }
  }

  /**
   * Determines if the character is able to throw a bottle.
   * @returns {boolean} Whether the character can throw a bottle.
   */
  canThrowBottle() {
    return (
      this.keyboard.D && !this.character.isThrowing && this.bottlesCollected > 0
    );
  }

  /**
   * Handles throwing a bottle by creating a new ThrowableObject and adding it to the world.
   */
  throwBottle() {
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100,
      this.character.otherDirection
    );
    this.throwableObjects.push(bottle);
    this.character.isThrowing = true;
    this.drawableObject.playSound(this.throwObject_sound);
    setTimeout(() => (this.character.isThrowing = false), 500);
    this.updateBottleStatus();
  }

  /**
   * Updates the bottle status based on the number of bottles collected.
   */
  updateBottleStatus() {
    this.bottlesCollected -= 1;
    let percentage = (this.bottlesCollected / this.maxBottles) * 100;
    this.statusBottle.setPercentage(percentage);
  }

  /**
   * Checks for collisions between the character and the final boss, and handles character death if colliding.
   */
  checkCollisionCharacterEndboss() {
    this.level.finalboss.forEach((finalboss) => {
      if (this.character.isColliding(finalboss) && !this.collisionWithEndboss) {
        this.collisionWithEndboss = true;
        this.character.energy = 0;
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Handles collisions between throwable objects and the final boss, dealing damage if collided.
   */
  checkCollisonEndbosswithThrowableObjects() {
    this.level.finalboss.forEach((finalboss) => {
      this.throwableObjects.forEach((throwableObject, index) => {
        if (
          throwableObject.isColliding(finalboss) &&
          throwableObject.isAboveGround()
        ) {
          finalboss.hitFinalBoss();
          this.statusBoss.setPercentage(finalboss.energy);
          this.drawableObject.playSound(this.bottleBroken_sound);
          this.throwableObjects.splice(index, 1);
        }
      });
    });
  }

  /**
   * Checks for collisions between the character and enemies.
   * Handles the case where the character stomps on an enemy or gets hit by one.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (
          this.character.isAboveGround() &&
          this.isCharacterLandingOnEnemy(enemy) &&
          !enemy.chickenDead
        ) {
          this.handleEnemyStomp(enemy);
        } else if (!enemy.chickenDead && !this.character.isAboveGround()) {
          this.handleCharacterHit();
        }
      }
    });
  }

  /**
   * Handles the scenario where the character lands on an enemy.
   * The enemy is killed, and the character performs a jump.
   * @param {Enemy} enemy - The enemy the character lands on.
   */
  handleEnemyStomp(enemy) {
    this.character.jump();
    enemy.chickenDead = true;
    enemy.enemyIsDead = true;
  }

  /**
   * Handles the scenario where the character gets hit by an enemy.
   * The character loses health, and the status bar is updated.
   */
  handleCharacterHit() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Determines if the character is landing on an enemy based on the character's position and speed.
   * @param {Enemy} enemy - The enemy to check for landing.
   * @returns {boolean} True if the character is landing on the enemy, otherwise false.
   */
  isCharacterLandingOnEnemy(enemy) {
    return (
      this.character.y + this.character.height <= enemy.y + enemy.height &&
      this.character.y + this.character.height >= enemy.y &&
      this.character.speedY < 0
    );
  }

  /**
   * Checks for collisions between the character and coins.
   * If a collision occurs, the coin is collected, and the player's coin count is updated.
   */
  checkCollisionsCoins() {
    this.level.coins.forEach((coins, index) => {
      if (this.character.isColliding(coins)) {
        coins.collected = true;
        this.drawableObject.playSound(this.collectCoin_sound);
        this.coinsCollected = this.coinsCollected + 20;
        this.statusCoin.setPercentage(this.coinsCollected);
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles.
   * If a collision occurs and the player hasn't reached the maximum bottle count, the bottle is collected.
   */
  checkCollisionsBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (
        this.character.isColliding(bottle) &&
        this.bottlesCollected < this.maxBottles
      ) {
        this.collectBottle(index);
      }
    });
  }

  /**
   * Collects a bottle, increases the bottle count, and updates the bottle status bar.
   * @param {number} index - The index of the bottle being collected.
   */
  collectBottle(index) {
    this.bottlesCollected++;
    this.drawableObject.playSound(this.collectBottle_sound);
    this.updateBottleStatus();
    this.level.bottles.splice(index, 1);
  }

  /**
   * Draws the game world by clearing the canvas, translating the camera, drawing the background,
   * status bars, and game objects in the correct order.
   */
  draw() {
    this.clearCanvas();
    this.translateCamera(this.camera_x);
    this.drawBackground();
    this.translateCamera(-this.camera_x);
    this.drawStatusBars();
    this.translateCamera(this.camera_x);
    this.drawGameObjects();
    this.translateCamera(-this.camera_x);
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Clears the entire canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Translates the canvas by the specified x value to simulate camera movement.
   * @param {number} x - The amount to translate the canvas on the x-axis.
   */
  translateCamera(x) {
    this.ctx.translate(x, 0);
  }

  /**
   * Draws the background objects and clouds on the canvas.
   */
  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Draws the status bars on the canvas, including the character's health, boss's health,
   * coins collected, and bottles collected.
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBoss);
    this.addToMap(this.statusCoin);
    this.addToMap(this.statusBottle);
  }

  /**
   * Draws the game objects on the canvas, including the character, throwable objects,
   * enemies, coins, and bottles.
   */
  drawGameObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.finalboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
  }

  /**
   * Adds a list of objects to the map (canvas), drawing each object.
   * @param {Array} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Draws a single object on the canvas.
   * If the object has the `otherDirection` property set to true, the object is mirrored before being drawn.
   * @param {DrawableObject} mo - The object to be drawn.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.x + mo.width, 0);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
      this.ctx.restore();
    } else {
      mo.draw(this.ctx);
    }
  }

  /**
   * Sets the volume for all sounds in the game.
   * @param {number} volume - The volume level to set (from 0 to 1).
   */
  setAllSoundsVolume(volume) {
    this.allSounds.forEach((sound) => {
      sound.volume = volume;
    });
  }
}
