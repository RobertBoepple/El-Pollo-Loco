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

    ctx;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

          this.addObjectsToMap(this.backgroundObjects);
          this.addToMap(this.character);
          this.addObjectsToMap(this.clouds);
          this.addObjectsToMap(this.enemies);
          

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }
}