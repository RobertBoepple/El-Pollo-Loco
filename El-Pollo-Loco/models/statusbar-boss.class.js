class StatusBarBoss extends DrawableObject {
  IMAGES = [
    '../El-Pollo-Loco/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    '../El-Pollo-Loco/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    '../El-Pollo-Loco/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    '../El-Pollo-Loco/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    '../El-Pollo-Loco/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    '../El-Pollo-Loco/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 510;
    this.y = -5;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Updates the displayed health percentage of the boss and resolves the corresponding image.
   * @param {number} percentage - The current health percentage of the boss (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the boss's current health percentage.
   * @returns {number} The index of the corresponding image in the `IMAGES` array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
