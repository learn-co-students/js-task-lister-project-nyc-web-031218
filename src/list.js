let listId = 0
// const store = {lists: []}

class List {
  constructor(title){
    this.title = title
    this.id = listId++
    store.lists.push(this)
     // () => {
    // const appContainer = document.getElementById('app-content')
    const listContainer = document.getElementById('lists')
    // listContainer.setAttribute("id", "lists")
    const newList = document.createElement('div')
    newList.className = "list"
    newList.setAttribute("id-name", this.id)
    newList.innerHTML = `<h2>${this.title}
    <button data-title="${this.title}" class="delete-list">
      X
    </button></h2>`;
    // appContainer.appendChild(listContainer)
    listContainer.appendChild(newList)

    const deleteButton = newList.querySelector('.delete-list')
    deleteButton.addEventListener('click', (e) =>
      // e.preventDefault()
      this.delete()
    )

    const newUl = document.createElement('ul')
    newList.appendChild(newUl)

    const listSelector = document.querySelector('#parent-list')
    const newListOption = document.createElement('option')
    newListOption.setAttribute("value", this.id)
    // newListOption.setAttribute("id", this.id)
    newListOption.innerText = this.title
    listSelector.appendChild(newListOption)
    // }
  }
  tasks(){
    return store.tasks.filter( task =>
      task.parentListId === this.id
    )
  }

  delete(){
    const tasks = this.tasks()
    tasks.forEach(task => task.delete())
    const listContainer = document.querySelector(`[id-name=\"${this.id}\"]`)
    listContainer.remove()
    // const listSelector = document.querySelector('#parent-list')
    const listOption = document.querySelector(`select option[value=\"${this.id}\"]`)
    listOption.remove()

  }
}
