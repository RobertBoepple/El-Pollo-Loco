class MovableObject {
    x = 150;
    y = 275;
    img;
    height = 150;
    width = 100;
    imageCache= {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right:0,
    }

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
              this.y -= this.speedY;
              this.speedY -= this.acceleration;
           }
        }, 1000/60);
    }


    isAboveGround(){
        return this.y < 180;
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss){
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'blue' ;
        ctx.rect(
            this.x + this.offset.left, 
            this.y + this.offset.top, 
            this.width - this.offset.right - this.offset.left, 
            this.height - this.offset.bottom - this.offset.top);
        ctx.stroke();
        }
    }

    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
                this.y + this.height -this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 5;
        if(this.energy <= 0){
            this.energy = 0;
           }
    }

    isDead(){
        return this.energy == 0;
    }

    loadImages(arr){
        arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
        });
        

    }
    moveRight(){
        this.x += this.speed;   
    }

    moveLeft(){
        this.x -= this.speed;
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;  
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump(){
        this.speedY = 30;
    }
}