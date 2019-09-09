/**Each instance of questClass represents one quest along with its data (Name,giver,state,completion time,description and completion reward object if given.)**/
class questClass
{
   constructor(questName) 
   {
      this.questName;
      this.questGiver;
      this.questState; 
      this.questCompletionTime;
      this.questDescription;
      //completion reward should be set to same structure as pickup item and pushed using bagInventory.push(currentQuest.completionReward) if there is space in the bag
      this.completionRewardText;
      this.rewardType;
      this.reward;
   }     
}

/**Test quest object for debugging purposes
myQuest = new questClass("Quest 1");
myQuest.questName = "Test"; 
**/

//Called every frame to keep quest GUI element up to date 
function updateQuestBox() 
{
    console.log("Update routine here");
    
    //this.add.text(this.game.renderer.width *.09, this.game.renderer.height * 0.10,"TestQuest");
}

function setToEmptyQuest(){
   var emptyQuest = new questClass("Empty Quest");
   emptyQuest.questName = "No current quest";
   emptyQuest.questGiver = "-";
   emptyQuest.questState = "-";
   emptyQuest.questCompletionTime = "-";
   emptyQuest.questDescription = "Find a new quest.";
   emptyQuest.rewardType = "";
   emptyQuest.reward = "";
   emptyQuest.completionRewardText = "Complete quests for rewards";
   currentQuest = emptyQuest;
}

function completeCurrentQuest(){
   if(currentQuest.questName !== 'No Quest Assigned'){

      //if the current quest object is not empty quest
      if(currentQuest.rewardType === 'coins'){
         var rewardCoins = currentQuest.reward;
         currentCoins += rewardCoins;
         playcoinsound = true;
      }else if(currentQuest.rewardType === 'item'){
         //todo: add logic for item pickup if there is space in the inventory to do so.
      }

   }
   setToEmptyQuest();
}

