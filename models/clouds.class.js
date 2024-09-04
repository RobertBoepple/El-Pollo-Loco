class Clouds extends MovableObject {

    y = 50
    height = 250;
    width = 400;

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/5_background/layers/4_clouds/2.png');

        this.x = Math.random() * 500;
        

    }
    }

