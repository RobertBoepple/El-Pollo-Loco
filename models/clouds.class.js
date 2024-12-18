class Clouds extends MovableObject {
  y = 50;
  height = 250;
  width = 400;

  constructor() {
    super().loadImage(
      '../El-Pollo-Loco/img/5_background/layers/4_clouds/2.png'
    );

    this.x = Math.random() * 4000;
    this.animate();
  }

  /**
   * Animates the cloud by moving it left across the screen at a constant speed.
   * If the cloud moves out of the screen on the left, it resets to the right side of the screen.
   */
  animate() {
    setInterval(() => {
      this.x -= 1;
      if (this.x < -400) {
        this.x = 4300;
      }
    }, 1000 / 25);
  }
}
