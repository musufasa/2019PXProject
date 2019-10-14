class interStage1 extends Phaser.Scene {
    constructor() {
        super({key: 'interStage1', active: false });
    }

    preload() {
        
        //Create local context to createThis, set level id, background layer, disable player invulnerability and carry out common preload tasks common to //all levels
        createThis = this;
        currentLevelID = 'interStage1';
        backgroundLayer0 = 'bgDragon';
        playerInvulnerability = false;
        commonPreload();
        
        //Load spritesheets for enemies 
        this.load.spritesheet('snake','assets/enemy/snake.png', {frameWidth: 120, frameHeight: 83});    
        this.load.spritesheet('centaurEnemy2','assets/enemy/centaur.png',{frameWidth: 192, frameHeight: 256});   
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
            frames: createThis.anims.generateFrameNumbers('centaurEnemy2', {start: 3, end: 5}),
            frameRate: 10, 
            repeat: -1 
        });
        createThis.anims.create({
            key: 'centaurRight',
            frames: createThis.anims.generateFrameNumbers('centaurEnemy2', {start: 6, end: 8}),
            frameRate: 10, 
            repeat: -1 
        });
        
        //Set quest for centaur plains level 
        var centaurQuest = new questClass("Quest 2");
        centaurQuest.questName = "Centaur Slayer";
        centaurQuest.questGiver = "Jason";
        centaurQuest.questState = "In progress";
        centaurQuest.questCompletionTime = "Not complete yet";
        centaurQuest.questDescription = "Slay all centaurs \noccupying centaur plains";
        centaurQuest.rewardType = "coins";
        centaurQuest.reward = 200;
        //Completion reward should be set to same structure as pickup item and pushed using bagInventory.push(currentQuest.completionReward) if there is space in the bag
        centaurQuest.completionRewardText = "200 coins + 1000 XP";

        //set the current player quest to the new tutorial quest one.
        currentQuest = centaurQuest;
        
        centaurQuestComplete = false; 
        questLooper2 = 0; 
    }

    update() {
        
        //If all centaurs have been defeated then mark centaur quest as complete 
        if(activeBosses<=0)
        {
           centaurQuestComplete = true; 
           completeCurrentQuest()
        }
        
        callUpdateFuncs();
    }
}