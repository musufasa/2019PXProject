class interStage2 extends Phaser.Scene {
    constructor() {
        super({key: 'interStage2', active: false });
    }

    preload() {
        
        //Create local context to createThis, set level id, background layer, disable player invulnerability and carry out common preload tasks common to //all levels
        createThis = this;
        currentLevelID = 'interStage2';
        backgroundLayer0 = 'bgDragon';
        playerInvulnerability = false;
        commonPreload();
        
        //Load spritesheets for enemies 
        this.load.spritesheet('snake','assets/enemy/snake.png', {frameWidth: 120, frameHeight: 83});    
        this.load.spritesheet('centaurEnemy','assets/enemy/centaur.png',{frameWidth: 192, frameHeight: 256});   
    }

    create() {
        
        //Call loadMap function present in base.js 
        loadMap();
            
        //Create required animations for enemies 
        createThis.anims.create({
            key: 'snakeLeft',
            frames: createThis.anims.generateFrameNumbers('snake', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'snakeRight',
            frames: createThis.anims.generateFrameNumbers('snake', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'centaurLeft',
            frames: createThis.anims.generateFrameNumbers('centaurEnemy', {start: 3, end: 5}),
            frameRate: 10, 
            repeat: -1 
        });
        createThis.anims.create({
            key: 'centaurRight',
            frames: createThis.anims.generateFrameNumbers('centaurEnemy', {start: 6, end: 8}),
            frameRate: 10, 
            repeat: -1 
        }); 
        
        //Set quest for critters creek level 
        var treasureQuest = new questClass("Quest 3");
        treasureQuest.questName = "Treasure Hunter";
        treasureQuest.questGiver = "Jason";
        treasureQuest.questState = "In progress";
        treasureQuest.questCompletionTime = "Not complete yet";
        treasureQuest.questDescription = "Collect 50 coins";
        treasureQuest.rewardType = "coins";
        treasureQuest.reward = 200;
        //Completion reward should be set to same structure as pickup item and pushed using bagInventory.push(currentQuest.completionReward) if there is space in the bag
        treasureQuest.completionRewardText = "500 coins + 2000 XP";

        //set the current player quest to the new tutorial quest one.
        currentQuest = treasureQuest;
        
        //Track number of coins held by player upon spawn 
        numberOfCoinsHeld = currentCoins; 
        
        treasureQuestComplete = false; 
        questLooper3 = 0; 
    }

    update() {
        
        //If 50 coins have been collected mark quest as complete 
        if(currentCoins-numberOfCoinsHeld==50)
        {
           treasureQuestComplete = true; 
           completeCurrentQuest()
        }
        
        
        callUpdateFuncs();

    }
}