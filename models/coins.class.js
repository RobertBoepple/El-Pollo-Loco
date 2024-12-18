class Coins extends MovableObject {
  width = 100;
  height = 100;
  collected = false;
  energy = 0;
  IMAGES = [
    '../El-Pollo-Loco/img/8_coin/coin_1.png',
    '../El-Pollo-Loco/img/8_coin/coin_2.png',
  ];

  offset = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  };

  constructor() {
    super().loadImage('../El-Pollo-Loco/img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES);
    this.x = 400 + Math.random() * 3000;
    this.y = 100 + Math.random() * 100;
    this.animate();
  }

  /**
   * Handles the logic for when the coin is collected:
   * - Clears the animation images if the coin has been collected.
   */
  coinCollected() {
    if (this.collected) {
      this.IMAGES = [];
      this.loadImage(this.IMAGES);
    }
  }

  /**
   * Plays the coin animation if it has not been collected.
   */
  coinAnimation() {
    if (!this.collected) {
      this.playAnimation(this.IMAGES);
    }
  }

  /**
   * Animates the coin by cycling through its images at ~7 frames per second.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 1000 / 7);
  }
}
