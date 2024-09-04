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
        new BackgroundObject(),];

    ctx;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

          this.addToMap(this.character);
          this.addObjectsToMap(this.clouds);
          this.addObjectsToMap(this.enemies);
          this.addObjectsToMap(this.backgroundObjects);

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