class shrineForest extends Phaser.Scene {
    constructor() {
        super({key: 'shrineForest', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'shrineForest';
        backgroundLayer0 = 'bgDragon';
        backgroundLayer1 = 'bgForest';
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