class MovableObject {
    x = 150;
    y = 275;
    img;
    height = 150;
    width = 100;
    imageCache= {};

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = path;
        });
        

    }
    moveRight(){
        console.log('move right');
    }

    moveLeft(){}
}