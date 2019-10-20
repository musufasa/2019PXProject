/* Inventory. 
 * IDs: 0-8: Ritual Items. 
 */
inventory = [false, false, false, false, false, false, false, false, false]; 
resetInventory = [false, false, false, false, false, false, false, false, false];
bagInventory = [];
bagSize = 4;

ritualItemCount = 9; 

//Co-ordinates for the ritual fire. 
var ritualX; 
var ritualY;

/* itemBase 
 * This is used as a base for other item classes. Please do not create this object directly. 
 * Required parameters: scene, x, y, key, gravity.
 * When an item collides with the player, the collision() function is called. 
 */
class itemBase extends Phaser.GameObjects.Sprite {
    constructor (parameter) {
        //Create the object. 
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Set gravity. 
        this.body.allowGravity = parameter.gravity;

        this.inventoryKey = parameter.inventoryKey;

        if (typeof this.inventoryKey !== 'undefined' && inventory[this.inventoryKey]){
            this.destroy();
        }

        //additional attributes required for storing of items into the players bag/ inventory for later use.
        this.description = parameter.description;
        this.itemName = parameter.itemName;
        this.itemType = parameter.itemType;
        this.attributeNumber = parameter.attributeNumber;
        this.bagImage = parameter.bagImage;

        //Collision detection between the player and item. 
        createThis.physics.add.overlap(this, player, this.collision);
    }

    //This is called when the player collides into this item. 
    collision () {
    }
}


/* Health Item 
 * This increases the player's health by a predefined amount (currently 50).
 * Required parameters: x, y
 */
class healthItem extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'healthItemSprite', 
            gravity: false
        })

        this.healValue = 50; 
    }

    collision (tempItem){
        playerHeal(tempItem.healValue);
        tempItem.destroy();
    }
}

/* Max Health Item 
 * This increases the player's maximum health by a predefined amount (currently 50).
 * Required parameters: x, y
 */
class maxHealthItem extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'maxHealthItemSprite', 
            gravity: false
        })

        this.boostValue = 10; 
    }

    collision (tempItem){
        maxHealthBoost(tempItem.boostValue);
        tempItem.destroy();
    }
}

/* Damage Increase Item 
 * This increases the player's maximum damage by a predefined amount (currently 50).
 * Required parameters: x, y
 */
class damageIncreaseItem extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'damageIncreaseItemSprite', 
            gravity: false
        })

        this.boostValue = 25; 
    }

    collision (tempItem){
        playerDamagePoints += tempItem.boostValue;
        tempItem.destroy();
    }
}

/* Spider Flower 
 * The spider flower activates the spider boss' attack. 
 * Required parameters: x, y
 */
class spiderFlowerItem extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'spiderFlowerSprite',
            gravity: false
        })
    }

    collision (tempItem){
        spiderBossActive = true;
        tempItem.destroy();
        spiderFlowerPickedUp = true; 
    }
}

/* Ritual Item (Find)
 * These ritual items are found in the game world. 
 * Required items: x, y, inventoryKey
 */
class ritualItemFind extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'spiderFlowerSprite',
            inventoryKey: parameter.inventoryKey,
            gravity: false
        })
    }

    collision (tempItem){
        inventory[tempItem.inventoryKey] = true;
        userIntThis.updateRitualItemText(); 
        tempItem.destroy();
    }
}

/* Ritual Item (Cutscene)
 * These ritual items are used in the ritual cutscene.
 * Required items: x, y.
 */
class ritualItemCutscene extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'spiderFlowerSprite',
            inventoryKey: parameter.inventoryKey,
            gravity: false
        })

        createThis.physics.add.overlap(this, ritualFireObject, this.destroyMe);
        this.moveToFire(ritualX, ritualY);
        this.body.setVelocityY(100);
    }

    moveToFire (tempX, tempY) {
        createThis.physics.accelerateToObject(this, ritualFireObject, 300);
    }

    destroyMe (tempItem) {
        for (i = 0; i < portals.length; i++){
            if (typeof portals[i].remainingPortals !== 'undefined'){
                portals[i].remainingPortals--;
            }
        }
        tempItem.destroy();
    }
}

/* Ritual Fire. 
 * Required parameters: x, y. s
 */
class ritualFire extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'bonfireSprite',
            gravity: false
        })

        ritualX = this.x;
        ritualY = this.y; 
    
        this.ritualBegun = false; 
    }    

    checkBeginRitual() {
        var tempBeginRitual = true; 

        for (i = 0; i < ritualItemCount; i++){
            tempBeginRitual = tempBeginRitual && inventory[i];
        }

        return tempBeginRitual; 
    }

    ritual() {
        for (i = 0; i < ritualItemCount; i++) {
            new ritualItemCutscene({
                x: this.x + (Math.random() * 200 - 100), 
                y: this.y - (100 * (i + 1)),
                inventoryKey: tempProperties[i]
            });
        }
        if (levelProgress == 5)
        {
            levelProgress++;
        }
    }

    collision (tempItem) {
        if (!tempItem.ritualBegun && interactKey.isDown && tempItem.checkBeginRitual()) {
            tempItem.ritual();
            tempItem.ritualBegun = true; 
        } 
    }
}

/* Portal 
 * Required parameters: x, y, portalMap.
 * Optional parameters: spawnAfterSpiderFlower, spawnAfterBossBattle, spawnAfterTalkAetios, 
    spawnAfterMeetAetios, spawnAfterPlow, spawnAfterRitual
 */
class portal extends Phaser.GameObjects.Sprite {
    constructor (parameter) {
        //Create the object. 
        super(createThis, parameter.x, parameter.y, 'portalSprite');
        createThis.physics.world.enable(this);
        createThis.add.existing(this);
        this.portalMap = parameter.portalMap; 
        this.body.allowGravity = false;
        this.setDepth(-45);

        if (typeof parameter.spawnAfterBossBattle !== 'undefined') {
            this.spawnAfterBossBattle = parameter.spawnAfterBossBattle;
        } else {
            this.spawnAfterBossBattle = false; 
        }

        if (typeof parameter.spawnAfterSpiderFlower !== 'undefined') {
            this.spawnAfterSpiderFlower = parameter.spawnAfterSpiderFlower;
        } else {
            this.spawnAfterSpiderFlower = false; 
        }

        this.spawnAfterMeetAetios = (typeof parameter.spawnAfterMeetAetios !== 'undefined' && (levelProgress < 2));
        
        if (typeof parameter.spawnAfterTalkAetios !== 'undefined'&& (levelProgress < 4)) {
            this.spawnAfterTalkAetios = true;
            this.spawnAfterTalkAetiosWaiting = true; 
        } else {
            this.spawnAfterTalkAetios = false; 
            this.spawnAfterTalkAetiosWaiting = false; 
        }

        if (typeof parameter.spawnAfterRitual !== 'undefined'&& (levelProgress < 6)) {
            this.spawnAfterRitual = parameter.spawnAfterRitual;
            this.remainingPortals = ritualItemCount;
        } else {
            this.spawnAfterRitual = false; 
        }

        if (typeof parameter.spawnAfterPlow !== 'undefined'&& (levelProgress < 4)) {
            this.spawnAfterPlow = true;
        } else {
            this.spawnAfterPlow = false; 
        }

        this.activePortal = !(this.spawnAfterBossBattle || this.spawnAfterSpiderFlower || this.spawnAfterTalkAetios 
            || this.spawnAfterMeetAetios);

        //Collision detection between the player and item. 
        createThis.physics.add.overlap(this, player, this.collision);
    }

    collision (tempPortal){
        portalMap = tempPortal.portalMap;
    }
    
    dialogueUpdate() {
        if (typeof dialogue !== 'undefined' && 
            typeof dialogue[currentDialogue]._SPAWNAFTERTALKAETIOS !== 'undefined') {
            this.spawnAfterTalkAetiosWaiting = false;
        }
        if (typeof dialogue !== 'undefined' && 
            typeof dialogue[currentDialogue]._SPAWNAFTERMEETAETIOS !== 'undefined') {
            if (levelProgress == 1)
            {
                levelProgress++;
            }
        }
    }

    update (){
        var tempPortalActive = true; 
        
        

        if (tempPortalActive && this.spawnAfterSpiderFlower) {
            tempPortalActive = spiderFlowerPickedUp; 
        } 

        if (tempPortalActive && this.spawnAfterBossBattle) {
            tempPortalActive = (activeBosses <= 0); 
        } 
        
        if (tempPortalActive && this.spawnAfterTalkAetios && this.spawnAfterTalkAetiosWaiting) {
            tempPortalActive = false;
        }

        if (tempPortalActive && this.spawnAfterMeetAetios) {
            tempPortalActive = false;
        }

        if (tempPortalActive && this.spawnAfterRitual) {
            tempPortalActive = (this.remainingPortals <= 0);
        }

        if (tempPortalActive && this.spawnAfterPlow && levelProgress < 4) {
            tempPortalActive = false;
        }

        if (tempPortalActive) {
            this.activePortal = true; 
            this.alpha = 1; 
        } else {
            this.activePortal = false; 
            this.alpha = 0; 
        }

        if (this.spawnAfterSpiderFlower && this.spawnAfterBossBattle && levelProgress == 2)
        {
            levelProgress++;
        }
    }
}

/* Plow 
 * Required parameters: x, y. 
 */
class plowItem extends Phaser.GameObjects.Sprite {
    constructor(parameter){
        super(createThis, parameter.x, parameter.y, 'plowSprite');
        createThis.physics.world.enable(this);
        createThis.add.existing(this);
        this.body.allowGravity = false;
        this.setDepth(-45);
        this.stuck = false; 
    }     

    update() {
        for (i = 0; i < enemyCount; i++){
            if(enemies[i].body !== undefined)
            {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), enemies[i].getBounds()) && 
                    enemies[i].body.velocity.x < 0 && 
                    (enemies[i].x + 100) < this.x) {
                    this.x -= 5;
                }
            }
        }
        
        if (this.x < 250) {
            this.stuck = true;
        } 
    }
}

//Run the update() function of each portal in the level.
function portalUpdate() {
    for (i = 0; i < portalCount; i++) {
        portals[i].update();
    }
}

//allows the user to store item in bag if it is not full
function pickUpItem(tempItem){
    if(bagInventory.length < bagSize) {
        var item = { "Description": tempItem.description, "ItemName": tempItem.itemName, "ItemType":tempItem.itemType, "Attribute":tempItem.attributeNumber,"BagImage":tempItem.bagImage };
        bagInventory.push(item);
        tempItem.destroy();
    }else{
        //todo: the bag is full, display a message to let the player know they need to drop/ use something to empty a spot.
        console.log('bag is full, drop or use a held item to add this item.');
    }
}

//used to remove bag item.
function removeBagItem(itemIndex){
    bagInventory.splice(itemIndex,1);
    game.scene.run('UIS');
}

//used to consume the bag item
function useBagItem(itemIndex){
    //determine which type of items can be consumed through a new attribute and what they do.
    var tempBagItem = bagInventory[itemIndex];

    var attributeNumber = parseInt(tempBagItem.Attribute);
    var itemType = tempBagItem.ItemType;
    var itemUsed = false;
    switch (itemType) {
        case 'healing':
            playerHeal(attributeNumber);
            itemUsed = true;
            break;
        default:
            //do nothing if it doesn't fall under one of the above
            break;
    }

    //when consumed delete the item from inventory.
    if(itemUsed){
        removeBagItem(itemIndex);
    }

}

/* Test item for tutorial level/inventory test.
 * Required parameters: x, y
 */
class testItem extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y,
            key: 'testItemSprite',
            gravity: false,
            itemName: 'Chicken Leg',
            itemType: 'healing',
            description: 'Can be consumed to heal 10 damage',
            attributeNumber: 10,
            bagImage: 'testItemSprite'
        })

    }

    collision (tempItem){
        // wrap in a item pickup button function and handle only if item has extra attribute allowing pickup.
        if(interactKey.isDown){
            pickUpItem(tempItem);
        }
    }
}

class healthPotion extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y,
            key: 'healthPotion',
            gravity: false,
            itemName: 'potion',
            itemType: 'healing',
            description: 'Can be consumed to heal 100 damage',
            attributeNumber: 100,
            bagImage: 'healthPotion'
        })

    }

    collision (tempItem){
        // wrap in a item pickup button function and handle only if item has extra attribute allowing pickup.
        if(interactKey.isDown){
            pickUpItem(tempItem);
        }
    }
}


//coins 
class coin extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'coinSprite', 
            gravity: false
        })
        this.anims.play('spin', true);


    }

    collision (tempItem){
        currentCoins=currentCoins+1;
         playcoinsound=true;
        tempItem.destroy();
    }
}

class smallExp extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'smallExp', 
            gravity: false
        })

    }

    collision (tempItem){
        currentXP+=500;
        playcoinsound=true;
        tempItem.destroy();
    }
}

class levelUp extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'levelUp', 
            gravity: false
        })

    }

    collision (tempItem){
        currentXP=XPtillNextLvl;
        playcoinsound=true;
        tempItem.destroy();
    }
}

class diamond extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'diamond', 
            gravity: false
        })

    }

    collision (tempItem){
        playcoinsound=true;
        currentCoins+=10;
        tempItem.destroy();
    }
}

class fire extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'fire', 
            gravity: false
            
            
        })
        this.anims.play('fire', true);
        this.setAlpha(0);
    }

    collision (tempItem){
        if(dragonPhase==2)
        {
            onFire=true;
        }
    }
}

class fountain extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'fountain', 
            gravity: false
            
            
        })

    }

    collision (tempItem){
        onFire=false;
    }
}

class arrowAmmo extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'arrowAmmo', 
            gravity: false
        })

    }

    collision (tempItem){
        numberArrows++;
        tempItem.destroy();
    }
}

class mirror extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'mirror', 
            gravity: false
            
            
        })

    }

    collision (tempItem){
        
        if (medeaPhase>=2){
        player.x=1328;
        player.y=6328;
        }
    }
    

}

class mirror2 extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'mirror', 
            gravity: false
            
            
        })

    }

    collision (tempItem){
        if(medeaPhase>=3){
                player.x=2347;
        player.y=5609;

    }
    }

}

class mirror3 extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'mirror', 
            gravity: false
            
            
        })

    }

    collision (tempItem){
        if(medeaPhase>=3){
        player.x=2100;
        player.y=3600;

    }
    }

}



class cauldron extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x, 
            y: parameter.y,
            key: 'cauldron', 
            gravity: false
            
            
        })

    }
    
    collision (tempItem){
        console.log("Touch the cauldron");
    }
}

class pillar extends itemBase {
    constructor(parameter){
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y,
            key: 'pillar',
            gravity: false
        })
            this.setDepth(-35);
    }

    collision (tempItem){
        console.log("Touch the pillar");
    }
}