class Character extends MovableObject{
    

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages([
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-22.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-23.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-24.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-25.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-26.png',
            ]);
    }
 

    jump(){}
}