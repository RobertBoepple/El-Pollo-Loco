class Chicken extends MovableObject {
  
    y = 350;
    height = 75;
    width = 50;
    chickenDead = false;

    offset = {
        top: 5,
        bottom: 10,
        left: 0,
        right: 0,
    }
    IMAGES_WALKING = [
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        
    ];

    IMAGES_DEAD = [
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25
        this.animate();
    }
    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000/60);
        
        setInterval(() => {
            if(!this.chickenDead){
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
            
    }, 1000/7);
    }

    // chickenAnimateDead() {
    //     this.loadImage(this.IMAGES_DEAD);
    //     if (this.musicCounter === 0) {
    //         this.playSound(world.chickenDead_music);
    //     }
    //     this.musicCounter++;
    //     setTimeout(() => {
    //         this.IMAGES_DEAD = [];
    //     }, 500);
    // }



}