class interStage3 extends Phaser.Scene {
    constructor() {
        super({key: 'interStage3', active: false });
    }

    preload() {
        
        //Create local context to createThis, set level id, background layer, disable player invulnerability and carry out common preload tasks common to all levels
        createThis = this;
        currentLevelID = 'interStage3';
        backgroundLayer0 = 'bgSky';
        playerInvulnerability = false;
        commonPreload();
        
        //Load spritesheets for enemies 
        this.load.spritesheet('snake','assets/enemy/snake.png', {frameWidth: 120, frameHeight: 83});    
        this.load.spritesheet('centaurEnemy','assets/enemy/centaur.png',{frameWidth: 192, frameHeight: 256});   
        this.load.spritesheet('minotaurSprite', 'assets/enemy/minotaur.png',{frameWidth: 48, frameHeight: 48});    
    }

    create() {
        
        //Call loadMap function present in base.js 
        loadMap();
            
        //Create required animations for enemies 
        createThis.anims.create({
            key: 'snakeLeft',
            frames: createThis.anims.generateFrameNumbers('snake', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'snakeRight',
            frames: createThis.anims.generateFrameNumbers('snake', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'centaurLeft',
            frames: createThis.anims.generateFrameNumbers('centaurEnemy', {start: 3, end: 5}),
            frameRate: 10, 
            repeat: -1 
        });
        createThis.anims.create({
            key: 'centaurRight',
            frames: createThis.anims.generateFrameNumbers('centaurEnemy', {start: 6, end: 8}),
            frameRate: 10, 
            repeat: -1 
        }); 
        createThis.anims.create({
            key: 'minotaurWalkLeft',
            frames: createThis.anims.generateFrameNumbers('minotaurSprite', { start: 20, end: 29 }),
            frameRate: 10,
            repeat: -1
        });

        createThis.anims.create({
            key: 'minotaurSwingLeft',
            frames: createThis.anims.generateFrameNumbers('minotaurSprite', { start: 30, end: 39}),
            frameRate: 30,
            repeat: -1
        });
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }

    update() {
        callUpdateFuncs();

    }
}