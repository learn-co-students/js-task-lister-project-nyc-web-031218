document.addEventListener('DOMContentLoaded', () => {
  const createListForm = document.querySelector('#create-list-form')

  createListForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let text = document.querySelector('#new-list-title').value
    // console.log(text)
    let newList = new List(text);
  })


  const listDiv = document.getElementById("app-content");

  // const app = new TaskLister();
});
