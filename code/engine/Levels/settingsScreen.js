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
        this.load.image('mute','assets/stage/background/mute.png');
        this.load.image('volumeup','assets/stage/background/volumeup.png');
        this.load.image('volumedown','assets/stage/background/volumedown.png');
    }

    create() {
        //Draw background.
        this.add.image(0,0, "titlebg").setOrigin(0).setDepth(0);
        
        //Add back button. mutebutton, and sound buttons.
        let back = this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.80, "exitbut").setDepth(1).setInteractive();
        let mutebut = this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.40, "mute").setDepth(1).setInteractive();
        let volumeup = this.add.image(this.game.renderer.width / 1.82, this.game.renderer.height *0.55,"volumeup").setDepth(1).setInteractive();
        let volumedown = this.add.image(this.game.renderer.width / 2.22, this.game.renderer.height *0.55,"volumedown").setDepth(1).setInteractive();
  
        //If exit is pressed, change level back to Main Title.
        back.on('pointerup',()=>{
            changeLevel('titleScreen');
        });
        
        //Volume up functionality
        volumeup.on('pointerup', function () {
            var currentVolume = music.currentConfig.volume;
            if(currentVolume > 0 || currentVolume <=0){
                console.log(currentVolume);
                var newVolume =(parseFloat(currentVolume) + 0.1).toFixed(2);
                console.log(newVolume);
                music.setVolume(newVolume);
            }
        });
        
        //Volume Down functionality.
        volumedown.on('pointerup', function (){
            var currentVolume = music.currentConfig.volume;
            if(currentVolume > 0){
                console.log(currentVolume);
                var newVolume =(parseFloat(currentVolume) - 0.1).toFixed(2);
                console.log(newVolume);
                music.setVolume(newVolume);
            }
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
        volumeup.on('pointerover',()=>{
            volumeup.setTint(0xA7FF7D);
        });
        volumeup.on('pointerout',()=>{
            volumeup.setTint(0xffffff);
        });
        volumedown.on('pointerover',()=>{
            volumedown.setTint(0xA7FF7D);
        });
        volumedown.on('pointerout',()=>{
            volumedown.setTint(0xffffff);
        });
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
