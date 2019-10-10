//Variables for controls
var cursors; //Arrow Keys
var leftMoveKey; //Move left, deafault is A
var rightMoveKey; //Move right, deafault is D
var weaponKey; //Attack key (default is Z)
var jumpKey; //Jump key (default is Space bar)
var sprintKey; //Sprint/dash key (default is left shift)
var interactKey; //Talk/interact key (default is C)
var pauseKey; //Pause key (default is P)
var displayMapKey; //Map key (default is M)
var inventoryKey; // Inventory key mapped to I
var portalKey;//travel through portals key is mapped to the UP arrow
var questInfoKey;//used to display or hide the quest information layer.
var shopKey;//used to display or hide the in game shop UI.
var blockKey;//used to enable blocking (E key)
var camera;
var helperSprite; //used to hold the value of which helper sprite was choosen by the player at the start of the game. should be strictly 'Orpheus' or 'Medea'
var currentWeapon = 'sword';
var justPorted = false;
//Player character
var player; //Player sprite
var attacksound = false; // Variable for attack sound - Used to tell if sound should be played.
var jumpsound = false; // Variable for Jump Sound - Used to tell if sound should be played.
//Map variables
var mapLayer; //Layer with tiles.
var createThis;
var userIntThis;
var currentLevelDialogueJSON; //Current level's JSON dialogue file.
var levelProgress = 1; //Level progress. Used to control NPCs and portals.
var music;
var musicMuted = false; //Is the music muted?
var musicPlaying = false; //Is music playing?
var portalMap; //Which map should a portal warp into?
var musicVolume = 0.5; // global starting music volume,editable via pause menu. 1 = 100%, 0.5 = 50% etc.
var inventoryOpen = false;
var questInfoOpen = false;
var shopOpen = false;
var currentQuest;//holds a quest object to be read into UI elements.
var diffText1; 
var diffText2;
var diffText3;
 

//Background layers
var backgroundLayer0;
var backgroundLayer1;

//Variables for test quest system 
var loopcounter = 0; 

//variable to see if coin is picked up
var playcoinsound = false;

//Keeps track of when arrow sound should be played 
var playArrowSound = false; 

var updatexpText=false;

var shield;

var dragonPhase;
var onFire=false;

var medeaPhase;
var teleport;
var medeaReset=false;
var cloneSpawn=false;
/* Controller.
 * Handles the entire game.
 */
class controller extends Phaser.Scene {
    constructor() {
        super({key: 'controller'});
    }
    
    //Preload common assets.
    preload() {
        //Load assets used in all levels
        createThis = this;
        userIntThis = this;
        
        //Main characters
        this.load.spritesheet('medeaSprite','assets/NPC/medea.png',
           { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('jason','assets/player/jason.png',
           { frameWidth: 76, frameHeight: 64 });
        
        this.load.spritesheet('jasonIdle','assets/player/newJasonIdle.png',
           { frameWidth: 82, frameHeight: 94 });
        this.load.spritesheet('jasonWalk','assets/player/newJasonWalking.png',
           { frameWidth: 52, frameHeight: 94 });
        this.load.spritesheet('orpheusSprite','assets/NPC/orpheusTest.png',
           { frameWidth: 57, frameHeight: 94 });
        
        this.load.spritesheet('jasonAttack','assets/player/newJasonAttack.png',
           { frameWidth: 139, frameHeight: 94 });

        this.load.spritesheet('kingSprite','assets/NPC/king.png',
           { frameWidth: 40, frameHeight: 64 });

        //Portal
        this.load.image('portalSprite','assets/items/portal.png');
        
        //Music & Audio
        this.load.audio('female', ['assets/stage/background/female.mp3']);
        this.load.audio('water', ['assets/stage/background/water.mp3']);
        this.load.audio('male',['assets/stage/background/male.mp3']);
        this.load.audio('upbeat', ['assets/stage/background/upbeat.mp3']);
        this.load.audio('jasonIntro', ['assets/stage/background/jasonIntro.mp3']);
        this.load.audio('attack',['assets/stage/background/attack.mp3']);
        this.load.audio('jump',['assets/stage/background/jump.wav']);
        this.load.audio('bite',['assets/stage/background/bite.wav']);
        this.load.audio('coinsSound',['assets/sounds/coincollectsounds.wav']);
        this.load.audio('arrowFired',['assets/sounds/arrowFired.wav']);

        
        //Other/Placeholders
        this.load.spritesheet('tempEnemy','assets/enemy/eviljason.png',
           { frameWidth: 48, frameHeight: 48 });
        this.load.image('artemisSprite','assets/NPC/artemis.png');
        this.load.image('bonfireSprite','assets/bonfire.png');
        this.load.image('fireballSprite','assets/fireball.png');
        this.load.image('spiderBossSprite','assets/enemy/spiderBoss.png');
        this.load.image('spiderBossWebSprite','assets/enemy/spiderBossWeb.png');
        this.load.image('medusaBossSprite','assets/enemy/medusaBoss.png');
        this.load.image('medea','assets/NPC/medeaNew.png');
        this.load.image('orpheus','assets/NPC/orpheusNew.jpg');
        this.load.image('bullBossSprite','assets/enemy/bullBoss.png');
        this.load.spritesheet('skeleSprite','assets/enemy/skeleton.png',
            { frameWidth: 30, frameHeight: 45 });

        
        //Items (must be constantly loaded for inventory)
        this.load.image('spiderFlowerSprite', 'assets/items/flower.png');
        this.load.image('thoughtBubbleSprite', 'assets/npc/thought.png');

        //LEVEL STUFF
        this.load.image('bgSky', 'assets/background/sky.png');
        this.load.image('bgClouds', 'assets/background/clouds.png');
        this.load.image('bgDungeon', 'assets/background/dungeon.png');
        this.load.image('bgForest', 'assets/background/forest.png');
        this.load.image('bgMarket', 'assets/background/market.png');
        this.load.image('bgDragon', 'assets/background/dragonBackground.jpg');
        
        this.load.image("tiles", "assets/tilesheet-extruded.png");
        this.load.image('plowSprite','assets/items/plow.png');
        this.load.image('maxHealthItemSprite', 'assets/items/maxHealth.png');
        this.load.image('healthItemSprite', 'assets/items/health.png');
        this.load.image('testItemSprite', 'assets/items/health.png');
        this.load.image('coinImage', 'assets/items/coinImage.jpg');
        this.load.image('damageIncreaseItemSprite', 'assets/items/damageIncrease.png');
        this.load.image('smallExp', 'assets/items/smallExp.png');
        this.load.image('levelUp', 'assets/items/levelUpItem.png');
        this.load.image('healthPotion', 'assets/items/healthPotion.png');
        this.load.image('diamond', 'assets/items/diamond.png');
        this.load.image('arrowAmmo', 'assets/items/arrow.png');


        //Pause
        this.load.image('resumebut', 'assets/stage/background/resumebut.png');
        this.load.image('pausebg', 'assets/stage/background/pausebg.png');
        this.load.image('mapMenu', 'assets/stage/background/mapMenu.png');
        this.load.image('mutebtn', 'assets/stage/background/mutebtn.png');
        this.load.image('volumeupbut', 'assets/stage/background/volumeupbut.png');
        this.load.image('volumedownbut', 'assets/stage/background/volumedownbut.png');
        this.load.image('scrollbg', 'assets/stage/background/scrollbg.png');    

        //SIGNS
        this.load.image('signR2CSprite','assets/items/signR2C.png');
        this.load.image('signMarketSprite','assets/items/signMarket.png');
        this.load.image('signShrineSprite','assets/items/signShrine.png');
        this.load.image('signShrineForestSprite','assets/items/signShrineForest.png');
        this.load.image('signPalaceSprite','assets/items/signPalace.png');
        this.load.image('signColchisFieldsSprite','assets/items/signColchisFields.png');
        this.load.image('signRiverCrossingSprite','assets/items/signRiverCrossing.png');
        this.load.image('signGardenEntranceSprite','assets/items/signGardenEntrance.png');
        this.load.image('signDungeonSprite','assets/items/signDungeon.png');
        this.load.image('signGardenForestSprite','assets/items/signGardenForest.png');
        this.load.image('centaurPlainsSign', 'assets/items/centaurPlainsSign.png');
        this.load.image('crittersCreekSign', 'assets/items/crittersCreekSign.png');
        this.load.image('marshlandSign', 'assets/items/marshlandSign.png');
        
        //UIS stuff
        this.load.image('items1', 'assets/background/closeinventbutton.png');
        this.load.image('inventory', 'assets/background/inventorydraft.png');
        this.load.image('slots', 'assets/items/inventoryslots.png');
        this.load.image('upgradeStatButton','assets/buttons/upgradebutton.png');
        
        //coin
        this.load.image('coinSprite', 'assets/items/coinplaceholder.png');
        this.load.spritesheet('coinSpriteTest', 'assets/items/coin.png', { frameWidth: 32, frameHeight: 32 });
        
        //Quest UI assets 
        this.load.image('questBox', 'assets/items/questBox.png');
        
        //Centaur enemy spritesheet 
        this.load.spritesheet('centaurEnemy','assets/enemy/centaur.png', {frameWidth: 192, frameHeight: 256});
        
        //Fox enemy spritesheet 
        this.load.spritesheet('foxEnemy','assets/enemy/newFoxSpriteSheet.png', {frameWidth: 240, frameHeight: 158});
        
        // shield
         this.load.image('shield','assets/player/shield.png');

        //fire
        this.load.image('fire', 'assets/enemy/firePlaceHolder.png');
        this.load.spritesheet('fireAnimation', 'assets/enemy/fireSheet.png', { frameWidth: 1920, frameHeight: 137 });
        this.load.image('fountain', 'assets/items/fountain.png');
        
        //Temple of Hecate - Medea boss 
        this.load.image('mirror', 'assets/items/mirror.png');
        this.load.image('cauldron','assets/items/steamingCauldron.png');

    }

    create() {
        firstInitHealthBar();
        initDialogueBox();

        //Keyboard input mappings
        //Create default key bindings for up,down,left and righ
        cursors = createThis.input.keyboard.createCursorKeys();
        pauseKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        inventoryKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        questInfoKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        weaponKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        jumpKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        interactKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        displayMapKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        leftMoveKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        rightMoveKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        sprintKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        portalKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        shopKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        blockKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //action sound mappings
        var jump = this.sound.add('jump');
        var attack = this.sound.add('attack');
        var bite = this.sound.add('bite');

        game.scene.run(currentLevelID);
        userIntThis.scene.bringToTop('controller');

        this.ritualItemText = userIntThis.add.text(800, 50, '0/x Ritual Items', undefined);
        this.ritualItemText.alpha = 0;
/*
        createThis.anims.create({
            key: 'jasonAttackRight',
            frames: createThis.anims.generateFrameNumbers('jason', { start: 12, end: 29 }),
            frameRate: 30,
            repeat: -1
        });
 */       
        var styleRed = { font: "20px Arial", fill: "#FF0000", align: "right"};
        var styleRed2 = { font: "20px Arial", fill: "#FF0000", align: "left"};

        //add player level UI elements
        this.playerLevelText= userIntThis.add.text(this.game.renderer.width *.73, this.game.renderer.height * 0.09,"Player Level:"+currentPlayerLvl, styleRed2)
        this.xpText= userIntThis.add.text(this.game.renderer.width *.73, this.game.renderer.height * 0.1,"/nCurrent EXP: "+currentXP+" / "+XPtillNextLvl, styleRed)
        //add player arrows UI element
        this.ammoText= userIntThis.add.text(this.game.renderer.width *.73, this.game.renderer.height * 0.18,"/nCurrent EXP: "+currentXP+" / "+XPtillNextLvl, styleRed)
        //add current coin UI element
        this.coinText= userIntThis.add.text(this.game.renderer.width *.73, this.game.renderer.height * 0.22,"Coins: " +currentCoins, styleRed)

    }

    update() {

        //checks if the player is on fire and passively damages them until false
        if(onFire==true){
            playerDamage(1);
        }

        //updates xp text and upgrade points UIs
        updateXpText();
        checkUpgradePoints();
        
        //Keeps coin counter up to date
        this.coinText.setText("Coins: "+currentCoins);

        if (questInfoKey._justDown){
            //display the quest info or hide it depending on its current state.
            questInfoKey._justDown = false;
            
            if(!questInfoOpen){

                //Render quest box every frame with opacity of 40%
                this.questBox = this.add.image(0,0,'questBox').setOrigin(0, 0).setAlpha(0.4);

                //Rect structure for quest name in UI
                this.questName = this.add.text(this.game.renderer.width *.06, this.game.renderer.height * 0.10,currentQuest.questName,{ fontSize: '10px'});

                //Rect structure for client in UI
                this.client = this.add.text(this.game.renderer.width *.06, this.game.renderer.height * 0.15,currentQuest.questGiver,{ fontSize: '10px'});

                //Rect structure for current state in UI
                this.currentState = this.add.text(this.game.renderer.width *.10, this.game.renderer.height * 0.21,currentQuest.questState,{ fontSize: '10px'});

                //Rect structure for completion time in UI
                this.completionTime = this.add.text(this.game.renderer.width *.13, this.game.renderer.height * 0.27,currentQuest.questCompletionTime,{ fontSize: '10px'});

                //Rect structure for quest description in UI
                this.description = this.add.text(this.game.renderer.width *.09, this.game.renderer.height * 0.33,currentQuest.questDescription,{ fontSize: '10px'});

                //Rect structure for quest reward in UI
                this.reward = this.add.text(this.game.renderer.width *.07, this.game.renderer.height * 0.39,currentQuest.completionRewardText,{ fontSize: '10px'});

                questInfoOpen = true;
            }else{
                //remove all the quest UI elements from the screen.
                this.questName.destroy();
                this.questBox.destroy();
                this.client.destroy();
                this.currentState.destroy();
                this.completionTime.destroy();
                this.description.destroy();
                this.reward.destroy();
                this.reward.destroy();
                questInfoOpen = false;
            }
        }
        
        //Pause the game if the pause key is held down.
        if (pauseKey._justDown) {
            pauseKey._justDown = false;
            userIntThis.scene.sendToBack('controller');
            game.scene.run('pause');
        }

        //Music
        if (!musicPlaying && !musicMuted) {
            if (['endScreen','titleScreen','mapMenu','settingsScreen'].includes(currentLevelID)) {
                music = this.sound.add('water', {loop: true});
                music.play();
                music.setVolume(musicVolume);
            } else if (['colchisFields','gardenFleece'].includes(currentLevelID)) {
                music = this.sound.add('male', {loop: true})
                music.play();
                music.setVolume(musicVolume);
            } else if (['siren'].includes(currentLevelID)) {
                music = this.sound.add('upbeat', {loop: true})
                music.play();
                music.setVolume(musicVolume);
            } else if (['introCutscene'].includes(currentLevelID)) {
                music = this.sound.add('jasonIntro', {loop: true})
                music.play();
                music.setVolume(musicVolume);
            } else {
                music = this.sound.add('female', {loop: true});
                music.play();
                music.setVolume(musicVolume);
            }
            musicPlaying = true;
        }

        //Dont play sounds on these Scenes.
        if (['endScreen','titleScreen','mapMenu','settingsScreen','introCutscene','siren'].includes(currentLevelID)){
            jumpsound = false;
            attacksound = false;
        }

        // When character Jumps, play the jump sound
        if(!jumpKey.isDown){
            jumpsound = true;
        }

        if (jumpKey.isDown && jumpsound){
            this.sound.play('jump');
            jumpsound = false;
        }

       //When character Attacks, play the attack sound.
        if (attacksound){
            this.sound.play('attack');
            attacksound = false;
        }

        //play coins sounds when coin is picked up
       if(playcoinsound==true){
           var coinsSoundtest = this.sound.add('coinsSound');
           this.sound.play('coinsSound');
           playcoinsound=false;
       }
        
        //Play arrow fired sound when arrow is fired 
        if(playArrowSound==true){
            var arrowFiredChunk = this.sound.add('arrowFired');
            this.sound.play('arrowFired');
            playArrowSound = false; 
        }

        //handle shopUI
        if (shopKey._justDown){
            shopKey._justDown = false;
            if(!shopOpen) {
                shopOpen = true;
                game.scene.run('shopUI');
                userIntThis.scene.sendToBack('controller');
            }else{
                shopOpen = false;
                game.scene.stop('shopUI');
                userIntThis.scene.bringToTop('controller');
                game.scene.resume(currentLevelID);
            }
        }

    }
    updateRitualItemText() {
        var tempCount = 0;
        for (i = 0; i < ritualItemCount; i++){
            tempCount += (1 * inventory[i]);
        }

        //Update the text.
        if (tempCount != ritualItemCount){
            userIntThis.ritualItemText.setText(tempCount + '/' + ritualItemCount + " Ritual Items.");
            userIntThis.ritualItemText.alpha = 1;
        } else {
            userIntThis.ritualItemText.alpha = 0;
            if (levelProgress === 4)
            {
                levelProgress++;
            }
        }
    }

    updateSkeletonText() {
        //Update the text.
        //Variable Re-use
        userIntThis.ritualItemText.setText(skelesRemain  + " skeletons remain");
        userIntThis.ritualItemText.alpha = 1;

    }
}

//Preload code common to all levels.
function commonPreload() {
    //load map
    createThis.load.tilemapTiledJSON(currentLevelID + 'Tilemap', 'assets/'+ currentLevelID + '.json');
    //load dialogue
    currentLevelDialogueJSON = 'stages/dialogue/' + currentLevelID + '.json';
    loadLevelDialogue();

    //Update resetInventory.
    for (j = 0; j < inventory.length; j++) {
        resetInventory[j] = (inventory[j]);
    }
}

/* Load the level specified in currentLevelID.
 * It is assumed that currentLevelID is a valid value.
 */
function loadMap() {
    destroyOldObjects();
    createThis.physics.world.TILE_BIAS = 64;

    var currentTilemapKey = currentLevelID + 'Tilemap';

    createThis.map = createThis.make.tilemap({ key: currentTilemapKey });

    //set Boundary
    gameWidth = createThis.map.widthInPixels;
    gameHeight = createThis.map.heightInPixels;
    createThis.physics.world.setBounds(0, 0, gameWidth + (200 * playerShip), gameHeight, 64, true, true, false, false);

    //Render background.
    background = createThis.add.image(1024, 576, backgroundLayer0);
    background.setOrigin(1,1);
    background.scrollFactorX = 0;
    background.scrollFactorY = 0;
    background.setDepth(-100);

    if (backgroundLayer0 == 'bgSky') {
        backgroundClouds = createThis.add.image(0, 576, 'bgClouds');
        backgroundClouds.setOrigin(0,1);
        backgroundClouds.scrollFactorX = 0.2;
        backgroundClouds.scrollFactorY = 0;
        backgroundClouds.setDepth(-95);
    }

    if (backgroundLayer1 !== undefined) {
        backgroundLayer1Image = createThis.add.image(0, 576, backgroundLayer1);
        backgroundLayer1Image.setOrigin(0,1);
        backgroundLayer1Image.scrollFactorX = 0.4;
        backgroundLayer1Image.scrollFactorY = 0;
        backgroundLayer1Image.setDepth(-95);
    }

    //Draw tileset/objects
    var tileset = createThis.map.addTilesetImage("tilesheet-extruded", "tiles", 64, 64, 1, 2);
    var mapLayerBG = createThis.map.createStaticLayer("Layer_bg", tileset, 0, 0);
   

    mapLayer = createThis.map.createStaticLayer("Layer", tileset, 0, 0);
    mapLayer.setDepth(-40);
    mapLayerBG.setDepth(-50);
    
    //create player shield
    shield = createThis.add.image(0, 0, 'shield');
    shield.setScale(.2);
    //Spawn player.
    var playerSpawnPoint = createThis.map.findObject("Objects", obj => obj.name === "Player Spawn");
    player = createThis.physics.add.sprite(playerSpawnPoint.x, playerSpawnPoint.y, playerSprite);
    player.setCollideWorldBounds(true);
    player.displayHeight = 64;
    player.displayWidth = 72;
    mapLayer.setCollisionByProperty({ collides: true });
    createThis.physics.add.collider(player, mapLayer);

    //Player animations. 
    createThis.anims.create({
        key: 'jasonRight',
        frames: createThis.anims.generateFrameNumbers('jasonWalk', { start: 2, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    createThis.anims.create({
        key: 'jasonAttackRight',
        frames: createThis.anims.generateFrameNumbers('jasonAttack', { start: 0, end: 19 }),
        frameRate: 30,
        repeat: -1,
    });
    createThis.anims.create({
        key: 'jasonIdleRight',
        frames: createThis.anims.generateFrameNumbers('jasonIdle', { start: 0, end: 12 }),
        frameRate: 10,
        repeat: -1
    });
    
    //Medea animations.
    createThis.anims.create({
        key: 'medeaIdleRight',
        frames: createThis.anims.generateFrameNumbers('medeaSprite', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    createThis.anims.create({
        key: 'medeaWalkRight',
        frames: createThis.anims.generateFrameNumbers('medeaSprite', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    
     createThis.anims.create({
        key: 'orpheusTest',
        frames: createThis.anims.generateFrameNumbers('orpheusSprite', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    //coin animation 
        createThis.anims.create({
        key: 'spin',
        frames: createThis.anims.generateFrameNumbers('coinSpriteTest', { start: 0, end: 6 }),
        frameRate: 16,
        repeat: -1
    });
    createThis.anims.create({
        key: 'fire',
        frames: createThis.anims.generateFrameNumbers('fireAnimation', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    if (playerShip) {
        player.body.allowGravity = false;
    }

    parseLevelDialogue();
    if (currentLevelID != 'endCutscene'){
        parseHealthBar();
    }

    spawnObjects();

    playerCheckForPortal();

    //Camera
    if (!playerShip) {
    camera = createThis.cameras.main.startFollow(player, false, 0.05, 0.03);
    } else {
        playerOffset = createThis.physics.add.sprite(playerSpawnPoint.x + playerShipOffsetX, playerSpawnPoint.y, playerSprite);
        createThis.cameras.main.startFollow(playerOffset, true, 1, 1);
        playerOffset.alpha = 0;
        playerOffset.allowGravity = 0;
    }
    createThis.cameras.main.setBounds(0, 0, createThis.map.widthInPixels, createThis.map.heightInPixels);

    playerAlive = true;
}

//Call update functions.
function callUpdateFuncs() {
    //xpbar stuff
    checkLevelUp()
    //Use the appropriate movement function for the level.
    playerMovement();
    
    //Set test quest only once 
    if(loopcounter<1)
    {
        loopcounter += 1; 
    }
    
    //Enemy Movement
    enemyMovement();

    //Check if a player has fallen.
    playerCheckForFall();

    //Run the update() function of each portal.
    portalUpdate();

    //Run the update() function of each NPC.
    npcUpdate();

    //Check if the player has walked away from dialogue.
    if (dialogueActive) {
        playerCheckDialogueWalkAway();
    }

    if (weaponKey._justDown){
        weaponKey._justDown = false;
        switch (currentWeapon) {
            case "sword":
                currentWeapon = "ranged";
                break;
            case "ranged":
                currentWeapon = "sword";
                break;
            default:
                currentWeapon = "sword";
                break;
        }
    }
    //open or closes inventory
    if (inventoryKey._justDown){
        inventoryKey._justDown = false;
        if(!inventoryOpen){
            userIntThis.scene.sendToBack('controller');
            game.scene.run('UIS');
            inventoryOpen = true;
        }else{
            //close the inventory if it is open.
            userIntThis.scene.bringToTop('controller');
            game.scene.resume(currentLevelID);
            game.scene.stop('UIS');
            inventoryOpen = false;
        }
    }
    
}

//Ship update function.
function shipUpdate() {
    //Should the player move or sink?
    if (playerAlive) {
        playerShipMovement();
    } else {
        playerShipSink();
    }

    //Player offset calculation. Used for the camera offset.
    playerOffset.x = player.x + playerShipOffsetX;
    playerOffset.y = player.y;

    //Check if the player has fallen.
    playerCheckForFall();
}

//Change level to tempNewLevelID (which is required and assumed to be valid).
function changeLevel(tempNewLevelID) {
    oldLevelID = currentLevelID;
    playerShip = false;
    if ((['endScreen','titleScreen','settingsScreen','difficultyScreen','colchisFields', 'gardenFleece','mapMenu','siren','introCutscene'].includes(currentLevelID)) ||
            (['endScreen','titleScreen','colchisFields', 'gardenFleece','mapMenu','siren','introCutscene'].includes(tempNewLevelID)))
    {
        musicPlaying = false;
        music.stop();
    }
    clearDialogueBox();
    npcDialogue.text = '';
    if (['endScreen','titleScreen','settingsScreen','difficultyScreen','mapMenu','introCutscene'].includes(tempNewLevelID)) {
        userIntThis.scene.sendToBack('controller');
    } else {
        userIntThis.scene.bringToTop('controller');
    }

    backgroundLayer1 = undefined;
    game.scene.run(tempNewLevelID);
    game.scene.stop(oldLevelID);
}

//Destroy objects in a map. Used when switching to a new map.
function destroyOldObjects() {
    for (i = 0; i < enemyCount; i++){
        enemies[i].destroy();
    }
    for (i = 0; i < npcCount; i++){
        npcs[i].destroy();
    }
    for (i = 0; i < portalCount; i++){
        portals[i].destroy();
    }
    for (i = 0; i < itemCount; i++){
        items[i].destroy();
    }
}


   function playerShoot() {
        
        //Play arrow shot sound effect 
        playArrowSound = true;  
        
        playerProjectiles[currentProjectile2] = new playerArrow({
            x: player.x, 
            y: player.y,
            projectileId: currentProjectile2,
            aimed: true, 
            velocityAimed: 400
        });

    }
  


var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
        width: 1024,
        height: 576
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 900},
            debug: false
        }
    },


    scene: [controller, titleScreen,tutorial,settingsScreen, difficultyScreen, argoLanding, roadToColchis, marketplace, palace, shrine, shrineForest,
            colchisFields, riverCrossing, gardenEntrance, gardenForest, gardenDungeon, gardenFleece, sidequest1, palaceTreasureRoom ,sidequest2, dragonLevel, interStage1, interStage2, interStage3,  
            placeholdertestmap,templeOfHecate, endCutscene, endScreen, siren, pause, UIS, mapMenu, introCutscene,shopUI]

};

function drawHelperSpriteChoiceUIBox() {
    //dimensions
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


    //draw outer rectangle
    dialogBox.lineStyle(lineStyleThick,0x000000,1);
    dialogBox.fillStyle(0xf2edaa,1);
    dialogBox.fillRect(diaBoxX,diaBoxY,drawWidth,drawHeight);
    dialogBox.strokeRect(diaBoxX,diaBoxY,drawWidth,drawHeight);

    //styling
    //Top LHS
    dialogBox.moveTo(diaBoxX+swirlLength,diaBoxY);
    dialogBox.lineTo(diaBoxX+swirlLength,diaBoxY+swirlLength);
    dialogBox.lineTo(diaBoxX+(swirlLength/2),diaBoxY+swirlLength);
    dialogBox.lineTo(diaBoxX+(swirlLength/2),diaBoxY+(swirlLength/2));
    dialogBox.strokePath();

    //Bottom LHS
    dialogBox.moveTo(diaBoxX+swirlLength,drawHeight+diaBoxY);
    dialogBox.lineTo(diaBoxX+swirlLength,drawHeight+diaBoxY-swirlLength);
    dialogBox.lineTo(diaBoxX+(swirlLength/2),drawHeight+diaBoxY-swirlLength);
    dialogBox.lineTo(diaBoxX+(swirlLength/2),drawHeight+diaBoxY-(swirlLength/2));
    dialogBox.strokePath();

    //Top RHS
    dialogBox.moveTo(diaBoxX+drawWidth-swirlLength,diaBoxY);
    dialogBox.lineTo(diaBoxX+drawWidth-swirlLength,diaBoxY+swirlLength);
    dialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),diaBoxY+swirlLength);
    dialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),diaBoxY+(swirlLength/2));
    dialogBox.strokePath();

    //Bottom RHS
    dialogBox.moveTo(diaBoxX+drawWidth-swirlLength,drawHeight+diaBoxY);
    dialogBox.lineTo(diaBoxX+drawWidth-swirlLength,drawHeight+diaBoxY-swirlLength);
    dialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),drawHeight+diaBoxY-swirlLength);
    dialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),drawHeight+diaBoxY-(swirlLength/2));
    dialogBox.strokePath();

    //Style Lines
    //Top
    dialogBox.lineBetween(diaBoxX+swirlLength,diaBoxY+(swirlLength/2),diaBoxX+drawWidth-swirlLength,diaBoxY+(swirlLength/2));
    //Bottom
    dialogBox.lineBetween(diaBoxX+swirlLength,diaBoxY+drawHeight-(swirlLength/2),diaBoxX+drawWidth-swirlLength,diaBoxY+drawHeight-(swirlLength/2));
    //Left
    dialogBox.lineBetween(diaBoxX+(swirlLength*0.75),diaBoxY+swirlLength,diaBoxX+(swirlLength*0.75),diaBoxY+drawHeight-swirlLength);
    //Right
    dialogBox.lineBetween(diaBoxX+drawWidth-(swirlLength*0.75),diaBoxY+swirlLength,diaBoxX+drawWidth-(swirlLength*0.75),diaBoxY+drawHeight-swirlLength);

    dialogBox.alpha = 1;
    dialogBox.setDepth(1);
    //set text location
    orpheusDialogue = userIntThis.add.text(0,0,'',undefined);
    orpheusDialogue.x = this.game.renderer.width * .575;
    orpheusDialogue.y = this.game.renderer.height * .45;
    orpheusDialogue.setDepth(10);
    orpheusDialogue.setStyle(diaBoxTextStyle);
    orpheusDialogue.setText("Orpheus, a musician and poet who joined the argonauts with the intention of helping Jason retrieve the golden fleece from the dragon." +
    " He helped the argonauts pass the terrors of the sirens and successfully find new land with his music played by his Lyre.");

    medeaDialogue = userIntThis.add.text(0,0,'',undefined);
    medeaDialogue.x = this.game.renderer.width * .175;
    medeaDialogue.y = this.game.renderer.height * .45;
    medeaDialogue.setDepth(10);
    medeaDialogue.setStyle(diaBoxTextStyle);
    medeaDialogue.setText("Medea, the Princess of Colchis and a powerful sorceress with a shady past." +
    " Her powers are strong enough to help Jason on his quest to retrieve the golden fleece and has had a prophecy that Jason will be successful on his mission.");

    let medeaImage = userIntThis.add.image(this.game.renderer.width * .30, this.game.renderer.height * 0.3,'medea').setDepth(10).setInteractive();
    medeaImage.setScale(.187);
    let orpheusImage = userIntThis.add.image(this.game.renderer.width * .70, this.game.renderer.height * 0.3, 'orpheus').setDepth(10).setInteractive();
    orpheusImage.setScale(.125);
    let medeaButton = userIntThis.add.image(this.game.renderer.width * 0.30, this.game.renderer.height * 0.7, "items1").setDepth(10).setInteractive();
    let orpheusButton = userIntThis.add.image(this.game.renderer.width * 0.70, this.game.renderer.height * 0.7, "items1").setDepth(10).setInteractive();

    //choose medea mode and remove UI elements
    medeaButton.on('pointerup', function () {
        game.scene.resume(currentLevelID);
        userIntThis.scene.bringToTop('controller');
        game.scene.stop('helperSpriteUI');
        dialogBox.clear();
        medeaImage.destroy();
        orpheusImage.destroy();
        medeaButton.destroy();
        orpheusButton.destroy();
        medeaDialogue.setText("");
        orpheusDialogue.setText("");
        helperSprite = 'Medea';
    });

    //choose orpheus mode and remove UI elements
    orpheusButton.on('pointerup', function () {
        game.scene.resume(currentLevelID);
        userIntThis.scene.bringToTop('controller');
        game.scene.stop('helperSpriteUI');
        dialogBox.clear();
        medeaImage.destroy();
        orpheusImage.destroy();
        medeaButton.destroy();
        orpheusButton.destroy();
        medeaDialogue.setText("");
        orpheusDialogue.setText("");
        helperSprite = 'Orpheus';
    });
}


var game = new Phaser.Game(config);
