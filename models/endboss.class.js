class Endboss extends MovableObject {

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
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G5.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G6.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G7.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G8.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G9.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G10.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G11.png',
        '../El-Pollo-Loco/img/4_enemie_boss_chicken/2_alert/G12.png'
        
    ];

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 700;
        this.animate();

        
    }

animate(){
    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
}, 1000/7);}


}