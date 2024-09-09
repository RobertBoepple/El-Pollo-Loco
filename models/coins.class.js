class Coin extends MoveableObject {

    width = 100;
    height = 100;
    collected = false;
    IMAGES = [
        '../El-Pollo-Loco/img/8_coin/coin_1.png',
        '../El-Pollo-Loco/img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImages('../El-Pollo-Loco/img/8_coin/coin_1.png');
        this.x = 400 + Math.random() * 1500;
        this.y = 100 + Math.random() * 100;
        this.animate();
    }

    // coinAnnimation() {
    //     if (!this.collected) {
    //         this.playAnnimation(this.IMAGES);
    //     }
    // }

    // coinCollected() {
    //     if (this.collected) {
    //         this.IMAGES = [];
    //         this.loadImage(this.IMAGES);
    //     }
    // }

    // animate() {
    //     setInterval(() => {
    //         this.coinCollected();
    //     }, 100);
    //     setInterval(() => {
    //         this.coinAnnimation();
    //     }, 500);
    // }





}