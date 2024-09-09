class Coins extends MovableObject {

    width = 100;
    height = 100;
    collected = false;
    IMAGES = [
        '../El-Pollo-Loco/img/8_coin/coin_1.png',
        '../El-Pollo-Loco/img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('../El-Pollo-Loco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 1500;
        this.y = 100 + Math.random() * 100;
        this.animate();
    }
    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000/60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES);
    }, 1000/7);
    }
    




};