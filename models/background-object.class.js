class BackgroundObject extends MovableObject {

    width = 720;
    height = 405;

    constructor(x,y) {
        super().loadImage('../El-Pollo-Loco/img/5_background/layers/1_first_layer/1.png');
        this.x = x;
        this.y = y;
    }
}