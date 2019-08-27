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
      this.completionReward;
   }     
}

/**Test quest object for debugging purposes**/ 
myQuest = new questClass("Quest 1");
myQuest.questName = "Test"; 
