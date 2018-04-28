let listId = 0
const store = {lists: []}

class Task {
  constructor(parentListId, desc, priority){
    this.title = title
    this.id = listId++
    store.lists.push(this.id)
     // () => {
    // const appContainer = document.getElementById('app-content')
    const listContainer = document.getElementById('lists')
    // listContainer.setAttribute("id", "lists")
    const newList = document.createElement('div')
    newList.innerHTML = `<h2>${this.title}</h2>`
    // appContainer.appendChild(listContainer)
    listContainer.appendChild(newList)


    const listSelector = document.querySelector('#parent-list')
    const newListOption = document.createElement('option')
    newListOption.setAttribute("value", this.id)
    newListOption.innerText = this.title
    listSelector.appendChild(newListOption)
    // }


  }
  // your code here
}
