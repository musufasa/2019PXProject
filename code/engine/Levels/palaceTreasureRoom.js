class palaceTreasureRoom extends Phaser.Scene {
    constructor() {
        super({key: 'palaceTreasureRoom', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'palaceTreasureRoom';
        backgroundLayer0 = 'bgSky';
        playerInvulnerability = false;
        commonPreload();
  
    }

    create() {
        loadMap();
    }
    update() {
        callUpdateFuncs();

    }
}
