class gardenForest extends Phaser.Scene {
    constructor() {
        super({key: 'gardenForest', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'gardenForest';
        backgroundLayer0 = 'bgSky';
        backgroundLayer1 = 'bgForest';
        commonPreload();
        
        this.load.spritesheet('snake','assets/enemy/snake.png', {frameWidth: 120, frameHeight: 83});    
        
        this.load.spritesheet('centaurEnemy','assets/enemy/centaur.png',{frameWidth: 192, frameHeight: 256});
    }

    create() {
        loadMap();  

        //Create animations for all snakes on map 
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
        
        //Create walk animation for centaur 
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
        
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }

    update() {
        callUpdateFuncs(); 
    }
}