let taskId = 0
// const store = {tasks: []}

class Task {
  constructor(parentListId, desc, priority){
    this.parentListId = parentListId
    this.desc = desc
    this.priority = priority
    this.id = taskId++
    store.tasks.push(this.id)

    const listContainer = document.querySelector(`[name=\"${this.parentListId}\"] ul`)
    // listContainer.setAttribute("id", "lists")
    const newTaskEntry = document.createElement('li')
    newTaskEntry.setAttribute('task-id', `${this.id}`)
    newTaskEntry.innerHTML = `Task: ${this.desc}
            <button data-list-title=\"${this.id}\" data-task-name=\"$this.desc}\" class=\"delete-task\">
              X
            </button>
            <br>
            Priority: high`;
    // appContainer.appendChild(listContainer)
    listContainer.appendChild(newTaskEntry)

    const deleteButton = newTaskEntry.querySelector('.delete-task')
    deleteButton.addEventListener('click', (e) =>
      // e.preventDefault()
      this.delete()
    )


    // const listSelector = document.querySelector('#parent-list')
    // const newListOption = document.createElement('option')
    // newListOption.setAttribute("value", this.id)
    // newListOption.innerText = this.title
    // listSelector.appendChild(newListOption)
    // // }


  }
  delete(){
    // const listContainer = document.querySelector(`[name=\"${this.parenListId}\"]`)
    const taskEntry = document.querySelector(`[task-id=\"${this.id}\"]`)
    taskEntry.remove()
  }
}
