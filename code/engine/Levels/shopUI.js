class shopUI extends Phaser.Scene {

    constructor() {
        super({ key: "shopUI", active: false});
    }

    preload() {

    }

    create() {

        game.scene.pause(currentLevelID);
        drawWidth = userIntThis.sys.game.config.width*0.75;
        drawHeight = userIntThis.sys.game.config.height*0.75;
        swirlLength = drawWidth*0.02;
        lineStyleThick = swirlLength/5;
        diaBoxX = 125;
        diaBoxY = 75;
        //text settings
        diaBoxTextStyle = {
            fontSize: 12,
            fontFamily: 'Arial',
            align: "left",
            color: '#000000',
            wordWrap: {width: drawWidth*0.25, useAdvancedWrap: true}
        }
        let newDialogBox = this.add.graphics();
        //draw outer rectangle
        newDialogBox.lineStyle(lineStyleThick,0x000000,1);
        newDialogBox.fillStyle(0xf2edaa,1);
        newDialogBox.fillRect(diaBoxX,diaBoxY,drawWidth,drawHeight);
        newDialogBox.strokeRect(diaBoxX,diaBoxY,drawWidth,drawHeight);

        //styling
        //Top LHS
        newDialogBox.moveTo(diaBoxX+swirlLength,diaBoxY);
        newDialogBox.lineTo(diaBoxX+swirlLength,diaBoxY+swirlLength);
        newDialogBox.lineTo(diaBoxX+(swirlLength/2),diaBoxY+swirlLength);
        newDialogBox.lineTo(diaBoxX+(swirlLength/2),diaBoxY+(swirlLength/2));
        newDialogBox.strokePath();

        //Bottom LHS
        newDialogBox.moveTo(diaBoxX+swirlLength,drawHeight+diaBoxY);
        newDialogBox.lineTo(diaBoxX+swirlLength,drawHeight+diaBoxY-swirlLength);
        newDialogBox.lineTo(diaBoxX+(swirlLength/2),drawHeight+diaBoxY-swirlLength);
        newDialogBox.lineTo(diaBoxX+(swirlLength/2),drawHeight+diaBoxY-(swirlLength/2));
        newDialogBox.strokePath();

        //Top RHS
        newDialogBox.moveTo(diaBoxX+drawWidth-swirlLength,diaBoxY);
        newDialogBox.lineTo(diaBoxX+drawWidth-swirlLength,diaBoxY+swirlLength);
        newDialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),diaBoxY+swirlLength);
        newDialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),diaBoxY+(swirlLength/2));
        newDialogBox.strokePath();

        //Bottom RHS
        newDialogBox.moveTo(diaBoxX+drawWidth-swirlLength,drawHeight+diaBoxY);
        newDialogBox.lineTo(diaBoxX+drawWidth-swirlLength,drawHeight+diaBoxY-swirlLength);
        newDialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),drawHeight+diaBoxY-swirlLength);
        newDialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),drawHeight+diaBoxY-(swirlLength/2));
        newDialogBox.strokePath();

        //Style Lines
        //Top
        newDialogBox.lineBetween(diaBoxX+swirlLength,diaBoxY+(swirlLength/2),diaBoxX+drawWidth-swirlLength,diaBoxY+(swirlLength/2));
        //Bottom
        newDialogBox.lineBetween(diaBoxX+swirlLength,diaBoxY+drawHeight-(swirlLength/2),diaBoxX+drawWidth-swirlLength,diaBoxY+drawHeight-(swirlLength/2));
        //Left
        newDialogBox.lineBetween(diaBoxX+(swirlLength*0.75),diaBoxY+swirlLength,diaBoxX+(swirlLength*0.75),diaBoxY+drawHeight-swirlLength);
        //Right
        newDialogBox.lineBetween(diaBoxX+drawWidth-(swirlLength*0.75),diaBoxY+swirlLength,diaBoxX+drawWidth-(swirlLength*0.75),diaBoxY+drawHeight-swirlLength);

        newDialogBox.alpha = 1;
        newDialogBox.setDepth(1);

        let titleTextStyle = {
            fontSize: 28,
            fontFamily: 'Arial',
            align: "left",
            color: '#000000',
            wordWrap: {width: drawWidth*0.30, useAdvancedWrap: true}
        }

        let shopTitle = this.add.text(0,0,'',undefined);
        shopTitle.x = this.game.renderer.width * .47;
        shopTitle.y = this.game.renderer.height * .15;
        shopTitle.setDepth(10);
        shopTitle.setStyle(titleTextStyle);
        shopTitle.setText("SHOP" );

        let currentCoinsText = this.add.text(0,0,'',undefined);
        currentCoinsText.x = this.game.renderer.width * .465;
        currentCoinsText.y = this.game.renderer.height * .21;
        currentCoinsText.setDepth(10);
        currentCoinsText.setStyle(diaBoxTextStyle);

        let exitbutton = this.add.image(this.game.renderer.width * 0.83, this.game.renderer.height * 0.18, "items1").setDepth(1).setInteractive();

        //add arrow purchase UI elements
        let arrow = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * 0.325,'arrowAmmo').setDepth(1);
        let arrowPurchase = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * 0.5,'coinSpriteTest').setDepth(1).setInteractive();
        let arrowPurchaseText = this.add.text(0,0,'',undefined);
        arrowPurchaseText.x = this.game.renderer.width * .155;
        arrowPurchaseText.y = this.game.renderer.height * .375;
        arrowPurchaseText.setDepth(10);
        arrowPurchaseText.setStyle(diaBoxTextStyle);
        arrowPurchaseText.setText("10 coins : Add 10 arrows into your inventory, handy for taking out enemies from afar" );

        //add upgrade point purchase UI elements
        let upgradePoint = this.add.image(this.game.renderer.width * .50, this.game.renderer.height * 0.325,'upgradeStatButton').setDepth(1);
        let upgradePointPurchase = this.add.image(this.game.renderer.width * .50, this.game.renderer.height * 0.5,'coinSpriteTest').setDepth(1).setInteractive();
        let upgradePointText = this.add.text(0,0,'',undefined);
        upgradePointText.x = this.game.renderer.width * .4;
        upgradePointText.y = this.game.renderer.height * .375;
        upgradePointText.setDepth(10);
        upgradePointText.setStyle(diaBoxTextStyle);
        upgradePointText.setText("10 coins : Add 2 additional upgrade points, improve Jason's stats where needed" );

        //add xp purchase UI elements
        let xp = this.add.image(this.game.renderer.width * .75, this.game.renderer.height * 0.325,'smallExp').setDepth(1);
        let xpPurchase = this.add.image(this.game.renderer.width * .75, this.game.renderer.height * 0.5,'coinSpriteTest').setDepth(1).setInteractive();
        let xpText = this.add.text(0,0,'',undefined);
        xpText.x = this.game.renderer.width * .645;
        xpText.y = this.game.renderer.height * .375;
        xpText.setDepth(10);
        xpText.setStyle(diaBoxTextStyle);
        xpText.setText("5 coins : Add an additional 500 xp, improve Jason's experience without having to take on as many enemies" );

        //add large health potion purchase UI elements
        let potion = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * 0.625,'healthPotion').setDepth(1);
        let potionPurchase = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * 0.8,'coinSpriteTest').setDepth(1).setInteractive();
        let potionText = this.add.text(0,0,'',undefined);
        potionText.x = this.game.renderer.width * .155;
        potionText.y = this.game.renderer.height * .675;
        potionText.setDepth(10);
        potionText.setStyle(diaBoxTextStyle);
        potionText.setText("10 coins : Add an additional large health potion to your bag to heal a large amount." );

        //add chicken purchase UI elements
        let chicken = this.add.image(this.game.renderer.width * .50, this.game.renderer.height * 0.625,'healthItemSprite').setDepth(1);
        let chickenPurchase = this.add.image(this.game.renderer.width * .50, this.game.renderer.height * 0.8,'coinSpriteTest').setDepth(1).setInteractive();
        let chickenText = this.add.text(0,0,'',undefined);
        chickenText.x = this.game.renderer.width * .4;
        chickenText.y = this.game.renderer.height * .675;
        chickenText.setDepth(10);
        chickenText.setStyle(diaBoxTextStyle);
        chickenText.setText("5 coins : Add an additional chicken leg to your bag to heal a small amount.s" );

        //add max health purchase UI elements
        let damageIncrease = this.add.image(this.game.renderer.width * .75, this.game.renderer.height * 0.625,'damageIncreaseItemSprite').setDepth(1);
        let damagePurchase = this.add.image(this.game.renderer.width * .75, this.game.renderer.height * 0.8,'coinSpriteTest').setDepth(1).setInteractive();
        let damageText = this.add.text(0,0,'',undefined);
        damageText.x = this.game.renderer.width * .645;
        damageText.y = this.game.renderer.height * .675;
        damageText.setDepth(10);
        damageText.setStyle(diaBoxTextStyle);
        damageText.setText("25 coins : Increase damage by 10 points. Helpful for experienced players playing on a higher difficulties. " );


        arrowPurchase.on('pointerup', function () {
            if(currentCoins >= 10) {
                numberArrows += 10;
                currentCoins -= 10;
                //update UI elements
                updateUIelements();
            }
        });

        upgradePointPurchase.on('pointerup', function () {
            if(currentCoins >= 10) {
                upgradePoints += 2;
                currentCoins -= 10;
                //update UI elements
                updateUIelements();
            }
        });

        xpPurchase.on('pointerup', function () {
            if(currentCoins >= 5) {
                currentXP += 500;
                currentCoins -= 5;
                //update UI elements
                updateUIelements();
            }
        });

        potionPurchase.on('pointerup', function () {
            if(currentCoins >= 10 && bagInventory.length < bagSize) {
                var item = { "Description": "Can be consumed to heal 100 damage", "ItemName": "potion", "ItemType":"healing", "Attribute":100,"BagImage":"healthPotion" };
                bagInventory.push(item);
                currentCoins -= 10;
                //update UI elements
                updateUIelements();
            }
        });

        chickenPurchase.on('pointerup', function () {
            if(currentCoins >= 5 && bagInventory.length < bagSize) {
                var item = { "Description": "Can be consumed to heal 10 damage", "ItemName": "Chicken Leg", "ItemType":"healing", "Attribute":10,"BagImage":"testItemSprite" };
                bagInventory.push(item);
                currentCoins -= 5;
                //update UI elements
                updateUIelements();
            }
        });

        damagePurchase.on('pointerup', function () {
            if(currentCoins >= 25) {
                playerDamagePoints += 10;
                currentCoins -= 25;
                //update UI elements
                updateUIelements();
            }
        });

        //close shop screen when the x is pressed
        exitbutton.on('pointerup', function () {
            game.scene.resume(currentLevelID);
            userIntThis.scene.bringToTop('controller');
            game.scene.stop('shopUI');
            shopOpen = false;
        });

        function updateUIelements(){
            currentCoinsText.setText("Current coins :"+ currentCoins );
            if(currentCoins < 10){
                arrowPurchase.alpha = 0.4;
                upgradePointPurchase.alpha = 0.4;
                potionPurchase.alpha = 0.4;
            }
            if(currentCoins < 5){
                xpPurchase.alpha = 0.4;
                chickenPurchase.alpha = 0.4;
            }
            if(currentCoins < 25){
                damagePurchase.alpha = 0.4;
            }
        }

        updateUIelements();

    }

}


