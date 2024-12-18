class DrawableObject {
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
        try{
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
        console.log('Could not load image', this.img.src);
    }
}
    
    loadImages(arr) {
        arr.forEach(path => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
        });
    }


    playSound(sound) {
        if (!isMuted) {
            sound.play();
        }
    }

}