let store = { lists: [], tasks: [] }

class TaskLister {
  // makes a form to add tasks to a list
  render() {
    const listDiv = document.getElementById("app-content")
    const listForm = document.getElementById("create-list-form")

    listForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const listInput = document.getElementById("new-list-title").value
      const list = new List(listInput)
      // form for our tasks
      if (store['lists'].length === 1) {
        const newFormContainer = document.createElement("div")
        const newForm = document.createElement("form")
        newForm.setAttribute("id", "create-task-form")
        newForm.innerHTML = `<label for='parent-list'>Select List:</label>
                                <select id='parent-list'>
                                  <option value='${listInput}' selected> ${listInput} </option>
                                </select>
                              <label for='new-task-description'>Task description:</label>
                              <input required type='text' id='new-task-description' placeholder='description'>
                              <label for='new-task-priority'>Priority level:</label>
                              <input type='text' id='new-task-priority' placeholder='priority'>
                              <input type='submit' value='Create New Task'>`
        newFormContainer.append(newForm)
        listDiv.append(newForm)

        // makes a list container to hold lists
        let newListContainer = document.createElement("div")
        newListContainer.setAttribute("id", "lists")
        listDiv.append(newListContainer)
      } else {
        const selectList = document.getElementById("parent-list")
        const newOption = document.createElement("option")
        newOption.value = listInput
        newOption.innerText = listInput
        newOption.selected = true
        selectList.append(newOption)
      }

      // append new list div to list container
      let newListContainer = document.getElementById("lists")
      newListContainer.append(list.render())

      listForm.reset()

      // event listener for adding new tasks
      const createTaskForm = document.getElementById("create-task-form")

      createTaskForm.addEventListener('submit', (event) => {
        event.preventDefault()
        event.stopImmediatePropagation()

        const listSelected = document.getElementById('parent-list').value
        const listObject = List.findByName(listSelected)
        const description = document.getElementById('new-task-description').value
        const priority = document.getElementById('new-task-priority').value

        const task = new Task(description, priority, listObject)

        const listUl = document.querySelector(`#list-id-${listObject.id} ul`)
        listUl.append(task.render())

        const deleteTaskButton = document.querySelector(`[data-task-title="${task.description}"]`)

        deleteTaskButton.addEventListener('click', (event) => {
          const index = store['tasks'].indexOf(task)
          store['tasks'].splice(index, 1)
          document.getElementById(`task-id-${task.id}`).remove()
        })

        createTaskForm.reset()
      })
    })
  }
}
