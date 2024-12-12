class SmallChicken extends MovableObject {
  
    y = 350;
    height = 75;
    width = 50;
    enemyisDead = false;
    chickenDead = false;

    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    }
    IMAGES_WALKING = [
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        
    ];

    IMAGES_DEAD = [
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    soundPlayed = false;

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25
        this.animate();
    }
    animate(){
        setInterval(() => {
            this.chickenMoves();
        }, 1000/60);
        
        setInterval(() => {
            if(!this.chickenDead){
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.chickenAnimationDead();
                
            }
            
    }, 1000/7);
    
    }
    chickenAnimationDead() {
        if (!this.soundPlayed) { 
            this.loadImage(this.IMAGES_DEAD);
            this.playSound(world.chickenDead_sound);
            this.soundPlayed = true; 

            setTimeout(() => {
                this.IMAGES_DEAD = [];
            }, 500);
        }
    }
   
    chickenMoves() {
        if (!this.enemyIsDead) {
            this.moveLeft();
        }
    }


}