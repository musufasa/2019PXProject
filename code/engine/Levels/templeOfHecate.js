class templeOfHecate extends Phaser.Scene {
    constructor() {
        super({key: 'templeOfHecate', active: false });
    }

    preload() {
        
        //Create local context to createThis, set level id, background layer, disable player invulnerability and carry out common preload tasks common to //all levels
        createThis = this;
        currentLevelID = 'templeOfHecate';
        backgroundLayer0 = 'bgSky';
        playerInvulnerability = false;
        commonPreload();  
    }

    create() {
        
        //Call loadMap function present in base.js 
        loadMap();
            
        //Set empty quest on map load 
        setToEmptyQuest();
    }

    update() {
        callUpdateFuncs();

    }
}