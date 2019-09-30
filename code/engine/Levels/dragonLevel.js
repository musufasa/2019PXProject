class dragonLevel extends Phaser.Scene {
    constructor() {
        super({key: 'dragonLevel', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'dragonLevel';
        backgroundLayer0 = 'bgDragon';
        this.load.spritesheet('dragonSprite','assets/enemy/dragon2.png', 
           { frameWidth: 296, frameHeight: 322 });
        
        this.load.spritesheet('fireAnimation', 'assets/enemy/fireSheet.png', { frameWidth: 1920, frameHeight: 137 });
        
        this.load.spritesheet('dragonAttack', 'assets/enemy/dragonAttackSheet.png', { frameWidth: 365, frameHeight: 322 });
        
        commonPreload();
        dragonPhase = 1;

    }

    create() {
        this.anims.create({
            key: 'dragonSpriteRight',
            frames: createThis.anims.generateFrameNumbers('dragonSprite', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        
                this.anims.create({
            key: 'dragonAttackRight',
            frames: createThis.anims.generateFrameNumbers('dragonAttack', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        
        loadMap();
        
        //Set empty quest on map load 
        setToEmptyQuest();

        //every 60 seconds change the dragon phase on a loop.
        this.time.addEvent({ delay: 12000, callback: this.updateDragonPhase, callbackScope: this, loop: true });
    }
    update() {
        callUpdateFuncs();
    }

     updateDragonPhase() {

         switch (dragonPhase) {
             case 1:
                 dragonPhase = 2;
                 break;
             case 2:
                 dragonPhase = 3;
                 break;
             default:
                 dragonPhase = 1;
                 break;
         }

    }
}