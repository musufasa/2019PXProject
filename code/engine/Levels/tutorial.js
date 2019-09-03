class tutorial extends Phaser.Scene {
    constructor() {
        super({key: 'tutorial', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'tutorial';
        backgroundLayer0 = 'bgSky';
        commonPreload();

        //todo: change image for tutorial enemy character
        this.load.spritesheet('snake','assets/enemy/snake.png', {frameWidth: 120, frameHeight: 83});

    }
    
    create() {
        loadMap();
        //todo: modify to fit tutorial enemy character
        createThis.anims.create({
            key: 'snakeLeft',
            frames: createThis.anims.generateFrameNumbers('snake', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        //todo: modify to fit tutorial enemy character
        createThis.anims.create({
            key: 'snakeRight',
            frames: createThis.anims.generateFrameNumbers('snake', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        
         

    }
    
    

    update() 
    {
        callUpdateFuncs();
            //makes the player invulnerable if they are below 50hp so the player
            //can use items
                 if (currentHealth<=70){
                    playerInvulnerability = true;
        }else
            {
                playerInvulnerability=false;
            } 
        
        //Keep quest box up to date 
        updateQuestBox(); 
    }
}

