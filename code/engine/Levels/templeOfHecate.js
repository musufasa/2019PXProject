class templeOfHecate extends Phaser.Scene {
    constructor() {
        super({key: 'templeOfHecate', active: false });
    }

    preload() {
        
        //Create local context to createThis, set level id, background layer, disable player invulnerability and carry out common preload tasks common to all levels
        createThis = this;
        currentLevelID = 'templeOfHecate';
        backgroundLayer0 = 'bgSky';
        playerInvulnerability = false;
        commonPreload();  
        
                this.load.spritesheet('medeaBoss','assets/enemy/medeaBoss.png',
        {    frameWidth: 200, frameHeight: 242});   


        
    }

    create() {

        
        createThis.anims.create({
            key: 'medeaBoss',
            frames: createThis.anims.generateFrameNumbers('medeaBoss', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        
        //Call loadMap function present in base.js 
        loadMap();
            
        //Set empty quest on map load 
        setToEmptyQuest();
                
        this.time.addEvent({ delay: 12000, callback: this.updateTeleport, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 2400, callback: this.updatCloneSpawn, callbackScope: this, loop: true });
        
    }

    update() {
        callUpdateFuncs();

    }
    
         updateTeleport() {

         switch (teleport) {
             case 1:
                 teleport = 2;
                 medeaReset=false;
                 break;
             case 2:
                 teleport = 3;
                 medeaReset=false;
                 break;
             case 3:
                 teleport = 4;
                medeaReset=false;
                 break;
             default:
                 teleport = 1;
                medeaReset=false;
                 break;
         }

    }
    
    updatCloneSpawn(){
        cloneSpawn=true;
    }
}