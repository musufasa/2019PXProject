class sidequest1 extends Phaser.Scene {
    constructor() {
        super({key: 'sidequest1', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'sidequest1';
        backgroundLayer0 = 'bgDragon';
        playerInvulnerability = false;
        commonPreload();
        
        this.load.spritesheet('fox','assets/enemy/fox.png',
        {frameWidth: 120, frameHeight: 79});    
    }

    create() {
        loadMap();
        
        createThis.anims.create({
            key: 'foxLeft',
            frames: createThis.anims.generateFrameNumbers('foxEnemy', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'foxRight',
            frames: createThis.anims.generateFrameNumbers('foxEnemy', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        
        //Set fox hunt quest on map load 
        var foxHuntQuest = new questClass("Quest 4");
        foxHuntQuest.questName = "Fox invasion";
        foxHuntQuest.questGiver = "Villager";
        foxHuntQuest.questState = "In progress";
        foxHuntQuest.questCompletionTime = "Not complete yet";
        foxHuntQuest.questDescription = "Slay all foxes in the \n surrounding area";
        foxHuntQuest.rewardType = "coins";
        foxHuntQuest.reward = 100;
        //Completion reward should be set to same structure as pickup item and pushed using bagInventory.push(currentQuest.completionReward) if there is space in the bag
        foxHuntQuest.completionRewardText = "100 coins + 500 XP";

        //set the current player quest to the new tutorial quest one.
        currentQuest = foxHuntQuest; 
        
        foxHuntQuestComplete = false; 
        questLooper4 = 0; 
    }

    update() {
        
        //If all foxes have been defeated then mark fox hunt quest as complete 
        if(activeBosses2<=0)
        {
           foxHuntQuestComplete = true; 
           completeCurrentQuest()
        }
        
        
        callUpdateFuncs();

    }
}
