class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  IMAGES_SPLASH = [
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];
  isCollidingThrowable = false;

  constructor(x, y, otherDirection) {
    super();
    this.otherDirection = otherDirection;
    this.loadImages([
      '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    ]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.throw();
    this.animate();
  }

  /**
   * Initiates the throw action for the object. The object will move horizontally and apply gravity.
   */
  throw() {
    this.speedY = 20; // Initial vertical speed for the throw.
    if (!this.isCollidingThrowable) {
      this.applyGravity(); // Apply gravity to the object.
      const throwSpeed = this.otherDirection ? -10 : 10; // Determine the throw direction (left or right).

      setInterval(() => {
        this.x += throwSpeed; // Move the object horizontally based on the throw speed.
      }, 25);
    }

    // Start the animation process at regular intervals.
    setInterval(() => {
      this.animate();
    }, 100);
  }

  /**
   * Handles the animation of the throwable object.
   * The object plays the rotation animation while in the air and the splash animation when it hits the ground.
   */
  animate() {
    if (this.isAboveGround() && !this.isCollidingThrowable) {
      this.playAnimation(this.IMAGES_ROTATION); // Play the rotation animation if the object is in the air.
    } else {
      this.playAnimation(this.IMAGES_SPLASH); // Play the splash animation if the object hits the ground or an obstacle.
    }
  }
}
