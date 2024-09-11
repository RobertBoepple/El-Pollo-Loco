class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBoss = new StatusBarBoss();
    statusCoin = new CoinStatusBar();
    statusBottle = new BottleStatusBar();
    throwableObjects = [];
    coinsCollected = 0;
    bottlesCollected = 0;

    chickenDead_sound = new Audio('../El-Pollo-Loco/audio/chicken.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        requestAnimationFrame(() => {
            this.checkCollisions();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkThrowObjects();
            this.run();
        });
    }
    

checkThrowObjects() {
    if (this.keyboard.D && !this.character.isThrowing) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.character.isThrowing = true;
        setTimeout(() => this.character.isThrowing = false, 500);  // Verhindert dauerhaftes Werfen
    }
}


checkCollisions() {
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.chickenDead) {
            this.character.jump();
            enemy.chickenDead = true;
            enemy.enemyIsDead = true
            console.log('Enemy defeated by jumping');
        } 
        else if (this.character.isColliding(enemy) && !enemy.chickenDead && !this.character.isAboveGround()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            console.log('Character hit, energy:', this.character.energy);
        }
    });
}


checkCollisionsCoins() {
    this.level.coins.forEach((coins, index) => {
        if(this.character.isColliding(coins)){
            coins.collected = true;
            this.coinsCollected = this.coinsCollected + 20;
            this.statusCoin.setPercentage(this.coinsCollected);
            this.level.coins.splice(index, 1);
            console.log('Collision with Coin, Coin ',this.coinsCollected);
        }
    });
}


// checkCollisionsBottles() {
//     this.level.bottles.forEach((bottles, index) => {
//         if(this.character.isColliding(bottles)){
//             this.bottlesCollected = this.bottlesCollected + 20;
//             this.statusBottle.setPercentage(this.bottlesCollected);
//             this.level.bottles.splice(index, 1);
//             console.log('Collision with Bottle, Bottle ',this.bottlesCollected);
//         }
//     });
// }

checkCollisionsBottles() {
    this.level.bottles.forEach((bottles, index) => {
        if(this.character.isColliding(bottles) && this.bottlesCollected < 100){
            this.bottlesCollected = this.bottlesCollected + 20;
            this.statusBottle.setPercentage(this.bottlesCollected);
            this.level.bottles.splice(index, 1);
            if(this.statusBottle.setPercentage > 100){
                this.statusBottle.setPercentage = 100;
            }
            console.log('Collision with Bottle, Bottle ',this.bottlesCollected);
        }
    });
}

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

          this.addObjectsToMap(this.level.backgroundObjects);
          this.addObjectsToMap(this.level.clouds);
          this.ctx.translate(-this.camera_x, 0);
          this.addToMap(this.statusBar);
          this.addToMap(this.statusBoss);
          this.addToMap(this.statusCoin);
          this.addToMap(this.statusBottle);
          this.ctx.translate(this.camera_x, 0);
          this.addToMap(this.character);
          this.addObjectsToMap(this.throwableObjects);
          this.addObjectsToMap(this.level.enemies);
          this.addObjectsToMap(this.level.coins);
          this.addObjectsToMap(this.level.bottles);
          
          
         
          
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