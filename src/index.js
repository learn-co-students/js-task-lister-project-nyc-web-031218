let store = {
  lists: [],
  tasks: []
}
let listId = 0
let taskId = 0

document.addEventListener('DOMContentLoaded', () => {

  // Set the varaibles we want to start with
  let listForm = document.getElementById('create-list-form')
  let listInput = document.getElementById('new-list-title')
  let listButton = document.querySelectorAll('#create-list-form input')[1]
  let listInputValue = listInput.value
  let listDiv = document.getElementById("app-content")
  let deleteList = document.querySelectorAll('.delete-list')
  let taskForm = document.getElementById('create-task-form')
  let lists = List.All()
  let taskEvent = false

  // As we add elements to the page, we need to update values
  let updateDomValues = () => {
    console.log('updating DOM values');
    taskForm = document.getElementById('create-task-form')
    // taskForm.addEventListener('click', function() {
    // })

    deleteList = document.querySelectorAll('.delete-list')
    console.log("delete lists", deleteList);
    if (deleteList) {
      deleteList.forEach(item => {
        console.log('delete list item', item);
        item.addEventListener('click', function(){
          let listStringID = this.getAttribute('data-title')
          //console.log("list string ID", listStringID);
          let listID = listStringID.split("List")[1]
          //console.log("list ID", listID);
          let listToRemove = document.getElementById(listStringID)
          console.log("list to remove", listToRemove);
          let listObj = store["lists"].find(list => list.id === listID)
          listToRemove.remove()
          List.Destroy(listObj)
          formSelect()
          updateDomValues()
        })
      })
    }
    taskList = document.querySelectorAll('.delete-task')
    if (taskList) {
      taskList.forEach(item => {
        item.addEventListener('click', function(){
          let taskStringID = this.getAttribute('id')
          let taskID = taskStringID.split("TaskButton")[1]
          let taskToRemove = document.getElementById(taskStringID)
          let taskObj = store["tasks"].find(task => task.id === taskID)
          taskToRemove.remove()
          Task.Destroy(taskObj)
        })
      })
    }
    // if (deleteList.length === 0) {
    //   taskForm.remove()
    // }
  }

  // this is just creating a container for Lists in app-container
  let createListsDiv = () => {
    if (!document.getElementById('lists')) {
      let createListsDiv = document.createElement('div')
      createListsDiv.setAttribute('id', "lists")
      listDiv.append(createListsDiv)
      console.log("Created the container div for lists");
    }
  }

  // this is creating each list with the passed in values
  let createList = (list) => {
    let listDiv = document.createElement('div')
    console.log("this", list)
    listDiv.setAttribute('id', `List${list.id}`)
    const createListTemplate = `
    <h2>${list.title}
    <button data-title="List${list.id}" class="delete-list">X</button>
    </h2>
    <ul id="List${list.id}"></ul>`;
    listDiv.innerHTML = createListTemplate
    console.log("listDiv", listDiv)
    let listsDiv = document.getElementById('lists')
    listsDiv.append(listDiv)
  }

  // create the task form if it doesn't exist
  let createTaskForm = () => {
    if (!document.getElementById('create-task-form')) {
      let taskForm = document.createElement('div')
      taskForm.setAttribute('id', 'create-task-form')
      const taskFormTemplate = `
      <form id="create-task-form">
        <label for="parent-list">Select List:</label>
        <select id="parent-list"></select>
        <label for="new-task-description">Task description:</label>
        <input required type="text" id="new-task-description" placeholder="description">
        <label for="new-task-priority">Priority level:</label>
        <input type="text" id="new-task-priority" placeholder="priority">
        <input type="submit" value="Create New Task">
      </form>`;
      taskForm.innerHTML = taskFormTemplate
      listDiv.append(taskForm)
    }
  }

  // grab all the values for the form select options
  function formSelect() {
    lists = List.All()
    let listOptions = ""
    lists.forEach(list => {
      if (list === lists[0]) {
        listOptions += `<option value="${list}" selected>${list}</option>`
      } else {
        listOptions = listOptions + `<option value="${list}">${list}</option>`
      }
    })
    let listSelect = document.getElementById('parent-list')
    listSelect.innerHTML = listOptions
  }

  function updateFormSelect () {
    lists = List.All()
    let listOptions = ""
    lists.forEach(list => {
      if (list === lists[0]) {
        listOptions += `<option value="${list}" selected>${list}</option>`
      } else {
        listOptions = listOptions + `<option value="${list}">${list}</option>`
      }
    })
    let listSelect = document.getElementById('parent-list')
    listSelect.innerHTML = listOptions
  }

  function createTask(task) {
    console.log("beggingin of the create task function", task);
    let taskLi = document.createElement('li')
    taskLi.setAttribute('id', `Task${task.id}`)
    taskLi.setAttribute('class', `task`)
    //debugger
    let list = Task.findListById(task.listId)
    console.log(list);
    console.log(list.title);
    const taskTemplate = `
    Task: ${task.description}
        <button data-list-title="${list.title}" data-task-name="${task.description}" id="TaskButton${task.id}" class="delete-task">
            X
        </button>
        <br>
        Priority: ${task.priority}
    `;
    taskLi.innerHTML = taskTemplate
    console.log("the task's list id", task.listId);
    console.log(`list${task.listId}`);
    let taskUl = document.getElementById(`List${task.listId}`)
    console.log("this parent list ul", taskUl);
    taskUl.append(taskLi)
    updateDomValues()
  }

  function addTaskEvent () {
    let taskForm = document.getElementById('create-task-form')
    if (taskEvent !== true) {
      taskForm.addEventListener('submit', function(event){
        event.preventDefault()
        let selectList = document.getElementById('parent-list')
        console.log("selectList", selectList);
        let selectedItem = selectList.options[selectList.selectedIndex].text;
        console.log("selectedItem", selectedItem);
        let taskDescription = document.getElementById('new-task-description')
        let taskDescriptionValue = taskDescription.value
        console.log("taskDescription", taskDescription);
        let taskPriority = document.getElementById('new-task-priority')
        let taskPriorityValue = taskPriority.value
        console.log('taskPriority', taskPriority);
        let list = List.findByName(selectedItem)
        console.log("list obj", list);
        let newTask = new Task (taskDescriptionValue, taskPriorityValue, list)
        console.log("task", newTask)
        if (newTask) {
          createTask(newTask)
        }
        taskDescription.value = ""
        taskPriority.value = ""
      })
    taskEvent = true
    }
  }

  // our event listener for creating a list
  listForm.addEventListener('submit', function(event) {
    event.preventDefault()
    let listInputValue = listInput.value
    let newList = new List(listInputValue)

    // run all the functions to create
    createTaskForm()
    createListsDiv()
    createList(newList)
    formSelect()
    addTaskEvent()
    updateDomValues()
    listInput.value = ""
  })

  // CONSOLE LOGS
  // console.log("list form", listForm)
  // console.log("list input", listInput)
  // console.log("list button", listButton)
  // console.log("list input value", listInputValue)
  // console.log("store", store["data"])

  //const app = new TaskLister();

});
