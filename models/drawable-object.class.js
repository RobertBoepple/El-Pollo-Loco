class DrawableObject{
    img;
    imageCache= {};
    currentImage = 0;
    x = 150;
    y = 275;
    height = 150;
    width = 100;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coins || this instanceof Bottles){
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
    
    loadImages(arr) {
        arr.forEach(path => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
        });
    }




}