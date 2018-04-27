document.addEventListener('DOMContentLoaded', () => {
  // your solution here
  // grab DOM elements
  const listDiv = document.getElementById("app-content");
  const body = document.querySelector("body");
  // const app = new TaskLister();

  let listForm = document.getElementById("create-list-form");

  listForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // makes a list container to hold categories
    const listInput = document.getElementById("new-list-title").value;
    const newListContainer = document.createElement("div");
    newListContainer.setAttribute("id", "lists");
    const newList = document.createElement("div")
    const listTitle = document.createElement("h2")
    listTitle.innerText = listInput;
    newList.appendChild(listTitle);
    newListContainer.append(newList);
    listDiv.append(newListContainer);

    // makes a new form for our tasks
    const newFormContainer = document.createElement("div");
    const newForm = document.createElement("form");
    newForm.setAttribute("id", "create-task-form")
    newForm.innerHTML = "<label for='parent-list'>Select List:</label> <select id='parent-list'> <option value='My Dank List' selected> My Dank List </option></select>";
    newFormContainer.append(newForm);
    body.append(newForm);
  });
});
