class argoLanding extends Phaser.Scene {
    constructor() {
        super({key: 'argoLanding', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'argoLanding';
        backgroundLayer0 = 'bgSky';
        //on actual start of game turn off invulnerability which was enabled during the tutorial level.
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
