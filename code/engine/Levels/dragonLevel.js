class dragonLevel extends Phaser.Scene {
    constructor() {
        super({key: 'dragonLevel', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'dragonLevel';
        backgroundLayer0 = 'bgDragon';
        
        //Used for flying and attack animation 
        this.load.spritesheet('dragonSprite','assets/enemy/dragonNew.png', 
           { frameWidth: 1242, frameHeight: 1046 });
        
        //Death animation 
        this.load.spritesheet('dragonDeath','assets/enemy/dragonDeathSpriteSheet.png', 
           { frameWidth: 2048, frameHeight: 1024 });
        
        //Ground fire animation 
        this.load.spritesheet('fireAnimation', 'assets/enemy/fireSheet.png', { frameWidth: 1920, frameHeight: 137 });
        
        //Older attack animation
        this.load.spritesheet('dragonAttack', 'assets/enemy/dragonAttackSheet.png', { frameWidth: 365, frameHeight: 322 });
        
        //Fireball animation 
        this.load.spritesheet('fireBallSprite', 'assets/enemy/FireballSpritesheet.png', { frameWidth: 515, frameHeight: 515 });
        
        commonPreload();
        dragonPhase = 1;
        onFire=false;
    }

    create() {
        this.anims.create({
            key: 'dragonSpriteRight',
            frames: createThis.anims.generateFrameNumbers('dragonSprite', { start: 19, end: 35 }),
            frameRate: 10,
            repeat: -1
        });
        
                this.anims.create({
            key: 'dragonAttackRight',
            frames: createThis.anims.generateFrameNumbers('dragonSprite', { start: 32, end: 40 }),
            frameRate: 7,
            repeat: -1
        });
        
                this.anims.create({
            key: 'fireBallSprite',
            frames: createThis.anims.generateFrameNumbers('fireBallSprite', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        
                this.anims.create({
            key: 'dragonDeath',
            frames: createThis.anims.generateFrameNumbers('dragonDeath', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        
        loadMap();
        
        //Set empty quest on map load 
        setToEmptyQuest();

        //change end portal if orpheus is selected as helper sprite and remove medea sprite and replace with orpheus.
        if(helperSprite === 'Orpheus'){
            portals[0].portalMap = "templeOfHecate";
            npcs[0].destroy();
            new orpheusNPC({
                x: 194,
                y: 1775,
                dialogueKey: "Orpheus"
            });
        }

        //every 60 seconds change the dragon phase on a loop.
        this.time.addEvent({ delay: 12000, callback: this.updateDragonPhase, callbackScope: this, loop: true });
        //change fire opacity
        this.time.addEvent({ delay: 10, callback: this.changeFireOpactity, callbackScope: this, loop: true });
        //on load reset the visibility of the fire.
        items[2].alpha = 0;
        fireVisible = false;
    }
    update() {
        callUpdateFuncs();
    }

     updateDragonPhase() {
         if(enemies[0].alive) {
             switch (dragonPhase) {
                 case 1:
                     dragonPhase = 2;
                     fireVisible = true;
                     break;
                 case 2:
                     dragonPhase = 3;
                     fireVisible = false;
                     break;
                 default:
                     dragonPhase = 1;
                     break;
             }
         }else{
             dragonPhase = 1;
         }
    }

    changeFireOpactity(){
        if(enemies[0].alive) {
            if (fireVisible) {
                if (items[2].alpha < 1) {
                    items[2].alpha += 0.01;
                }
            } else {
                if (items[2].alpha > 0) {
                    items[2].alpha -= 0.01;
                }
            }
        }else{
            items[2].alpha = 0;
        }
    }

}