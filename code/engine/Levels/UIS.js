var inventoryLocations = [4];
var itemDescriptionInvent ="";
var itemToDisplay1="slots" ;
var itemToDisplay2="slots" ;
var itemToDisplay3="slots" ;
var itemToDisplay4="slots" ;

var hoverchecker=false;

class UIS extends Phaser.Scene {
    constructor() {
        super({ key: "UIS", active: false});
    }



    preload() {

    }

    create() {
        game.scene.pause(currentLevelID);
        
        let inventoryBg = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.5, "inventory").setDepth(0).setInteractive();
        let exitbutton = this.add.image(this.game.renderer.width * 0.85, this.game.renderer.height * 0.28, "items1").setDepth(1).setInteractive();
        
        
        let slotPresent1 = this.add.image(this.game.renderer.width * .45, this.game.renderer.height * 0.36, itemToDisplay1).setDepth(1).setInteractive(); 
        let slotPresent2 = this.add.image(this.game.renderer.width * .6, this.game.renderer.height * 0.36, itemToDisplay2).setDepth(1).setInteractive();
        let slotPresent3 = this.add.image(this.game.renderer.width * .7, this.game.renderer.height * 0.36, itemToDisplay3).setDepth(1).setInteractive();
        let slotPresent4 = this.add.image(this.game.renderer.width * .8, this.game.renderer.height * 0.36, itemToDisplay4).setDepth(1).setInteractive();

        //close invent screen when the x is pressed
        exitbutton.on('pointerup', function () {
	        game.scene.resume(currentLevelID);
	        game.scene.stop('UIS');

        });
        
        var font = {font: "100px Arial", fill: "#FFFFFF", align: "center"};        
        var descFont = {font: "20px Arial", fill: "#FFFFFF", align: "left"};

        var textItemDescriptionInvent = this.add.text(this.game.renderer.width * 0.1, this.game.renderer.height * 0.85, itemDescriptionInvent , descFont);
        textItemDescriptionInvent.setAlpha(0);

                
       
        //checks if mouse is over item and displays description at the bottom
        slotPresent1.on('pointerover',()=>{
            if (hoverchecker==false){
            textItemDescriptionInvent.text = itemDescriptionInvent;   
            textItemDescriptionInvent.setAlpha(1);
             console.log("hovered");
            hoverchecker =true;
            }
        });
        
            
        //checks if mouse is not on an item and turns description transparrent
             slotPresent1.on('pointerout',()=>{
                 if (hoverchecker==true){
                 console.log("transparent")
                textItemDescriptionInvent.setAlpha(0);
                 hoverchecker=false;
                 }
        });
        



        //slotCreation();
    }
}

//need to dynamically create slots based on inventory size
 function slotCreation() {
    for (var slotNo = 0; slotNo < inventoryLocations.length; slotNo ++){
        var presetXPos = 0.5;
        slotPresent1 = this.game.renderer.width *presetXPos + 0.1 , this.game.renderer.height * 0.36, itemToDisplay//gameWidth * presetXPos + 0.1;
        
        presetXPos += 3; 
        console.log("slotCreation works and presetX is :" + presetXPos);
        }
}

//function is global
//without function is private to that js 