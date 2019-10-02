class settingsScreen extends Phaser.Scene{

    constructor() {
        super({key: 'settingsScreen', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'settingsScreen';
        
        // Preload the images to be used
        this.load.image('titlebg', 'assets/stage/background/titlebg.png');
        this.load.image('exitbut','assets/stage/background/exitbut.png');
        this.load.image('mutebtn','assets/stage/background/mutebtn.png');
        this.load.image('introSlide7', 'assets/background/introSlide7.png');
    }

    create() {
        //Draw background.
        this.add.image(0,0, "titlebg").setOrigin(0).setDepth(0);
        
        //Add back button. mutebutton, and sound buttons.
        let back = this.add.image(this.game.renderer.width / 1.50, this.game.renderer.height *0.94, "exitbut").setDepth(101).setInteractive();
        let mutebut = this.add.image(this.game.renderer.width / 1.35, this.game.renderer.height *0.80, "mutebtn").setDepth(101).setInteractive();
    
        endCutsceneStillImg = createThis.add.image(1024, 576, 'introSlide7');
                endCutsceneStillImg.setOrigin(1,1);
                endCutsceneStillImg.scrollFactorX = 0;
                endCutsceneStillImg.scrollFactorY = 0;
                endCutsceneStillImg.setDepth(100);
  
        //If exit is pressed, change level back to Main Title.
        back.on('pointerup',()=>{
            changeLevel('titleScreen');
        });
        
        
    
        // Mute Button Functionality
        mutebut.on('pointerup',()=>{
            
           if (!musicMuted) {
        		music.setMute(true);
        		musicMuted = true;

                } else {
        		music.setMute(false);
        		musicMuted = false;
                mutebut.setTint(0xffffff);   
                } 
        });
       
        // Tint Change when hovering over buttons
      
        mutebut.on('pointerover',()=>{
            mutebut.setTint(0xA7FF7D);
        });
        mutebut.on('pointerout',()=>{
            mutebut.setTint(0xffffff);
        });
        back.on('pointerover',()=>{
            back.setTint(0xA7FF7D);
        });
        back.on('pointerout',()=>{
            back.setTint(0xffffff);
        });
        // Tint Change when hovering over buttons
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }
}
