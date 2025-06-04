class SmallChicken extends MovableObject {
  y = 360;
  height = 55;
  width = 50;
  enemyisDead = false;
  chickenDead = false;

  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };

  IMAGES_WALKING = [
    '../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    '../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    '../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = [
    '../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/2_dead/dead.png',
  ];

  soundPlayed = false;

  constructor() {
    super().loadImage(
      '../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png'
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 3000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Animates the small chicken's behavior, including movement and state-based animations.
   * Walking animation runs until the chicken is dead, after which the dead animation is triggered.
   */
  animate() {
    setInterval(() => {
      this.chickenMoves();
    }, 1000 / 60);

    setInterval(() => {
      if (!this.chickenDead) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.chickenAnimationDead();
      }
    }, 1000 / 7);
  }

  /**
   * Plays the dead animation and sound for the small chicken.
   * Prevents the sound from playing multiple times using the `soundPlayed` flag.
   * Clears the dead image after 500ms for cleanup.
   */
  chickenAnimationDead() {
    if (!this.soundPlayed) {
      this.loadImage(this.IMAGES_DEAD);
      this.playSound(world.chickenDead_sound);
      this.soundPlayed = true;

      setTimeout(() => {
        this.IMAGES_DEAD = [];
      }, 500);
    }
  }

  /**
   * Moves the small chicken to the left if it is not marked as dead.
   */
  chickenMoves() {
    if (!this.enemyIsDead) {
      this.moveLeft();
    }
  }
}
