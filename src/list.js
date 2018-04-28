const titles = []

class List {
  // your code here

  constructor(title){
    this.title = title
    this.tasks = []

    titles.push(title)
  }
}

List.titles = function(){
  return titles
}
