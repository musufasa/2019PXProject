var currentProjectile = 0; //The current projectile. Used for the projectileId.  
var projectiles = []; //Array storing all projectiles. 

var currentProjectile2;
var playerProjectiles=[];

/* Projectile base class. 
 * This is used to create other projectiles, so this should not be spawned directly. 
 * Required parameters: x, y, scene, key, velocityX, projectileId, damage. 
 * Optional parameters: velocityAimed. 
 */
class projectile extends Phaser.GameObjects.Sprite {
    constructor (parameter) {
        //Create object. 
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Movement. 
        this.body.setVelocityX(parameter.velocityX);
        this.body.allowGravity = false; 
        this.projectileId = parameter.projectileId;
        this.damage = parameter.damage; 
        this.velocityAimed = parameter.velocityAimed;

        //Collision
        createThis.physics.add.overlap(this, player, this.playerDamage);

        //Increment current projectile count. 
        currentProjectile++;
    }

    //Damage the player's health when player collides into this projectile.
    playerDamage(tempProjectile) {
        if(blocking==false){
            playerDamage(tempProjectile.damage);
            
        }
        projectiles[tempProjectile.projectileId].destroy();
    }
}

/* Spider web. 
 * Used in the shrine forest level. 
 * Required parameters: x, y, projectileId.
 */
class spiderBossWeb extends projectile {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'spiderBossWebSprite',
            velocityX: -100,
            projectileId: parameter.projectileId,
            damage: 10
        })
    }
}

/* Dragon fire projectile. 
 * If aimed is set to true, the projectile will aim towards the player. 
 * Required parameters: x, y, projectileId, aimed.
 */
class dragonFire extends projectile {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'fireBallSprite',
            velocityX: 0,
            velocityAimed: parameter.velocityAimed,
            projectileId: parameter.projectileId,
            damage: 25
        })
            this.rotation = Phaser.Math.Angle.Between(this.x,this.y,player.x,player.y)+10;
        if(dragonPhase==1){    
        this.anims.play('fireBallSprite', true);
        }
            this.setScale(.25);
        this.hugeFireMovement = parameter.hugeFireMovement !== undefined && parameter.hugeFireMovement;


        //If aimed is true, accelerate towards the player. 
        if (parameter.aimed){
            createThis.physics.accelerateToObject(this, player, this.velocityAimed);
        } else if (this.hugeFireMovement) {
            //If they are put of the dragon's 'huge fire', move in a random direction. 
            this.body.velocity.x = Math.random() * 200 - 100; 
            this.body.velocity.y = Math.random() * 200 - 100;
        }
    }
}


class chargeDragonFire extends projectile {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'fireBallSprite',
            velocityX: 0,
            velocityAimed: parameter.velocityAimed,
            projectileId: parameter.projectileId,
            damage: 50
        })
                    this.setScale(.5);

                    this.anims.play('fireBallSprite', true);

            this.rotation = Phaser.Math.Angle.Between(this.x,this.y,player.x,player.y)+10;
        //If aimed is true, accelerate towards the player. 
        if (parameter.aimed){
              createThis.physics.accelerateToObject(this, player, this.velocityAimed);
        } 
        
        

    }
}


class medeaArrow extends projectile {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'medeaArrow1',
            velocityX: 0,
            velocityAimed: parameter.velocityAimed,
            projectileId: parameter.projectileId,
            damage: 10
        })
            this.setScale(.03);
        
        this.rotation = Phaser.Math.Angle.Between(this.x,this.y,player.x,player.y);
        //If aimed is true, accelerate towards the player. 
        if (parameter.aimed){
              createThis.physics.accelerateToObject(this, player, this.velocityAimed);
        } 
        
        

    }
}


class medeaprojectile extends Phaser.GameObjects.Sprite {
    constructor (parameter) {
        //Create object. 
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Movement. 
        this.body.setVelocityX(parameter.velocityX);
        this.body.allowGravity = false; 
        this.projectileId = parameter.projectileId;
        this.damage = parameter.damage; 
        this.velocityAimed = parameter.velocityAimed;

        //Collision
        createThis.physics.add.overlap(this, player, this.playerDamage);

        //Increment current projectile count. 
        currentProjectile++;
    }

    //Damage the player's health when player collides into this projectile.
    playerDamage(tempProjectile) {
        if(blocking==false){
            playerDamage(tempProjectile.damage);
            
        }
        player.x=player.x+50;        //pushes the player
        projectiles[tempProjectile.projectileId].destroy();
    }
}

class medeaArrow2 extends medeaprojectile {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'medeaArrow2',
            velocityX: 0,
            velocityAimed: parameter.velocityAimed,
            projectileId: parameter.projectileId,
            damage: 10
        })
            this.setScale(.1);

        
        this.rotation = Phaser.Math.Angle.Between(this.x,this.y,player.x,player.y);
        //If aimed is true, accelerate towards the player. 
        if (parameter.aimed){
              createThis.physics.accelerateToObject(this, player, this.velocityAimed);
        } 
        
        

    }
}

//For acid flask thrown by medea in phase 3 of her boss battle 
class medeaAcidFlask extends medeaprojectile {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'acidflask',
            velocityX: 0,
            velocityAimed: parameter.velocityAimed,
            projectileId: parameter.projectileId,
            damage: 10
        })
            
        this.setScale(.42);

        
        this.rotation = Phaser.Math.Angle.Between(this.x,this.y,player.x,player.y);
        //If aimed is true, accelerate towards the player. 
        if (parameter.aimed){
              createThis.physics.accelerateToObject(this, player, this.velocityAimed);
        } 
        
        

    }
}




class projectile2 extends Phaser.GameObjects.Sprite {
    constructor (parameter) {
        //Create object. 
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Movement. 
        this.body.setVelocityX(parameter.velocityX);
        this.body.allowGravity = false; 
        this.projectileId = parameter.projectileId;
        this.damage = parameter.damage; 
        this.velocityAimed = parameter.velocityAimed;
        //Collision with any enemy.
        createThis.physics.add.overlap(this, enemies, this.enemyDamage);
        createThis.physics.add.overlap(this, mapLayer, this.checkForTileCollision);
        //Increment current projectile count. 
        currentProjectile++;
    }

    //Damage an enemy's health when player projectile collides.
    enemyDamage(tempProjectile,tempEnemy) {
        tempProjectile.destroy();
        //only damage enemies on collision if they can take damage from the arrows.
        if(enemies[tempEnemy.enemyId].canTakeRangedDamage) {
            enemies[tempEnemy.enemyId].health -= tempProjectile.damage;
            enemies[tempEnemy.enemyId].invulnerability = true;
            enemies[tempEnemy.enemyId].alpha = 0.3;
            enemies[tempEnemy.enemyId].setTint(0xFF0000);
            if (enemies[tempEnemy.enemyId].body.allowGravity) {
                enemies[tempEnemy.enemyId].knockback = true;
            }
            setTimeout(tempEnemy.invulnerabilityStop, 500, tempEnemy.enemyId);
        }
    }

    checkForTileCollision(tempProjectile,tempTile){
        //todo: probably need to optimize this as it calls on every movement of the projectile lifespan.
        if(tempTile.canCollide){
            tempProjectile.destroy();
        }
    }

}

class playerArrow extends projectile2 {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'arrowAmmo',
            velocityX: 0,
            velocityAimed: parameter.velocityAimed,
            projectileId: parameter.projectileId,
            damage: playerDamagePoints
        })

                    this.setScale(.5);
        //aim the arrow image at the mouse and fire towards it
        this.rotation = Phaser.Math.Angle.Between(this.x,this.y,camera.scrollX+game.input.mousePointer.x, camera.scrollY+game.input.mousePointer.y);
        createThis.physics.moveTo(this,camera.scrollX+game.input.mousePointer.x, camera.scrollY+game.input.mousePointer.y, this.velocityAimed);

    }
}


