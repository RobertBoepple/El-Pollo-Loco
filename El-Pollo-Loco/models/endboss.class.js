class Finalboss extends MovableObject {
  height = 288;
  width = 216;
  y = 150;
  speed = 5;

  offset = {
    top: 50,
    bottom: 10,
    left: 10,
    right: 10,
  };
  IMAGES_WALKING = [
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/1_walk/G1.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/1_walk/G2.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/1_walk/G3.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/1_walk/G4.png',
  ];
  IMAGES_ALERT = [
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G5.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G6.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G7.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G8.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G9.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G10.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G11.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_ATTACK = [
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G13.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G14.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G15.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G16.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G17.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G18.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G19.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = [
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/4_hurt/G21.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/4_hurt/G22.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DEAD = [
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/5_dead/G24.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/5_dead/G25.png',
    '../El-Pollo-Loco/img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3700;
    this.animate();
  }

  /**
   * Reduces the Final Boss's energy when hit.
   * If energy drops to 0, the Final Boss is defeated.
   * Otherwise, records the time of the last hit.
   */
  hitFinalBoss() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHitFinalBoss = new Date().getTime();
    }
  }

  /**
   * Checks if the Final Boss is currently hurt.
   * @returns {boolean} True if the Final Boss was hit within the last second, otherwise false.
   */
  isHurtFinalBoss() {
    let timePassed = new Date().getTime() - this.lastHitFinalBoss;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the Final Boss is dead.
   * @returns {boolean} True if the Final Boss's energy is 0, otherwise false.
   */
  isDeadFinalBoss() {
    return this.energy === 0;
  }

  /**
   * Manages the animations for the Final Boss based on its state.
   */
  finalBossAnimation() {
    if (this.isDeadFinalBoss()) {
      this.finalBossAnimationDead();
    } else if (this.isHurtFinalBoss()) {
      this.finalBossAnimationHurt();
    } else if (this.i < 15) {
      this.finalBossAnimationAlert();
    } else if (this.i < 30) {
      this.finalBossAnimationAttack();
    } else {
      this.finalBossAnimationAttack();
    }
    this.i++;
    this.finalBossFirstContact();
  }

  /**
   * Plays the "dead" animation for the Final Boss.
   * Stops the game music, plays the victory sound, and triggers the game win screen.
   */
  finalBossAnimationDead() {
    this.playAnimation(this.IMAGES_DEAD);
    world.gameOver = true;
    world.background_music.pause();
    world.win_sound.play();
    setTimeout(() => {
      gameWon();
    }, 2000);
  }

  /**
   * Plays the "hurt" animation for the Final Boss.
   */
  finalBossAnimationHurt() {
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * Plays the "alert" animation for the Final Boss.
   */
  finalBossAnimationAlert() {
    this.playAnimation(this.IMAGES_ALERT);
  }

  /**
   * Plays the "attack" animation for the Final Boss.
   */
  finalBossAnimationAttack() {
    this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * Plays the "walking" animation for the Final Boss.
   */
  finalBossAnimationWalk() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Handles the first interaction between the player and the Final Boss.
   * Resets animation state if the player reaches a specific position.
   */
  finalBossFirstContact() {
    if (world.character.x > 2525 && !this.hadFirstContact) {
      this.i = 0;
      this.hadFirstContact = true;
    }
  }

  /**
   * Sets up intervals to manage the Final Boss's animations, movement, and sounds.
   */
  animate() {
    setInterval(() => {
      this.finalBossAnimation();
    }, 200);

    setInterval(() => {
      if (
        this.hadFirstContact &&
        this.i > 30 &&
        !this.isDeadFinalBoss() &&
        !this.isHurtFinalBoss()
      ) {
        this.x -= this.speed;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isHurtFinalBoss()) {
        this.playSound(world.finalbossHurt_sound);
      }
    }, 100);
  }
}
