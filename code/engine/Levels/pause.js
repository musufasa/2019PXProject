class pause extends Phaser.Scene {
    constructor() {
        super({ key: "pause", active: false});
    }

    preload() {
        //pause image
    }

    create() {
        game.scene.pause(currentLevelID);
        /*
        this.drawPauseSurface = this.add.graphics();

        this.drawPauseSurface.lineStyle(this.sys.game.config.width*0.004,0x000000,1);
        this.drawPauseSurface.fillStyle(0xf2edaa,1);
        this.drawPauseSurface.fillRect(this.sys.game.config.width*0.2,this.sys.game.config.height*0.1,this.sys.game.config.width*0.6,this.sys.game.config.height*0.7);
        this.drawPauseSurface.strokeRect(this.sys.game.config.width*0.2,this.sys.game.config.height*0.1,this.sys.game.config.width*0.6,this.sys.game.config.height*0.7);

        this.add.image(0,0, "pausebg").setOrigin(0).setDepth(0);
        */
        let scrollbackground = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, "scrollbg").setDepth(1).setInteractive();

        let toPauseButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.4, "resumebut").setDepth(1).setInteractive();
        let toMapMenu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.55, "mapMenu").setDepth(1).setInteractive();
        //todo:change image mapping to relevant decrease volume arrow
        let decreaseVolume = this.add.image(this.game.renderer.width*0.68, this.game.renderer.height * 0.28, "volumedownbut").setDepth(1).setInteractive();
        //todo:change image mapping to relevant increase volume arrow
        let increaseVolume = this.add.image(this.game.renderer.width*0.72, this.game.renderer.height * 0.28, "volumeupbut").setDepth(1).setInteractive();

        let muteBtn = this.add.image(this.game.renderer.width*0.76, this.game.renderer.height * 0.28, "mutebtn").setDepth(1).setInteractive();

        if (!musicMuted) {
            muteBtn.setTint(0x00ff00);
        } else {
            muteBtn.setTint(0xff0000);
        }

        toPauseButton.on('pointerup', function () {
	        game.scene.resume(currentLevelID);
	        game.scene.stop('pause');
        });

        toMapMenu.on('pointerup', ()=>{
        	changeLevel('mapMenu');
        	game.scene.stop('pause');
        });

        decreaseVolume.on('pointerup', function () {
            //get the current volume and make sure we aren't reducing below 0/muted.
            var currentVolume = music.currentConfig.volume;
            if(currentVolume > 0){
                console.log(currentVolume);
                //use to fixed to avoid floating point error on addition & parse as float to avoid strange error.
                var newVolume = (parseFloat(currentVolume) - 0.1).toFixed(2);
                console.log(newVolume);
                music.setVolume(newVolume);
            }
        });

        increaseVolume.on('pointerup', function () {
            //get the current volume and make sure we aren't reducing below 0/muted.
            var currentVolume = music.currentConfig.volume;
            if(currentVolume > 0 || currentVolume <=0){
                console.log(currentVolume);
                //use to fixed to avoid floating point error on addition & parse as float to avoid strange error.
                var newVolume = (parseFloat(currentVolume) + 0.1).toFixed(2);
                console.log(newVolume);
                music.setVolume(newVolume);
            }
        });

        muteBtn.on('pointerup', ()=>{
        	if (!musicMuted) {
        		music.setMute(true);
        		musicMuted = true;
        		muteBtn.setTint(0xff0000);
        	} else {
        		music.setMute(false);
        		musicMuted = false;
        		muteBtn.setTint(0x00ff00);
        	}
        });
        
        toPauseButton.on('pointerover',()=>{
            toPauseButton.setTint(0xA7FF7D);
        });
        
        toPauseButton.on('pointerout',()=>{
            toPauseButton.setTint(0xffffff);
        });
        
        toMapMenu.on('pointerover',()=>{
            toMapMenu.setTint(0xA7FF7D);
        });
        
        toMapMenu.on('pointerout',()=>{
            toMapMenu.setTint(0xffffff);
        });
        
        increaseVolume.on('pointerover',()=>{
            increaseVolume.setTint(0xA7FF7D);
        });
        
        increaseVolume.on('pointerout',()=>{
            increaseVolume.setTint(0xffffff);
        });
         decreaseVolume.on('pointerover',()=>{
            decreaseVolume.setTint(0xA7FF7D);
        });
        
        decreaseVolume.on('pointerout',()=>{
            decreaseVolume.setTint(0xffffff);
        });
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }
    
    
}
