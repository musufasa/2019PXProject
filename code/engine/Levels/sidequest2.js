class sidequest2 extends Phaser.Scene {
    constructor() {
        super({key: 'sidequest2', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'sidequest2';
        backgroundLayer0 = 'bgDragon';
        playerInvulnerability = false;
        commonPreload();
                this.load.spritesheet('fox','assets/enemy/fox.png',
        {frameWidth: 120, frameHeight: 79});    
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
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }

    update() {
        callUpdateFuncs();

    }
}
