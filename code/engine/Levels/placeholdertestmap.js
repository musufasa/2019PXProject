class placeholdertestmap extends Phaser.Scene{
    constructor() {
        super({key: 'placeholdertestmap', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'placeholdertestmap';
        backgroundLayer0 = 'bgSky';
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