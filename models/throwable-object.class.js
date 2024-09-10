class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = [
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH =[
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        
    ];
    isColliding = false;
    constructor(x, y) {
        super().loadImages(['../El-Pollo-Loco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png']);

        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate()
        
    }

    throw() {
        this.speedY = 20;
        if (!this.isColliding) {
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);   
        }       
        setInterval(() => {
            this.animate();
        }, 100);
    }


    animate() {
        if (this.isAboveGround() && !this.isColliding) {
            this.playAnimation(this.IMAGES_ROTATION);  
        }
        else {
            this.playAnimation(this.IMAGES_SPLASH);  
        }

    }
    
   
}