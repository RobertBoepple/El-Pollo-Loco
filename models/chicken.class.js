class Chicken extends MovableObject {
  
    y = 350;
    height = 75;
    width = 50;
    IMAGES_WALKING = [
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        
    ];

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25
        this.animate();
    }
    animate(){
        this.moveLeft();

        setInterval(() => {
          let i = this.currentImage % this.IMAGES_WALKING.length;  
          let path = this.IMAGES_WALKING[i];
          this.img = this.imageCache[path];
          this.currentImage++;
    }, 1000/7);
    }




}