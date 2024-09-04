class BackgroundObject extends MovableObject {

    width = 720;
    height = 400;

    constructor() {
        super().loadImage('../El-Pollo-Loco/img/5_background/layers/1_first_layer/1.png');
        this.x = 0;
        this.y = 480-this.height;
    }
}