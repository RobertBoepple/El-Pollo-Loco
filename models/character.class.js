class Character extends MovableObject{
    speed = 5 ;
    IMAGES_WALKING = [
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-22.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-23.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-24.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-25.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-26.png',
    ];
    world;
    

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

            this.animate();
    }
    
    animate(){

        setInterval(() => {
            if(this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if(this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
        }, 1000 / 60);

        setInterval(() => {

          if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
          
          
          //Walk Animation
          let i = this.currentImage % this.IMAGES_WALKING.length;  
          let path = this.IMAGES_WALKING[i];
          this.img = this.imageCache[path];
          this.currentImage++;
        }
    }, 1000/10);
    }

    jump(){

    }
}
