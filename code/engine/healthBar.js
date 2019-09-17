//also contains player level code with checking level and XP

var healthBar; //Health bar.
var oldHealth; //Old health value. 
var healthDif; //Difference 
var hbX; //Health bar x. 
var hbY; //Health bar y. 
var hbWidth; //Health bar width. 
var hbHeight; //Health bar height. 
var hbIncrement; //Health increments .
var hbReady; //Is the health bar ready? 
var intervalVar; //Interval.

var currentPlayerLvl =1;
var upgradePoints=1;
var XPtillNextLvl=1000;
var currentXP=0;

function checkLevelUp(){
if(currentXP >= XPtillNextLvl)
    {
    upgradePoints = upgradePoints+10;
    currentPlayerLvl=currentPlayerLvl+1;
    XPtillNextLvl=XPtillNextLvl*1.5;
    console.log("player is currently"+currentPlayerLvl);
    console.log("currentxp "+currentXP);
    console.log("Xp till next lvl "+XPtillNextLvl);
    console.log("upgradepoints "+upgradePoints);

    }
}

function updateXpText(){
    
    userIntThis.xpText.setText("\nCurrent EXP: "+currentXP+" / "+XPtillNextLvl);
    userIntThis.playerLevelText.setText("Player Level "+currentPlayerLvl);

}


//Initialise health bar. 
function firstInitHealthBar() {
    hbWidth = userIntThis.sys.game.config.width*0.20;
    hbHeight = userIntThis.sys.game.config.height*0.05;
    hbIncrement = hbWidth/maxHealth;
    hbReady = true;
    oldHealth = maxHealth;
    healthBar = userIntThis.add.graphics();
    healthBar.setDepth(500);
}

//Update the maximum health value of the health bar. 
function maxHealthUpdate() {
    hbIncrement = hbWidth/maxHealth;    
}

//Reset the health bar. 
function healthBarReset() {
    oldHealth = maxHealth;
    healthDif = 0;
    if (intervalVar !== undefined) {
        clearInterval(intervalVar);
    }
}

//Animate the health bar. 
function parseHealthBarAnimate() {
    hbReady = true;
    healthDif = oldHealth - currentHealth;
    if (healthDif != 0) {
        intervalVar = setInterval(oldHealthCtr, 50);
    }
}

function oldHealthCtr() {
    if (healthDif > 0) {
        healthDif--;
        oldHealth--;
    } else if (healthDif < 0) {
        healthDif++;
        oldHealth++;
    } else {
        clearInterval(intervalVar);
    }

    drawHealthBar();
}

//Parse the health bar. 
function parseHealthBar() {
    if (hbReady) {
        hbReady = false;
        drawHealthBar();
        setTimeout(setHBReady(), 250);
    }
}

//Draw the health bar. 
function drawHealthBar() {
    healthBar.clear();
    hbX = userIntThis.cameras.main.scrollX + userIntThis.sys.game.config.width*0.775;
    hbY = userIntThis.cameras.main.scrollY + userIntThis.sys.game.config.height*0.0225;
    healthBar.lineStyle(1,0x000000,1);
    healthBar.fillStyle(0xff0000,1);
    healthBar.strokeRect(hbX,hbY,hbWidth,hbHeight);
    
    if (currentHealth > 0) {
        healthBar.fillRect(hbX,hbY,hbIncrement*oldHealth,hbHeight);
    }
}

//Set the health bar to being ready. 
function setHBReady() {
    hbReady = true;
}

