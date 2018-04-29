let listId = 0;

class List {
  constructor(name) {
    this.id = ++listId;
    this.name = name;
    store['lists'].push(this);
  }

  tasks() {
    
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

    deleteButton.addEventListener('click', function() {
      // const button = document.querySelector(`[data-title=${this.name}]`)
      document.querySelector(`option[value=${this.name}]`).remove();
      document.getElementById(`list-id-${this.id}`).remove();

      const indexInStore = store['lists'].indexOf(this)
      store['lists'].splice(indexInStore, 1);

      if (store['lists'].length === 0) {
        document.getElementById('create-task-form').remove();
      }
    }.bind(this));

    listTitle.append(deleteButton);
    newList.append(listTitle);

    return newList;
  }
}
