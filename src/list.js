let listId = 0

class List {
  constructor(name) {
    this.id = ++listId
    this.name = name
    store['lists'].push(this)
  }

  static findByName(name) {
    return store['lists'].find( list => list.name === name )
  }

  tasks() {
    return store['tasks'].filter( task => task.listId === this.id )
  }

  render() {
    // create div to hold elements of the list
    const newList = document.createElement("div")
    newList.setAttribute("id", `list-id-${this.id}`)

    // create h2 element to hold title of list and append to new list div
    const listTitle = document.createElement("h2")
    listTitle.innerText = `${this.name} `

    // create button to delete
    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("data-title", `${this.name}`)
    deleteButton.setAttribute("class", "delete-list")
    deleteButton.innerText = "X"

    deleteButton.addEventListener('click', (event) => {
      // remove from options
      document.querySelector(`option[value="${this.name}"]`).remove()

      // remove entire list
      document.getElementById(`list-id-${this.id}`).remove()

      // remove list from store
      const indexInStore = store['lists'].indexOf(this)
      store['lists'].splice(indexInStore, 1)

      // remove all list's tasks from store
      this.tasks().forEach( (task) => {
        const taskIndex = store['tasks'].indexOf(task)
        store['tasks'].splice(taskIndex, 1)
      })

      // removes task form if there we remove the only remaining list
      if (store['lists'].length === 0) {
        document.getElementById('create-task-form').remove()
        document.getElementById('lists').remove()
      }
    })

    const ul = document.createElement("ul")

    listTitle.append(deleteButton)
    newList.append(listTitle, ul)

    return newList
  }
}
