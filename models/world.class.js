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
    maxBottles = 5;

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
        if (this.keyboard.D && !this.character.isThrowing && this.bottlesCollected > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.isThrowing = true;
            setTimeout(() => this.character.isThrowing = false, 500);  // Verhindert dauerhaftes Werfen
            
            // Reduziert die Anzahl der gesammelten Flaschen um 1
            this.bottlesCollected -= 1;
            
            // Berechnet den neuen Prozentsatz basierend auf der Anzahl der verbleibenden Flaschen
            let percentage = (this.bottlesCollected / this.maxBottles) * 100;
            
            // Aktualisiert den Status der Flaschenanzeige
            this.statusBottle.setPercentage(percentage);
            console.log("Bottles Collected: ", this.bottlesCollected);
            console.log("Percentage: ", percentage);
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
            
        }
    });
}



checkCollisionsBottles() {
    this.level.bottles.forEach((bottles, index) => {
        if(this.character.isColliding(bottles) && this.bottlesCollected < 5){
            this.bottlesCollected = this.bottlesCollected + 1;
            this.statusBottle.setPercentage(this.bottlesCollected *20);
            this.level.bottles.splice(index, 1);
            if(this.statusBottle.bottlesCollected > 100){
                this.statusBottle.bottlesCollected = 100;
            }
            
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