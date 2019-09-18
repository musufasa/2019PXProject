class siren extends Phaser.Scene {
    constructor() {
        super({key: 'siren', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'siren';
        playerShip = true;
        playerSprite = 'ship';
        backgroundLayer0 = 'bgSky';
        this.load.image('ship','assets/player/ship.png');
        commonPreload();
    }

    create() {
        loadMap();
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }

    update() {
        shipUpdate();
    }
}