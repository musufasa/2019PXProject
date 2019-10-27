class medeaCutscene extends Phaser.Scene {
    constructor() {
        super({key: 'medeaCutscene', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'medeaCutscene';
        backgroundLayer0 = 'bgDragon';

        
        //Death animation 
        this.load.spritesheet('dragonDeath','assets/enemy/dragonDeathSpriteSheet.png', 
           { frameWidth: 2048, frameHeight: 1024 });
            
                this.load.spritesheet('medeaBoss','assets/enemy/medeaBoss.png',
        {    frameWidth: 200, frameHeight: 242});
                        
        this.load.spritesheet('medeaBossRight','assets/enemy/medeaBossRight.png',
        {    frameWidth: 200, frameHeight: 242});
        
        this.load.spritesheet('medeaTaking','assets/enemy/medeaTaking.png',
        {    frameWidth: 338, frameHeight: 306});  
        commonPreload();
        dragonPhase = 1;
        onFire=false;
    }

    create() {

                this.anims.create({
            key: 'dragonDeath',
            frames: createThis.anims.generateFrameNumbers('dragonDeath', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        
        createThis.anims.create({
            key: 'medeaBoss',
            frames: createThis.anims.generateFrameNumbers('medeaBoss', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
                createThis.anims.create({
            key: 'medeaBossRight',
            frames: createThis.anims.generateFrameNumbers('medeaBossRight', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        

        
        createThis.anims.create({
            key: 'medeaTaking',
            frames: createThis.anims.generateFrameNumbers('medeaTaking', { start: 0, end: 23 }),
            frameRate: 15,
            repeat: false
        });
        
        loadMap();
        
        //Set empty quest on map load 
        setToEmptyQuest();
           
        items[6].setScale(0.45);

    }
    update() {
        callUpdateFuncs();
    }


}