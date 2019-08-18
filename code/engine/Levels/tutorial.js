class tutorial extends Phaser.Scene {
    constructor() {
        super({key: 'tutorial', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'tutorial';
        // backgroundLayer0 = 'bgSky';
        commonPreload();
    }

    create() {
        loadMap();
    }

    update() {
        callUpdateFuncs();
    }
}