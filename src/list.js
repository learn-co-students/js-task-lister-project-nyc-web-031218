let listId = 0;

class List {
  constructor(name) {
    this.id = ++listId;
    this.name = name;
    store['lists'].push(this);
  }

  static findByName(name) {
    return store['lists'].find( (list) => { return list.name === name; } );
  }

  tasks() {
    return store['tasks'].filter( (task) => { return task.listId === this.id; });
  }

  render() {
    // create div to hold elements of the list
    const newList = document.createElement("div");
    newList.setAttribute("id", `list-id-${this.id}`)

    // create h2 element to hold title of list and append to new list div
    const listTitle = document.createElement("h2");
    listTitle.innerText = `${this.name} `;

    // create button to delete
    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("data-title", `${this.name}`);;
    deleteButton.setAttribute("class", "delete-list");
    deleteButton.innerText = "X";

    deleteButton.addEventListener('click', function(event) {
      document.querySelector(`option[value="${this.name}"]`).remove();
      document.getElementById(`list-id-${this.id}`).remove();

      const indexInStore = store['lists'].indexOf(this)
      store['lists'].splice(indexInStore, 1);

      this.tasks().forEach( (task) => {
        const taskIndex = store['tasks'].indexOf(task);
        store['tasks'].splice(taskIndex, 1);
      });

      if (store['lists'].length === 0) {
        document.getElementById('create-task-form').remove();
        document.getElementById('lists').remove();
      }
    }.bind(this));

    const ul = document.createElement("ul");

    listTitle.append(deleteButton);
    newList.append(listTitle, ul);

    return newList;
  }
}
