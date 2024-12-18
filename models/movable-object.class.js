class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Applies gravity to the object by modifying its vertical position (`y`) over time.
   * Objects above the ground or with upward velocity will experience a downward pull.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground or is a throwable object, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 200;
    }
  }

  /**
   * Determines if this object is colliding with another `MovableObject`.
   * @param {MovableObject} mo - The other object to check collision against.
   * @returns {boolean} True if the objects are colliding, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

/**
 * Reduces the object's energy by 1 and records the timestamp of the hit.
 * If energy reaches 0, the object is considered "dead."
 * Prevents hits from being registered too frequently.
 */
hit() {
  const now = new Date().getTime();
  const timeSinceLastHit = (now - this.lastHit) / 1000;

  if (timeSinceLastHit >= 1) {
    this.energy -= 20;

    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = now;
      console.log(this.energy);
    }
  }
}

  /**
   * Checks if the object is "dead" (energy equals 0).
   * @returns {boolean} True if the object is dead, otherwise false.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks if the object is currently "hurt" (hit within the last second).
   * @returns {boolean} True if the object was recently hit, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Moves the object to the right by increasing its `x` position.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by decreasing its `x` position.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Cycles through and displays the provided animation images.
   * @param {string[]} images - Array of image paths to animate.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Makes the object "jump" by setting its vertical speed and position.
   * Causes an upward motion due to gravity.
   */
  jump() {
    this.speedY = 30;
    this.y = 220;
  }
}
