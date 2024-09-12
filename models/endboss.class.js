class Finalboss extends MovableObject {

    height = 288;
    width = 216;
    y = 150;

    offset = {
        top: 50,
        bottom: 10,
        left: 10,
        right: 10,
    }
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
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G13.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G14.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G15.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G16.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G17.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G18.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G19.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/5_dead/G24.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/5_dead/G25.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700;
        this.animate();

        
    }

animate(){
    setInterval(() => {
        this.playAnimation(this.IMAGES_ALERT);
}, 1000/7);}


}