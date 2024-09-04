class Character extends MovableObject{
    
    IMAGES_WALKING = [
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-22.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-23.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-24.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-25.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-26.png',
    ];
    currentImage = 0;

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

            this.animate();
    }
    
    animate(){

        setInterval(() => {
          let i = this.currentImage % this.IMAGES_WALKING.length;  
          let path = this.IMAGES_WALKING[i];
          this.img = this.imageCache[path];
          this.currentImage++;
    }, 1000/7);
    }

    jump(){

    }
}
