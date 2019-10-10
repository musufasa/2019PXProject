class difficultyScreen extends Phaser.Scene{
    
    constructor() {
        super({key: 'difficultyScreen', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'difficultyScreen';
        
        //Preload the images to be used
        this.load.image('titlebg', 'assets/stage/background/titlebg.png');
        this.load.image('lowdiff', 'assets/stage/background/easyButton.png');
        this.load.image('meddiff','assets/stage/background/normalButton.png');
        this.load.image('highdiff','assets/stage/background/hardButton.png');
        this.load.image('exitbut','assets/stage/background/exitbut.png');
        this.load.image('mutebtn','assets/stage/background/mutebtn.png');
    }

    create() {
        //Draw background.
        this.add.image(0,0, "titlebg").setOrigin(0).setDepth(0);
        
        //Add back button. mutebutton, and sound buttons.
        let back = this.add.image(this.game.renderer.width / 1.50, this.game.renderer.height *0.94, "exitbut").setDepth(101).setInteractive();
        let mutebut = this.add.image(this.game.renderer.width / 1.35, this.game.renderer.height *0.80, "mutebtn").setDepth(101).setInteractive();
        let lowDifficulty = this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.40, "lowdiff").setDepth(1).setInteractive();
        let normalDifficulty = this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.60, "meddiff").setDepth(1).setInteractive();
        let highDifficulty = this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.80, "highdiff").setDepth(1).setInteractive();
        
        //Set game difficulty to low if player wants
        lowDifficulty.on('pointerup',()=>{
            console.log("Set difficulty to low");
            maxHealthInit = 300;
            playerDamgePointsInit = 100;
            difficulty=.5;
            
            //Prevent multiple button presses from rendering same text over itself
            if(typeof this.diffText1 != "undefined") 
            {
               this.diffText1.destroy(); 
            }
            
            this.diffText1 = this.add.text(this.game.renderer.width *.02, this.game.renderer.height * 0.25,"Difficulty set to easy",{ fontSize: '25px',color:'0,0,0'});
            
            //Destroy text for normal and hard difficulty when not needed 
            if(typeof this.diffText2 != "undefined") 
            {
               this.diffText2.destroy(); 
            }
            
            if(typeof this.diffText3 != "undefined") 
            {
               this.diffText3.destroy(); 
            }
        });
        
        //Set game difficulty to normal if player wants
        normalDifficulty.on('pointerup',()=>{
            console.log("Set difficulty to normal");
            maxHealthInit = 200;
            playerDamgePointsInit = 75;
            difficulty=1; 
            
            //Prevent multiple button presses from rendering same text over itself
            if(typeof this.diffText2 != "undefined") 
            {
               this.diffText2.destroy(); 
            }
            
            this.diffText2 = this.add.text(this.game.renderer.width *.02, this.game.renderer.height * 0.25,"Difficulty set to normal",{ fontSize: '25px',color:'0,0,0'});
            
            //Destroy text for easy and hard difficulty when not needed 
            if(typeof this.diffText1 != "undefined") 
            {
               this.diffText1.destroy(); 
            }
            
            if(typeof this.diffText3 != "undefined") 
            {
               this.diffText3.destroy(); 
            }
        });
        
        //Set game difficulty to hard if player wants
        highDifficulty.on('pointerup',()=>{
            console.log("Set difficulty to hard");
            maxHealthInit = 100;
            playerDamgePointsInit = 50;
            difficulty=2; 
            
            //Prevent multiple button presses from rendering same text over itself
            if(typeof this.diffText3 != "undefined") 
            {
               this.diffText3.destroy(); 
            }
            
            this.diffText3 = this.add.text(this.game.renderer.width *.02, this.game.renderer.height * 0.25,"Difficulty set to hard",{ fontSize: '25px',color:'0,0,0'});
            
            //Destroy text for easy and normal difficulty when not needed 
            if(typeof this.diffText1 != "undefined") 
            {
               this.diffText1.destroy(); 
            }
            
            if(typeof this.diffText2 != "undefined") 
            {
               this.diffText2.destroy(); 
            }
        });
        
        
  
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
            mutebut.setTint(0xfcf003);
        });
        mutebut.on('pointerout',()=>{
            mutebut.setTint(0xffffff);
        });
        back.on('pointerover',()=>{
            back.setTint(0xfcf003);
        });
        back.on('pointerout',()=>{
            back.setTint(0xffffff);
        });
        lowDifficulty.on('pointerover',()=>{
            lowDifficulty.setTint(0xfcf003);
        });
        lowDifficulty.on('pointerout',()=>{
            lowDifficulty.setTint(0xffffff);
        });
        normalDifficulty.on('pointerover',()=>{
            normalDifficulty.setTint(0xfcf003);
        });
        normalDifficulty.on('pointerout',()=>{
            normalDifficulty.setTint(0xffffff);
        });
        highDifficulty.on('pointerover',()=>{
            highDifficulty.setTint(0xfcf003);
        });
        highDifficulty.on('pointerout',()=>{
            highDifficulty.setTint(0xffffff);
        });
        
        // Tint Change when hovering over buttons
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }
}
