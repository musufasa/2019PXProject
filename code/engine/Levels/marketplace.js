class marketplace extends Phaser.Scene {
    constructor() {
        super({key: 'marketplace', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'marketplace';
        backgroundLayer0 = 'bgDragon';
        backgroundLayer1 = 'bgMarket';
        commonPreload();
    }

    create() {
        loadMap();
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }

    update() {
        callUpdateFuncs();
    }
}