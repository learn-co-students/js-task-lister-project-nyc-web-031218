const descriptions = {}

class Task {
  // your code here
  constructor(list, description, priority){
    this.list = list
    this.description = description
    if(priority){
      this.priority = priority
    } else {
      this.priority = "low"
    }

    descriptions[list] = description
  }
}

Task.descriptions = function(){
  return descriptions
}
