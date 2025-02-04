//Arrays that store appropriate objects and a corresponding counter.
enemies = []; //Enemy array
enemyCount = 0; //Enemy counter
portals = []; //Portal array
portalCount = 0; //Portal counter
npcs = []; //NPC array
npcCount = 0; //NPC counter
items = []; //Item array
itemCount = 0; //Items counter

//Read through the list of objects in the current map and spawn them. 
function spawnObjects() {
    //Arrays that store appropriate objects and a corresponding counter.
    enemies = []; //Enemy array
    enemyCount = 0; //Enemy counter
    portals = []; //Portal array
    portalCount = 0; //Portal counter
    npcs = []; //NPC array
    npcCount = 0; //NPC counter
    items = []; //Item array
    itemCount = 0; //Items counter

    activeBosses = 0; 
    activeBosses2 = 0; 

    /* Run through the list of objects in the map and spawn the appropriate object. 
     * Object properties (xMove, yMove) and co-ordinates (x, y) are used.  
     */
    mapObjectArray = createThis.map.objects[0].objects;
    for (i = 0; i < mapObjectArray.length; i++){
        /* Reads the properties of the current object and copies them to tempProperties. 
         * This allows a property to be addressed by name (e.g. tempProperties['xMove']) rather than by position. 
         */
        tempProperties = []; 
        if (typeof mapObjectArray[i].properties !== 'undefined') {
            for (j = 0; j < mapObjectArray[i].properties.length; j++) {
                tempProperties[mapObjectArray[i].properties[j].name] = mapObjectArray[i].properties[j].value;
            } 
        }

        //Spawn the appropriate object based on the object name. 
        switch (mapObjectArray[i].name){
            case 'spiderMini': 
                enemies[enemyCount] = new spiderMini({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break; 

            case 'Player Spawn':
                break; 

            case 'medea': 
                npcs[npcCount] = new medeaNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcs[npcCount].displayHeight = 64;
                npcCount++;
                break;

            case 'artemis': 
                npcs[npcCount] = new artemisNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;

            case 'dogs': 
                npcs[npcCount] = new artemisDogNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;

            case 'ritualItem': 
                items[itemCount] = new ritualItemFind({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    inventoryKey: tempProperties['inventoryKey']
                });
                itemCount++; 
                break;

            case 'ritualFire': 
                ritualFireObject = new ritualFire({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                });
                break;

            case 'kingAetios': 
                npcs[npcCount] = new kingAetiosNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;

            case 'Oileus': 
                npcs[npcCount] = new oileusNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;

            case 'Iphiclus': 
                npcs[npcCount] = new iphiclusNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;
                case 'orpheus': 
                npcs[npcCount] = new orpheusNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcs[npcCount].displayHeight = 64;
                npcs[npcCount].displayWidth = 45;
                npcCount++; 
                break;
            case 'spiderBoss': 
                enemies[enemyCount] = new spiderBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    yMove: tempProperties['yMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                spiderBossActive = false; 
                break;

            case 'fox': 
                enemies[enemyCount] = new fox({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;
            case 'fox2': 
                enemies[enemyCount] = new fox2({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                activeBosses2 ++; 
                break;

            case 'snake': 
                enemies[enemyCount] = new snake({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'bats': 
                enemies[enemyCount] = new bats({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y,
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'bullBoss': 
                enemies[enemyCount] = new bullBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'medusaBoss': 
                enemies[enemyCount] = new medusaBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'minotaurBoss': 
                enemies[enemyCount] = new minotaurBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'dragonBoss': 
                enemies[enemyCount] = new dragonBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    yMove: tempProperties['yMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;
                
            case 'newdragonBoss': 
                enemies[enemyCount] = new newdragonBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    yMove: tempProperties['yMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;
                
                case 'medeaCharacterCutscene': 
                enemies[enemyCount] = new medeaCharacterCutscene({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;
                
            case 'spiderFlower': 
                spiderFlower = new spiderFlowerItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                spiderFlowerPickedUp = false; 
                break;

            case 'healthItem': 
                items[itemCount] = new healthItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                itemCount++; 
                break;

            case 'damageIncreaseItem': 
                items[itemCount] = new damageIncreaseItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                itemCount++; 
                break;

            case 'maxHealthItem': 
                items[itemCount] = new maxHealthItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                itemCount++; 
                break;

            case 'crew': 
                crew = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'tempEnemy');
                createThis.physics.add.collider(crew, mapLayer);
                break;

            case 'bonfire':
                bonfire = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'bonfireSprite');
                createThis.physics.add.collider(bonfire, mapLayer);
                break; 

            case 'portal':
                portals[portalCount] = new portal({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    portalMap: tempProperties['portalMap'],
                    spawnAfterSpiderFlower: tempProperties['spawnAfterSpiderFlower'],
                    spawnAfterBossBattle: tempProperties['spawnAfterBossBattle'],
                    spawnAfterTalkAetios: tempProperties['spawnAfterTalkAetios'],
                    spawnAfterMeetAetios: tempProperties['spawnAfterMeetAetios'],
                    spawnAfterPlow: tempProperties['spawnAfterPlow'],
                    spawnAfterRitual: tempProperties['spawnAfterRitual']
                });
                portalCount++;
                break; 
                
                //SIGNS
            case 'signR2C':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'signR2CSprite',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break;
                
            case 'signMarket':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'signMarketSprite', 
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
                
            case 'signShrine':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y,  
                    key: 'signShrineSprite',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
                
            case 'signShrineForest':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y,  
                    key: 'signShrineForestSprite',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
                
            case 'signPalace':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'signPalaceSprite',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break;
                
            case 'signColchisFields':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y,  
                    key: 'signColchisFieldsSprite',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
                
            case 'signRiverCrossing':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'signRiverCrossingSprite',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
                
            case 'signGardenEntrance':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'signGardenEntranceSprite', 
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
                
            case 'signDungeon':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'signDungeonSprite',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
                
            case 'signGardenForest':
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'signGardenForestSprite',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break;
            case 'centaurPlainsSign': 
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'centaurPlainsSign',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
            case 'crittersCreekSign': 
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'crittersCreekSign',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
            case 'marshlandSign': 
                npcs[npcCount] = new signNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    key: 'marshlandSign',
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break; 
                
            
            case 'plow':
                plow = new plowItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                break;
            case 'tutorialEnemy':
                enemies[enemyCount] = new tutorialEnemy({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y,
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++;
                break;
            case 'testItem':
                items[itemCount] = new testItem({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
            case 'coin':
                items[itemCount] = new coin({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
            case 'smallExp':
                items[itemCount] = new smallExp({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
            case 'levelUp':
                items[itemCount] = new levelUp({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;            
            case 'healthPotion':
                items[itemCount] = new healthPotion({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;                      
            case 'diamond':
                items[itemCount] = new diamond({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
            case 'centaurEnemy':
                enemies[enemyCount] = new centaurEnemy({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y,
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break; 
            case 'centaurEnemy2':
                enemies[enemyCount] = new centaurEnemy({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y,
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++;
                activeBosses ++; 
                break; 
                case 'fire':
                items[itemCount] = new fire({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'fountain':
                items[itemCount] = new fountain({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'arrowAmmo':
                items[itemCount] = new arrowAmmo({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'mirror':
                items[itemCount] = new mirror({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'mirror2':
                items[itemCount] = new mirror2({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'mirror3':
                items[itemCount] = new mirror3({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'medeaBoss': 
                enemies[enemyCount] = new medeaBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y,
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;
                case 'cauldron':
                items[itemCount] = new cauldron({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'pillar':
                items[itemCount] = new pillar({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'bush1':
                items[itemCount] = new bush1({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'fleeceTree':
                items[itemCount] = new fleeceTree({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
                case 'ship':
                items[itemCount] = new ship({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
            case 'noFleeceTree':
                items[itemCount] = new noFleeceTree({
                    x: mapObjectArray[i].x,
                    y: mapObjectArray[i].y
                });
                itemCount++;
                break;
        }
}
}
