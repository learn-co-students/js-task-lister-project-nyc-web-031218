let taskId = 0

class Task {
  constructor(description, priority, list) {
    this.id = ++taskId
    this.description = description
    this.priority = priority
    this.listId = list.id
    store['tasks'].push(this)
  }

  list() {
    return store['lists'].find( list => list.id === this.listId )
  }

  render() {
    const taskLi = document.createElement("li")
    taskLi.setAttribute("id", `task-id-${this.id}`)

    const deleteTaskButton = document.createElement("button")
    deleteTaskButton.innerText = "X"
    deleteTaskButton.setAttribute("data-list-title", `${this.list().name}`)
    deleteTaskButton.setAttribute("data-task-title", `${this.description}`)
    deleteTaskButton.setAttribute("class", "delete-task")

    taskLi.innerHTML = `Task: ${this.description} `
    taskLi.append(deleteTaskButton)
    taskLi.innerHTML += `<br>Priority: ${this.priority}`

    return taskLi
  }
}
