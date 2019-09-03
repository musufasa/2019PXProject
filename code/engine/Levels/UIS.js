var inventoryLocations = [4];
var hoverchecker=false;
var currentCoins=0;
var UISneedsUpdate=false;

class UIS extends Phaser.Scene {
    constructor() {
        super({ key: "UIS", active: false});
    }



    preload() {

    }

    create() {
        var itemDescriptionInvent = ['pick up an item','pick up an item','pick up an item','pick up an item'];
        var itemToDisplay = ["slots","slots","slots","slots"];
            var styleRed = { font: "20px Arial", fill: "#FF0000", align: "center" };
            var styleGreen = { font: "20px Arial", fill: "#008000", align: "center" };
        	var styleBlue = { font: "20px Arial", fill: "#0000ff", align: "center" };
        
        game.scene.pause(currentLevelID);
        
        let inventoryBg = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.5, "inventory").setDepth(0).setInteractive();
        let exitbutton = this.add.image(this.game.renderer.width * 0.85, this.game.renderer.height * 0.28, "items1").setDepth(1).setInteractive();

        //inventory slots
        //todo:need to dynamically calculate number of items in bag etc rather than hardcoded array spots.
        var index = 0;
        bagInventory.forEach(function(item) {
            itemToDisplay[index] = item.BagImage;
            itemDescriptionInvent[index] = item.Description;
            index++;
        });

        let slotPresent1 = this.add.image(this.game.renderer.width * .45, this.game.renderer.height * 0.36, itemToDisplay[0]).setDepth(1).setInteractive();
        let slotPresent2 = this.add.image(this.game.renderer.width * .6, this.game.renderer.height * 0.36, itemToDisplay[1]).setDepth(1).setInteractive();
        let slotPresent3 = this.add.image(this.game.renderer.width * .7, this.game.renderer.height * 0.36, itemToDisplay[2]).setDepth(1).setInteractive();
        let slotPresent4 = this.add.image(this.game.renderer.width * .8, this.game.renderer.height * 0.36, itemToDisplay[3]).setDepth(1).setInteractive();
      
        //display player stats
        var  maxHealthText= this.add.text(this.game.renderer.width *.12, this.game.renderer.height * 0.5, maxHealth+"  MaxHealth", styleRed)
        
        var speedText = this.add.text(this.game.renderer.width *.12, this.game.renderer.height * 0.6, playerWalkVelocity+"  Speed", styleBlue)
        var damage = this.add.text(this.game.renderer.width *.12, this.game.renderer.height * 0.7, playerDamagePoints +"  Damage", styleGreen)

        
        //need to make this more visually appealing
        this.add.text(this.game.renderer.width *.12, this.game.renderer.height * 0.42, "Current coins: " + currentCoins)
        
        //close invent screen when the x is pressed
        exitbutton.on('pointerup', function () {
	        game.scene.resume(currentLevelID);
	        game.scene.stop('UIS');

        });
        
        var font = {font: "100px Arial", fill: "#FFFFFF", align: "center"};        
        var descFont = {font: "20px Arial", fill: "#FFFFFF", align: "left"};

        var textItemDescriptionInvent = this.add.text(this.game.renderer.width * 0.1, this.game.renderer.height * 0.85, itemDescriptionInvent , descFont);
        textItemDescriptionInvent.setAlpha(0);


        //todo:need to dynamically calculate number of items in bag for hover events.
        //checks if mouse is over item and displays description at the bottom
        slotPresent1.on('pointerover',()=>{
            if (hoverchecker==false){
            textItemDescriptionInvent.text = itemDescriptionInvent[0];
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


        //checks if mouse is over item and displays description at the bottom
        slotPresent2.on('pointerover',()=>{
            if (hoverchecker==false){
                textItemDescriptionInvent.text = itemDescriptionInvent[1];
                textItemDescriptionInvent.setAlpha(1);
                console.log("hovered");
                hoverchecker =true;
            }
        });


        //checks if mouse is not on an item and turns description transparrent
        slotPresent2.on('pointerout',()=>{
            if (hoverchecker==true){
                console.log("transparent")
                textItemDescriptionInvent.setAlpha(0);
                hoverchecker=false;
            }
        });


        slotPresent3.on('pointerover',()=>{
            if (hoverchecker==false){
                textItemDescriptionInvent.text = itemDescriptionInvent[2];
                textItemDescriptionInvent.setAlpha(1);
                console.log("hovered");
                hoverchecker =true;
            }
        });


        //checks if mouse is not on an item and turns description transparrent
        slotPresent3.on('pointerout',()=>{
            if (hoverchecker==true){
                console.log("transparent")
                textItemDescriptionInvent.setAlpha(0);
                hoverchecker=false;
            }
        });

        slotPresent4.on('pointerover',()=>{
            if (hoverchecker==false){
                textItemDescriptionInvent.text = itemDescriptionInvent[3];
                textItemDescriptionInvent.setAlpha(1);
                console.log("hovered");
                hoverchecker =true;
            }
        });


        //checks if mouse is not on an item and turns description transparrent
        slotPresent4.on('pointerout',()=>{
            if (hoverchecker==true){
                console.log("transparent")
                textItemDescriptionInvent.setAlpha(0);
                hoverchecker=false;
            }
        });
        //todo: change to dynamic
        slotPresent1.on('pointerup', function () {
            if(bagInventory[0] != null){
                useBagItem(0);
            }else{
                console.log('working nothing here');
            }
        });
        slotPresent2.on('pointerup', function () {
            if(bagInventory[1] != null){
                useBagItem(1);
            }else{
                console.log('working nothing here');
            }
        });
        slotPresent3.on('pointerup', function () {
            if(bagInventory[2] != null){
                useBagItem(2);
            }else{
                console.log('working nothing here');
            }
        });
        slotPresent4.on('pointerup', function () {
            if(bagInventory[3] != null){
                useBagItem(3);
            }else{
                console.log('working nothing here');
            }
        });
        //slotCreation();
        
        //upgrading stats
        if(upgradePoints>=1){
        let upgrade1 = this.add.image(this.game.renderer.width * 0.29, this.game.renderer.height * 0.51, "upgradeStatButton").setDepth(1).setInteractive();
            
        let upgrade2 = this.add.image(this.game.renderer.width * 0.29, this.game.renderer.height * 0.61, "upgradeStatButton").setDepth(1).setInteractive();
        
        let upgrade3 = this.add.image(this.game.renderer.width * 0.29, this.game.renderer.height * 0.72, "upgradeStatButton").setDepth(1).setInteractive();
            
            
            //if player clicks upgrade buttons upgrade that stat
               upgrade1.on('pointerup', function () {
                   maxHealth = maxHealth+1;
                           maxHealthText.setText(maxHealth+" MaxHealth");
                   upgradePoints=upgradePoints-1;

        });
            upgrade2.on('pointerup', function () {
                   playerWalkVelocity = playerWalkVelocity+1;
                        upgradePoints=upgradePoints-1;

                speedText.setText(playerWalkVelocity+"  Speed");
        });
            
            upgrade3.on('pointerup', function () {
                   playerDamagePoints = playerDamagePoints+1;
                    upgradePoints=upgradePoints-1;

                damage.setText(playerDamagePoints +"  Damage");
        });

        }
        //need to remove buttons once all upgrade points are used


        
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