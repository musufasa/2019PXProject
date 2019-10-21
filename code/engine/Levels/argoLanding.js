class argoLanding extends Phaser.Scene {
    constructor() {
        super({key: 'argoLanding', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'argoLanding';
        backgroundLayer0 = 'bgDragon';
        commonPreload();
    }

    create() {
        loadMap();
        if(helperSprite == null){
            //todo: pause the argoLanding level at this point, seems to be an issue with the standard game.scene.pause('argoLanding');
            drawHelperSpriteChoiceUIBox();
            //set the pause game on a timeout function as calling it directly does not allow for assets to be loaded etc.
            setTimeout(function(){
                game.scene.pause(currentLevelID);
            },200);
        }
        //on actual start of game turn off invulnerability which was enabled during the tutorial level.
        playerInvulnerability = false;
        //Set empty quest on map load 
        setToEmptyQuest();
    }

    update() {
        callUpdateFuncs();

    }
}
