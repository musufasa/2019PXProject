class mapMenu extends Phaser.Scene {
    constructor() {
        super({ key: "mapMenu", active: false});    
    }

    preload() {
        createThis = this;
        currentLevelID = 'mapMenu';
        
        //Map image. 
        this.load.image('mapbg1', 'assets/stage/background/mapcolchis/newmapbg1.png');
        this.load.image('dot1', 'assets/stage/background/mapcolchis/dot1.png');
        
    }
    
    create() {
    	//Images
        this.add.image(0,0, "mapbg1").setOrigin(0).setDepth(0);
        
        let toDot1 = this.add.image(this.game.renderer.width*0.295, this.game.renderer.height*0.25, "dot1").setDepth(1).setInteractive();
        toDot1.on("pointerup", ()=>{ changeLevel('argoLanding');
            });
        
            let toDot14 = this.add.image(this.game.renderer.width*0.13, this.game.renderer.height*0.23, "dot1").setDepth(1).setInteractive();
            toDot14.on("pointerup", ()=>{changeLevel('tutorial');
            }); 
        
            let toDot2 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.25, "dot1").setDepth(1).setInteractive();        
            let toDot3 = this.add.image(this.game.renderer.width*0.67, this.game.renderer.height*0.2, "dot1").setDepth(1).setInteractive();        
            let toDot4 = this.add.image(this.game.renderer.width*0.82, this.game.renderer.height*0.22, "dot1").setDepth(1).setInteractive();

            toDot2.on("pointerup", ()=>{ changeLevel('roadToColchis');
                });

            toDot3.on("pointerup", ()=>{changeLevel('marketplace');
                });

            toDot4.on("pointerup", ()=>{changeLevel('palace');
                });
        
        
                    

        
       
        let toDot16 = this.add.image(this.game.renderer.width*0.3, this.game.renderer.height*0.5, "dot1").setDepth(1).setInteractive();
            toDot16.on("pointerup", ()=>{changeLevel('sidequest1');
            }); 
        
          let toDot17 = this.add.image(this.game.renderer.width*0.67, this.game.renderer.height*0.41, "dot1").setDepth(1).setInteractive();
            toDot17.on("pointerup", ()=>{changeLevel('sidequest2');
            }); 
        
        //Critters creek 
        let toDot18 = this.add.image(this.game.renderer.width*0.90, this.game.renderer.height*0.2, "dot1").setDepth(1).setInteractive();
            toDot18.on("pointerup", ()=>{changeLevel('interStage2');
                                         
            }); 
        
        //Centaur Plains 
        let toDot19 = this.add.image(this.game.renderer.width*0.82, this.game.renderer.height*0.79, "dot1").setDepth(1).setInteractive();
            toDot19.on("pointerup", ()=>{changeLevel('interStage1');
            }); 
        
        //Marshland 
        let toDot20 = this.add.image(this.game.renderer.width*0.51, this.game.renderer.height*0.83, "dot1").setDepth(1).setInteractive();
            toDot20.on("pointerup", ()=>{changeLevel('interStage3');
            }); 
        
        
        

            let toDot5 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.55, "dot1").setDepth(1).setInteractive();
            let toDot6 = this.add.image(this.game.renderer.width*0.64, this.game.renderer.height*0.55, "dot1").setDepth(1).setInteractive();

            toDot5.on("pointerup", ()=>{changeLevel('shrine');
            });

            toDot6.on("pointerup", ()=>{changeLevel('shrineForest');
            });

            let toDot7 = this.add.image(this.game.renderer.width*0.82, this.game.renderer.height*0.5, "dot1").setDepth(1).setInteractive();
            let toDot8 = this.add.image(this.game.renderer.width*0.7, this.game.renderer.height*0.68, "dot1").setDepth(1).setInteractive();
            let toDot9 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.68, "dot1").setDepth(1).setInteractive();
            let toDot10 = this.add.image(this.game.renderer.width*0.63, this.game.renderer.height*0.83, "dot1").setDepth(1).setInteractive();
            let toDot11 = this.add.image(this.game.renderer.width*0.4, this.game.renderer.height*0.83, "dot1").setDepth(1).setInteractive();
            toDot7.on("pointerup", ()=>{changeLevel('colchisFields');
                });
            toDot8.on("pointerup", ()=>{changeLevel('riverCrossing');
                });
            toDot9.on("pointerup", ()=>{changeLevel('gardenEntrance');
                });
            toDot10.on("pointerup", ()=>{changeLevel('gardenForest');
                });
            toDot11.on("pointerup", ()=>{changeLevel('gardenDungeon');
                });
        

            let toDot12 = this.add.image(this.game.renderer.width*0.3, this.game.renderer.height*0.68, "dot1").setDepth(1).setInteractive();
            toDot12.on("pointerup", ()=>{changeLevel('dragonLevel');
            });
            
            let toDot13 = this.add.image(this.game.renderer.width*0.16, this.game.renderer.height*0.68, "dot1").setDepth(1).setInteractive();
            toDot13.on("pointerup", ()=>{changeLevel('templeOfHecate');
            });  
        
        
        //Set empty quest on map load 
        setToEmptyQuest();
    }
}