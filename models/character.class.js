class Character extends MovableObject{

    height = 200;
    y = 220;
    speed = 10 ;
    idleTime = 0;

    offset = {
        top: 80,
        bottom: 0,
        left: 20,
        right: 20,
    }

    IMAGES_WALKING = [
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-22.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-23.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-24.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-25.png',
            '../El-Pollo-Loco/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING =[
        '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-31.png',
        '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-32.png',
        '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-33.png',
        '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-34.png',
        '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-35.png',
        '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-36.png',
        '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-37.png',
        '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-38.png',
        '../El-Pollo-Loco/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [ 
        '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-51.png',
        '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-52.png',
        '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-53.png',
        '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-54.png',
        '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-55.png',
        '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-56.png',
        '../El-Pollo-Loco/img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        '../El-Pollo-Loco/img/2_character_pepe/4_hurt/H-41.png',
        '../El-Pollo-Loco/img/2_character_pepe/4_hurt/H-42.png',
        '../El-Pollo-Loco/img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_STANDING = [
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-1.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-2.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-3.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-4.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-5.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-6.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-7.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-8.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-9.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/idle/I-10.png' 
    ];

    IMAGES_SLEEPING = [
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../El-Pollo-Loco/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    walking_sound = new Audio('../El-Pollo-Loco/audio/walking.mp3');
    

    constructor(){
        super().loadImage('../El-Pollo-Loco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
    }
    
    animate(){

        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
                this.idleTime = 0;
            }

            if(this.world.keyboard.LEFT && this.x > -615) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
                this.idleTime = 0;
            }


            if(this.world.keyboard.SPACE && !this.isAboveGround()){
                this.jump();
            }


            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead()) {
                console.log('Playing dead animation');
                this.playAnimation(this.IMAGES_DEAD);
            } else if(this.isHurt()){
                console.log('Playing hurt animation');
                this.playAnimation(this.IMAGES_HURT);
            } else if(this.isAboveGround()){
                console.log('Playing jumping animation');
                this.playAnimation(this.IMAGES_JUMPING);
            } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                console.log('Playing walking animation');
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                console.log('Playing idle animation');
                this.characterAnimationIdle();
            }
    },50);
    }

    characterAnimationIdle() {
        this.playAnimation(this.IMAGES_STANDING);
        console.log('Idle time', this.idleTime);
        this.idleTime += 150;
        if (this.idleTime >=6000) {
            this.playAnimation(this.IMAGES_SLEEPING);
        }
    }

    playAnimation(images) {
        if (!images || images.length === 0) {
            console.error('No images to play animation');
            return;
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
};


