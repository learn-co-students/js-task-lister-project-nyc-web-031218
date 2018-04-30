class List {
  constructor(title) {
    this.id = listId++
    this.title = title

    store["lists"].push(this)
  }
  tasks() {
    return store["tasks"].filter(task => {
      // console.log("list", this, this.id)
      // console.log("task", task, task.listId)
      // console.log("eval", task.listId === this.id)
      return task.listId === this.id
    })
  }
}

List.All = function() {
  let lists = store["lists"].map(list => list.title)
  return lists.reverse()
}

List.Destroy = function (list) {
  console.log("store", store["lists"]);
  let listIndex = store["lists"].indexOf(list)
  console.log(listIndex)
  store["lists"].splice(listIndex, 1)
  console.log("store", store["lists"]);
}

List.findByName = function (title) {
  return store["lists"].find(item => {return item.title === title})
}
