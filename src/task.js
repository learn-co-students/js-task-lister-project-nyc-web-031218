class Task {
  constructor(description, priority = low, list) {
    this.id = taskId++
    this.description = description
    this.priority = priority
    this.listId = list.id

    store["tasks"].push(this)
  }
}

Task.findListById = function (listId) {
  let list = store["lists"].find(item => {return item.id === listId})
  console.log(list);
  return list
}

Task.Destroy = function (task) {
  //console.log("store", store["lists"]);
  let taskIndex = store["task"].indexOf(task)
  //console.log(listIndex)
  store["tasks"].splice(taskIndex, 1)
  //console.log("store", store["lists"]);
}
