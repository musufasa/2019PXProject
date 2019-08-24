/**Each instance of questClass represents one quest along with its data (Name,giver,state,completion time and description)**/
class questClass
{
   constructor(questName) 
   {
      this.questName; 
      this.questGiver;
      this.questState; 
      this.questCompletionTime; 
      this.questDescription;    
   }     
}

/**Test quest object for debugging purposes**/ 
myQuest = new questClass("Quest 1");
myQuest.questName = "Test"; 
