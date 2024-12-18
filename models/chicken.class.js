class Chicken extends MovableObject {
  y = 350;
  height = 75;
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
    '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = [
    '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
  ];

  soundPlayed = false;

  constructor() {
    super().loadImage(
      '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 3000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }
  /**
   * Animates the chicken's movement and behavior by setting two intervals:
   * - One interval updates the chicken's position at 60 FPS.
   * - The other interval handles the chicken's animation based on its state (walking or dead).
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
   * Handles the dead animation of the chicken:
   * - Loads the "dead" image.
   * - Plays the death sound.
   * - Clears the dead image after 500ms to remove the chicken from the screen.
   * Ensures the sound is played only once.
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
   * Moves the chicken to the left if it is not dead.
   */
  chickenMoves() {
    if (!this.enemyIsDead) {
      this.moveLeft();
    }
  }
}
