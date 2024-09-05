class Character extends MovableObject{

    height=250
    y=80;
    speed = 10 ;
    IMAGES_WALKING = [
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-22.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-23.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-24.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-25.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-26.png',
    ];
    world;
    walking_sound = new Audio('../El-Pollo-Loco/audio/walking.mp3');
    

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        this.animate();
    }
    
    animate(){

        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if(this.world.keyboard.LEFT && this.x > -615) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {

          if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
          
          
          //Walk Animation
          this.playAnimation(this.IMAGES_WALKING);
        }
    }, 1000/10);
    }

    jump(){

    }
}
