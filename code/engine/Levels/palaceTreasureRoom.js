class palaceTreasureRoom extends Phaser.Scene {
    constructor() {
        super({key: 'palaceTreasureRoom', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'palaceTreasureRoom';
        backgroundLayer0 = 'bgDragon';
        playerInvulnerability = false;
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
