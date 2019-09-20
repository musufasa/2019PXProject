/* This is the title screen at the beginning of the game.  
 * The user has the option to play the game. 
 */

class titleScreen extends Phaser.Scene{

    constructor() {
        super({key: 'titleScreen', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'titleScreen';
        
        this.load.image('titlebg', 'assets/stage/background/titlebg.png');
        this.load.image('playbut', 'assets/stage/background/playbut.png');
        this.load.image('settingsbut','assets/stage/background/settingsbut.png');
    }

    create() {
        //Draw background.
        this.add.image(0,0, "titlebg").setOrigin(0).setDepth(0);
        
        //Add the Play Game button.
        let startGame = this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.40, "playbut").setDepth(1).setInteractive();
        let settings = this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.60, "settingsbut").setDepth(1).setInteractive();


            
        //Reset variables relating to health and damage. 
        maxHealth = maxHealthInit;
        currentHealth = maxHealthInit;
        playerDamagePoints = playerDamgePointsInit;
        parseHealthBarAnimate();
        
        startGame.on('pointerover',()=>{
            startGame.setTint(0xA7FF7D);
        });
        
        startGame.on('pointerout',()=>{
            startGame.setTint(0xffffff);
        });

        //The first level of the game can be set here. 
        startGame.on("pointerup", ()=>{
            playerSprite = 'jason';
            changeLevel('introCutscene');
        });   
        
        
        settings.on("pointerup",()=>{
            changeLevel('settingsScreen');
        });
        
        settings.on('pointerover',()=>{
            settings.setTint(0xA7FF7D);
        });
        
        settings.on('pointerout',()=>{
            settings.setTint(0xffffff);
        });
        
        //Set empty quest on map load 
        setToEmptyQuest();
        
    }
}
