class gardenEntrance extends Phaser.Scene {
    constructor() {
        super({key: 'gardenEntrance', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'gardenEntrance';
        backgroundLayer0 = 'bgDragon';
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