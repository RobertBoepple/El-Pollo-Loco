class Character extends MovableObject {
  height = 200;
  y = 220;
  speed = 10;
  idleTime = 0;

  offset = {
    top: 80,
    bottom: 10,
    left: 20,
    right: 20,
  };

  IMAGES_WALKING = [
    '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png',
    '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-22.png',
    '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-23.png',
    '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-24.png',
    '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-25.png',
    '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-31.png',
    '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-32.png',
    '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-33.png',
    '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-34.png',
    '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-35.png',
    '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-36.png',
    '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-37.png',
    '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-38.png',
    '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-51.png',
    '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-52.png',
    '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-53.png',
    '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-54.png',
    '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-55.png',
    '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-56.png',
    '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_HURT = [
    '../El-Pollo-Loco/img/2_character_pepe/4_hurt/H-41.png',
    '../El-Pollo-Loco/img/2_character_pepe/4_hurt/H-42.png',
    '../El-Pollo-Loco/img/2_character_pepe/4_hurt/H-43.png',
  ];

  IMAGES_STANDING = [
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-1.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-2.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-3.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-4.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-5.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-6.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-7.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-8.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-9.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_SLEEPING = [
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-11.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-12.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-13.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-14.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-15.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-16.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-17.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-18.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-19.png',
    '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  world;

  constructor() {
    super().loadImage('../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_SLEEPING);
    this.applyGravity();
    this.animate();
  }

/**
 * Animates the character's movement and actions by running two intervals.
 * - One interval moves the character at 60 FPS.
 * - The other interval handles the character's animation logic.
 */
animate() {
    setInterval(
      () => (world.walking_sound.pause(), this.moveCharacter()),
      1000 / 60
    );

    setInterval(() => this.playCharacter(), 125);
}

/**
 * Moves the character based on keyboard input.
 * Updates the camera position to follow the character.
 */
moveCharacter() {
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) this.moveJump();
    this.world.camera_x = -this.x + 100;
}

/**
 * Checks if the character can move to the right.
 * @returns {boolean} True if the RIGHT key is pressed and the character hasn't reached the level's end.
 */
canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
}

/**
 * Moves the character to the right, plays the walking sound, and resets idle time.
 */
moveRight() {
    super.moveRight();
    this.otherDirection = false;
    this.playSound(world.walking_sound);
    this.idleTime = 0;
}

/**
 * Moves the character to the left, plays the walking sound, and resets idle time.
 */
moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    this.playSound(world.walking_sound);
    this.idleTime = 0;
}

/**
 * Makes the character jump, plays the jump sound, and resets idle time.
 */
moveJump() {
    super.jump();
    this.playSound(world.jump_sound);
    this.idleTime = 0;
}

/**
 * Checks if the character can move to the left.
 * @returns {boolean} True if the LEFT key is pressed and the character is not beyond the level's start.
 */
canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > -615;
}

/**
 * Checks if the character can jump.
 * @returns {boolean} True if the SPACE key is pressed and the character is on the ground.
 */
canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
}

/**
 * Plays the appropriate character animation based on the current state:
 * - Death animation
 * - Hurt animation
 * - Jumping animation
 * - Walking animation
 * - Idle animation
 */
playCharacter() {
    if (this.isDead()) {
        this.handleDeath();
    } else if (this.isHurt()) {
        this.handleHurt();
    } else if (this.isAboveGround()) {
        this.handleJumping();
    } else if (this.isWalking()) {
        this.handleWalking();
    } else {
        this.characterAnimationIdle();
    }
}

/**
 * Handles the character's death animation and plays the game-over sound.
 * Triggers the `gameLost` function after a short delay.
 */
handleDeath() {
    this.playAnimation(this.IMAGES_DEAD);
    this.playSound(world.gameOver_sound);
    setTimeout(() => {
        gameLost();
    }, 750);
}

/**
 * Handles the hurt animation and plays the hurt sound.
 */
handleHurt() {
    this.playSound(world.characterHurt_sound);
    this.playAnimation(this.IMAGES_HURT);
}

/**
 * Plays the jumping animation.
 */
handleJumping() {
    this.playAnimation(this.IMAGES_JUMPING);
}

/**
 * Plays the walking animation.
 */
handleWalking() {
    this.playAnimation(this.IMAGES_WALKING);
}

/**
 * Checks if the character is walking (LEFT or RIGHT key pressed).
 * @returns {boolean} True if the LEFT or RIGHT key is pressed.
 */
isWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
}

/**
 * Plays the idle animation for the character.
 * If the character remains idle for a certain time, the sleeping animation is triggered.
 */
characterAnimationIdle() {
    this.playAnimation(this.IMAGES_STANDING);
    this.incrementIdleTime();
    if (this.shouldPlaySleepingAnimation()) {
        this.playAnimation(this.IMAGES_SLEEPING);
    }
}

/**
 * Increments the idle time by 150ms.
 */
incrementIdleTime() {
    this.idleTime += 150;
}

/**
 * Checks if the sleeping animation should play.
 * @returns {boolean} True if the idle time exceeds 6 seconds.
 */
shouldPlaySleepingAnimation() {
    return this.idleTime >= 6000;
}

/**
 * Plays the animation by cycling through the given images.
 * @param {string[]} images - Array of image paths for the animation.
 */
playAnimation(images) {
    const imageIndex = this.currentImage % images.length;
    const imagePath = images[imageIndex];
    this.img = this.imageCache[imagePath];
    this.currentImage++;
}
}
