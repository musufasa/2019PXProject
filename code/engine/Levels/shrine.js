class shrine extends Phaser.Scene {
    constructor() {
        super({key: 'shrine', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'shrine';
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