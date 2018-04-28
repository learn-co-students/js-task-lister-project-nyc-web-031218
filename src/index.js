const store = {tasks: [], lists: []}

document.addEventListener('DOMContentLoaded', () => {
  const createListForm = document.querySelector('#create-list-form')
  const createTaskForm = document.querySelector('#create-task-form')
  // let lists = document.getElementsByClassName("delete-list");

  createListForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let text = document.querySelector('#new-list-title').value
    // console.log(text)
    let newList = new List(text);
  })

  // deleteListForm.addEventListener('submit', function(e) {
  //   e.preventDefault()
  //   let text = document.querySelector('#new-list-title').value
  //   // console.log(text)
  //   let newList = new List(text);
  // })

  createTaskForm.addEventListener('submit', function(e) {
    e.preventDefault()
    // console.log(e)
    let parentListId = document.querySelector('#parent-list').selectedIndex
    let desc = document.querySelector('#new-task-description').value
    let priority = document.querySelector('#new-task-priority').value
    // console.log(desc)
    let newTask = new Task(parentListId, desc, priority);
  })

  let testList = new List("New List")
  new List("Another List")
  new List("One More List")

  const listDiv = document.getElementById("app-content");

  // const app = new TaskLister();
});
