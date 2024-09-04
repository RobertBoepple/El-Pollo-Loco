class Clouds extends MovableObject {

    y = 50
    height = 250;
    width = 400;

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/5_background/layers/4_clouds/2.png');

        this.x = Math.random() * 500;
        this.animate();

    }

    animate(){
        setInterval(() => {
            this.x -= 1;
            if(this.x < -400){
                this.x = 800;
            }
        }, 1000/25);
    }
    }

