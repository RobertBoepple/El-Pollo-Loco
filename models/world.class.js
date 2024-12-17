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
      this.gameOver_sound
    ];
    this.setAllSoundsVolume(0.3);
  }

  setWorld() {
    this.character.world = this;
    if (!isMuted) {
      this.background_music.volume = 0.3;
      this.background_music.loop = true;
      this.background_music.play();
    }
  }

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

  stopAllSounds() {
    this.allSounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
 endGame() {
  this.gameOver = true;
  this.stopAllSounds();
}

checkBackgroundMusic() {
  if (isMuted) {
    this.background_music.pause();
  } else if (!this.gameOver) {
    this.background_music.play();
  }
}

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      !this.character.isThrowing &&
      this.bottlesCollected > 0
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle);
      this.character.isThrowing = true;
      this.drawableObject.playSound(this.throwObject_sound); 
      setTimeout(() => (this.character.isThrowing = false), 500);
      this.bottlesCollected -= 1;
      let percentage = (this.bottlesCollected / this.maxBottles) * 100;
      this.statusBottle.setPercentage(percentage);
    }
  }

  checkCollisionCharacterEndboss() {
    this.level.finalboss.forEach((finalboss) => {
      if (this.character.isColliding(finalboss) && !this.collisionWithEndboss) {
        this.collisionWithEndboss = true;
        this.character.energy = 0;
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

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

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.isCharacterLandingOnEnemy(enemy) &&
        !enemy.chickenDead
      ) {
        this.character.jump();
        enemy.chickenDead = true;
        enemy.enemyIsDead = true;
      } else if (
        this.character.isColliding(enemy) &&
        !enemy.chickenDead &&
        !this.character.isAboveGround()
      ) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  isCharacterLandingOnEnemy(enemy) {
    return (
      this.character.y + this.character.height <= enemy.y + enemy.height &&
      this.character.y + this.character.height >= enemy.y &&
      this.character.speedY < 0
    );
  }

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

  checkCollisionsBottles() {
    this.level.bottles.forEach((bottles, index) => {
      if (this.character.isColliding(bottles) && this.bottlesCollected < 5) {
        this.bottlesCollected = this.bottlesCollected + 1;
        this.drawableObject.playSound(this.collectBottle_sound); 
        this.statusBottle.setPercentage(this.bottlesCollected * 20);
        this.level.bottles.splice(index, 1);
        if (this.statusBottle.bottlesCollected > 100) {
          this.statusBottle.bottlesCollected = 100;
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBoss);
    this.addToMap(this.statusCoin);
    this.addToMap(this.statusBottle);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.finalboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

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
    mo.drawFrame(this.ctx);
  }
  setAllSoundsVolume(volume) {
    this.allSounds.forEach((sound) => {
      sound.volume = volume;
    });
  }
}
