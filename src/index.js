document.addEventListener('DOMContentLoaded', () => {
  // your solution here
  // grab DOM elements
  const mainContentDiv = document.getElementById("app-content");
  const listDiv = document.getElementById('lists');
  const newListForm = document.getElementById("create-list-form");
  const listTitleInput = document.getElementById('new-list-title');

  newListForm.addEventListener('submit', function(event){
    event.preventDefault();

    const title = listTitleInput.value

    if(List.titles().includes(title)){

      alert("titles must be unique")
      return
    }

    const newList = new List(title)
    const newListDiv = document.createElement('div')
    newListDiv.id = `${newList.title}`

    if(listDiv.children.length === 0){
      const newTaskForm = document.createElement('form')
      newTaskForm.id = "create-task-form"
      newTaskForm.innerHTML = `<label for="parent-list">Select List:</label>
          <select id="parent-list">
          </select>

          <label for="new-task-description">Task description:</label>
          <input required="" type="text" id="new-task-description" placeholder="description">

          <label for="new-task-priority">Priority level:</label>
          <input type="text" id="new-task-priority" placeholder="priority">
          <input type="submit" value="Create New Task">
          `
      mainContentDiv.insertBefore(newTaskForm, mainContentDiv.firstChild)

      runNewTaskEventHandler(newTaskForm)
    }

    newListDiv.innerHTML = `
    <h2>${newList.title}
      <button data-title="${newList.title}" class="delete-list">
        X
      </button>
    </h2>
    <br/>
    <ul id = "${newList.title}-ul">
    </ul>
          `

    const selectDropdown = document.getElementById('parent-list')
    const newOption = document.createElement('option')
    newOption.innerText = `${newList.title}`
    newOption.setAttribute('selected', true);
    selectDropdown.appendChild(newOption)

    listDiv.appendChild(newListDiv)

    updateDeleteListEventHandlers()

  })

  function runNewTaskEventHandler(newTaskForm) {
    newTaskForm.addEventListener('submit', function(event){
      event.preventDefault();

      const list = document.getElementById('parent-list').value
      const description = document.getElementById('new-task-description').value

      if(Task.descriptions()[list]){
        if(Task.descriptions()[list].includes(description)){
          alert("descriptions must be unique")
          return
        }
      }

      const priority = document.getElementById('new-task-priority').value

      const newTask = new Task(list, description, priority)
      const taskListUl = document.getElementById(`${list}-ul`)
      const newTaskLi = document.createElement('li')
      newTaskLi.id = `${list}-li`

      newTaskLi.innerHTML = `
      Task: ${description}
      <button data-list-title="${list}" class="delete-task">
        X
      </button>
      <br/>
      Priority: ${priority}
      `
      taskListUl.appendChild(newTaskLi)
      updateDeleteTaskEventHandlers(description)
    })
  }

  function updateDeleteListEventHandlers() {
    const deleteListButtons = document.getElementsByClassName("delete-list")
    const newestDeleteListButton = deleteListButtons.item(deleteListButtons.length - 1)

    newestDeleteListButton.addEventListener('click', function(){
      const listName = newestDeleteListButton.getAttribute("data-title")
      const getList = document.getElementById(`${listName}`)
      const listDiv = document.getElementById('lists');

      listDiv.removeChild(getList);
      const listElement = List.titles().find((title) => title === listName)
      const elementIndex = List.titles().indexOf(listElement)
      List.titles().splice(elementIndex, 1)

      if(listDiv.children.length === 0){
        const mainContentDiv = document.getElementById("app-content");
        const newTaskForm = document.getElementById('create-task-form');
        mainContentDiv.removeChild(newTaskForm);
      }
    })
  }

  function updateDeleteTaskEventHandlers(description){
    const deleteTaskButtons = document.getElementsByClassName("delete-task")
    const newestDeleteTaskButton = deleteTaskButtons.item(deleteTaskButtons.length - 1)

    newestDeleteTaskButton.addEventListener('click', function() {
      const taskName = newestDeleteTaskButton.getAttribute("data-list-title")
      const getLi = document.getElementById(`${taskName}-li`)
      const getUl = document.getElementById(`${taskName}-ul`);

      getUl.removeChild(getLi);

      const listElement = Task.descriptions()[taskName].find((desc) => desc === description)
      const elementIndex = Task.descriptions()[taskName].indexOf(listElement)
      Task.descriptions()[taskName].splice(elementIndex, 1)
    })
  }
});
