class MovableObject {
    x = 150;
    y = 285;
    img;
    height = 150;
    width = 100;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    moveRight(){
        console.log('move right');
    }

    moveLeft(){}
}