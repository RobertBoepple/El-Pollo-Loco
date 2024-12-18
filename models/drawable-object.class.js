class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 150;
  y = 275;
  height = 150;
  width = 100;

  /**
   * Loads an image and sets it as the object's current image.
   * @param {string} path - The file path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the provided canvas context.
   * If the image cannot be loaded, logs an error message to the console.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.log('Could not load image', this.img?.src);
    }
  }

  /**
   * Preloads an array of images and stores them in the image cache.
   * @param {string[]} arr - An array of image file paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays a sound if the game is not muted.
   * @param {HTMLAudioElement} sound - The sound to play.
   */
  playSound(sound) {
    if (!isMuted) {
      sound.play();
    }
  }
}
