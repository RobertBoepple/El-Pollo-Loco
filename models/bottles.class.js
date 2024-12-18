class Bottles extends MovableObject {
  width = 100;
  height = 100;
  collected = false;
  IMAGES = ['../El-Pollo-Loco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
  y = 330;

  offset = {
    top: 15,
    left: 40,
    right: 25,
    bottom: 15,
  };

  constructor() {
    super().loadImage(
      '../El-Pollo-Loco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    );
    this.loadImages(this.IMAGES);
    this.x = 300 + Math.random() * 3000;
    this.animate();
  }

  /**
   * Animates the bottle by cycling through its images at ~7 frames per second.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 1000 / 7); // 7 frames per second.
  }
}
