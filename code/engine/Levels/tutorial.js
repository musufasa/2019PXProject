class tutorial extends Phaser.Scene {
    constructor() {
        super({key: 'tutorial', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'tutorial';
        backgroundLayer0 = 'bgSky';
        commonPreload();
        
        //todo: change image for tutorial enemy character
        this.load.spritesheet('snake','assets/enemy/snake.png', {frameWidth: 120, frameHeight: 83});

    }
    
    create() {
        loadMap();
        //todo: modify to fit tutorial enemy character
        createThis.anims.create({
            key: 'snakeLeft',
            frames: createThis.anims.generateFrameNumbers('snake', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        //todo: modify to fit tutorial enemy character
        createThis.anims.create({
            key: 'snakeRight',
            frames: createThis.anims.generateFrameNumbers('snake', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        
        //Set the first quest to be the tutorial one
        var tutorialQuest = new questClass("Quest 1");
        tutorialQuest.questName = "Snake hunt";
        tutorialQuest.questGiver = "Jason";
        tutorialQuest.questState = "In progress";
        tutorialQuest.questCompletionTime = "Not complete yet";
        tutorialQuest.questDescription = "Test quest - Player must \n slay all snakes \n in the tutorial level";
        tutorialQuest.rewardType = "coins";
        tutorialQuest.reward = 50;
        //Completion reward should be set to same structure as pickup item and pushed using bagInventory.push(currentQuest.completionReward) if there is space in the bag
        tutorialQuest.completionRewardText = "50 coins";

        //set the current player quest to the new tutorial quest one.
        currentQuest = tutorialQuest;
    }
    
    update() 
    {
        callUpdateFuncs();
            //makes the player invulnerable if they are below 50hp so the player
            //can use items
                 if (currentHealth<=70){
                    playerInvulnerability = true;
        }else
            {
                playerInvulnerability=false;
            } 
    }
}

