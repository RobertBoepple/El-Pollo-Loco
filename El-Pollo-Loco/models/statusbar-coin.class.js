class CoinStatusBar extends DrawableObject {
  IMAGES = [
    '../El-Pollo-Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    '../El-Pollo-Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    '../El-Pollo-Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    '../El-Pollo-Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    '../El-Pollo-Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    '../El-Pollo-Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 0;
    this.y = 25;
    this.width = 200;
    this.height = 45;
  }

  /**
   * Updates the displayed coin percentage and resolves the corresponding image.
   * @param {number} percentage - The current coin percentage (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the current coin percentage.
   * @returns {number} The index of the corresponding image in the `IMAGES` array.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
