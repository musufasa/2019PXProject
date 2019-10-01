class argoLanding extends Phaser.Scene {
    constructor() {
        super({key: 'argoLanding', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'argoLanding';
        backgroundLayer0 = 'bgDragon';
        //on actual start of game turn off invulnerability which was enabled during the tutorial level.
        playerInvulnerability = false;
        commonPreload();
    }

    create() {
        loadMap();
        if(helperSprite == null){
            //todo: pause the argoLanding level at this point, seems to be an issue with the standard game.scene.pause('argoLanding');
            drawHelperSpriteChoiceUIBox();
        }
        //Set empty quest on map load 
        setToEmptyQuest();
    }

    update() {
        callUpdateFuncs();
                playerInvulnerability = false;

    }
}
