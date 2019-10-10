class roadToColchis extends Phaser.Scene {
    constructor() {
        super({key: 'roadToColchis', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'roadToColchis';
        backgroundLayer0 = 'bgDragon';
        commonPreload();
         this.load.spritesheet('fox','assets/enemy/fox.png',
        {frameWidth: 120, frameHeight: 79}); 
        
        this.load.spritesheet('centaurEnemy','assets/enemy/centaur.png',{frameWidth: 192, frameHeight: 256});
    }

    create() {
        loadMap(); 
        
        createThis.anims.create({
            key: 'foxLeft',
            frames: createThis.anims.generateFrameNumbers('foxEnemy', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'foxRight',
            frames: createThis.anims.generateFrameNumbers('foxEnemy', { start: 8, end: 11 }),
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