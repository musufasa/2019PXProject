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
            wordWrap: {width: drawWidth*0.35, useAdvancedWrap: true}
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

        let arrow = this.add.image(this.game.renderer.width * .30, this.game.renderer.height * 0.3,'arrowAmmo').setDepth(1);
        let arrowPurchase = this.add.image(this.game.renderer.width * .30, this.game.renderer.height * 0.45,'coinSpriteTest').setDepth(1).setInteractive();
        if(currentCoins < 10){
            arrowPurchase.alpha = 0.4;
        }

        let arrowPurchaseText = this.add.text(0,0,'',undefined);
        arrowPurchaseText.x = this.game.renderer.width * .175;
        arrowPurchaseText.y = this.game.renderer.height * .35;
        arrowPurchaseText.setDepth(10);
        arrowPurchaseText.setStyle(diaBoxTextStyle);
        arrowPurchaseText.setText("add 10 arrows into your inventory, handy for taking out enemies from afar" );

        arrowPurchase.on('pointerup', function () {
            if(currentCoins > 10) {
                numberArrows += 10;
                currentCoins -= 10;
            }
        });
    }

}


