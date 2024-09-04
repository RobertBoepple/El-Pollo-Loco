class Chicken extends MovableObject {
  

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 400 + Math.random() * 500;
    }

}