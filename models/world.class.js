class World {
    character = new Character();
    level =level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollision() {
    setInterval(() => {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('Collision with Charakter, energy',this.character.energy);
            }
        });
    }, 200);
}

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

          this.addObjectsToMap(this.level.backgroundObjects);
          this.ctx.translate(-this.camera_x, 0);
          this.addToMap(this.statusBar);
          this.ctx.translate(this.camera_x, 0);
          this.addToMap(this.character);
          this.addObjectsToMap(this.level.clouds);
          this.addObjectsToMap(this.level.enemies);
          
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
            mo.draw(this.ctx);
            
        }
        mo.drawFrame(this.ctx);
        
    }
    
}