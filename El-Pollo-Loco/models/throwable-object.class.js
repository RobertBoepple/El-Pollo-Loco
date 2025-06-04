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
    this.speedY = 20;
    if (!this.isCollidingThrowable) {
      this.applyGravity();
      const throwSpeed = this.otherDirection ? -10 : 10;

      setInterval(() => {
        this.x += throwSpeed;
      }, 25);
    }

   
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
      this.playAnimation(this.IMAGES_ROTATION);
    } else {
      this.playAnimation(this.IMAGES_SPLASH);
    }
  }
}
