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

function setToEmptyQuest(){
   var emptyQuest = new questClass("Empty Quest");
   emptyQuest.questName = "No current quest";
   emptyQuest.questGiver = "-";
   emptyQuest.questState = "-";
   emptyQuest.questCompletionTime = "-";
   emptyQuest.questDescription = "-";
   emptyQuest.rewardType = "-";
   emptyQuest.reward = "-";
   emptyQuest.completionRewardText = "-";
   currentQuest = emptyQuest;
}

function completeCurrentQuest(){
   
    /**For item based quest rewards 
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
   **/ 
    
    //If the tutorial quest is complete reward the player 
    if(tutorialQuestComplete==true)
    {
        if(questLooper<=0)
        {
            currentCoins += 50;
            playcoinsound = true;  
            tutorialQuestComplete = false; 
            questLooper += 1;    
        }       
   }
    
   //If the centaur plains quest is complete reward the player 
   if(centaurQuestComplete==true)
   {
      if(questLooper2<=0)
      {
         currentCoins += 200; 
         currentXP += 1000; 
         centaurQuestComplete = false;    
         playcoinsound = true; 
         questLooper2 += 1; 
      }   
   }

       
   setToEmptyQuest();
}

