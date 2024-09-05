class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Clouds()];
    backgroundObjects = [
        new BackgroundObject('../El-Pollo-Loco/img/5_background/layers/air.png'),
        new BackgroundObject('../El-Pollo-Loco/img/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('../El-Pollo-Loco/img/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('../El-Pollo-Loco/img/5_background/layers/1_first_layer/1.png'),
        ];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

          this.addObjectsToMap(this.backgroundObjects);
          this.addToMap(this.character);
          this.addObjectsToMap(this.clouds);
          this.addObjectsToMap(this.enemies);
          
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(mo) {
        if(mo.otherDirection){
            this.ctx.save();
            this.ctx.translate(mo.x + mo.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }
}