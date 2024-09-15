class Bottles extends MovableObject {

    width = 100;
    height = 100;
    collected = false;
    IMAGES = [
        '../El-Pollo-Loco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        
    ];
    y = 330;

    constructor() {
        super().loadImage('../El-Pollo-Loco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = 300 + Math.random() * 1500;
        // this.y = 100 + Math.random() * 100;
        this.animate();
    }
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES);
    }, 1000/7);
    }
    




}; 