class dragonLevel extends Phaser.Scene {
    constructor() {
        super({key: 'dragonLevel', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'dragonLevel';
        backgroundLayer0 = 'bgSky';
        this.load.spritesheet('dragonSprite','assets/enemy/dragon.png', 
           { frameWidth: 205, frameHeight: 161 });
        
                this.load.spritesheet('fireAnimation', 'assets/enemy/fireSheet.png', { frameWidth: 1920, frameHeight: 137 });
        
        commonPreload();
                dragonPhase=1;

    }

    create() {
        this.anims.create({
            key: 'dragonSpriteRight',
            frames: createThis.anims.generateFrameNumbers('dragonSprite', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        
        
        loadMap();
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }

    update() {
        callUpdateFuncs();
    }
}