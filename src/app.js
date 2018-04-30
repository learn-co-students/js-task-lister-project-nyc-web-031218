document.addEventListener('DOMContentLoaded', () => {

  const appContainer = document.getElementById('app-content')

  let titles = []

  let taskEvent = false

  const newListForm = document.getElementById('create-list-form')

  newListForm.addEventListener('submit', (event) => {

    if (!document.getElementById("detail")) {

      event.preventDefault()

      const detailsForm = document.createElement('div')
      detailsForm.setAttribute("id", "detail")

      detailsForm.innerHTML = `
        <form id="create-details-form" action="#" method="post">
         <label for="options">Select List:</label>
         <select required type="text" id="options"></select>
         <label for="new-details-description">Task Description:</label>
         <input required type="text" id="new-details-description" name="new-details-description" placeholder="description">
         <label for="new-priority-level">Priority Level:</label>
         <input required type="text" id="new-priority-level" name="new-priority-level" placeholder="priority">
         <input type="submit" value="Create New Task">
        </form>
      `
      appContainer.appendChild(detailsForm)

    }

    titles.push(document.getElementById("new-list-title").value)

    const sel = document.getElementById('options');
    const opt = document.createElement('option');
    opt.innerHTML = titles.slice(-1)[0];
    opt.value = titles.slice(-1)[0];
    sel.appendChild(opt);

    const getDetails = document.getElementById('create-details-form')

    if (getDetails) {

      if (taskEvent !== true) {

        getDetails.addEventListener('submit', function(event) {
          event.preventDefault()
          let title2 = document.getElementById(document.getElementById("options").value)
          const description = document.createElement('p')
          description.innerHTML = 'Task: ' + document.getElementById('new-details-description').value
          const priority = document.createElement('p')
          priority.innerHTML = 'Priority: ' + document.getElementById('new-priority-level').value
          title2.appendChild(description)
          title2.appendChild(priority)
          })

      taskEvent = true

      }
    }
  })

  newListForm.addEventListener('submit', function (event) {

    event.preventDefault()

    if (!document.getElementById("lists")) {

      const allLists = document.createElement('div')
      allLists.setAttribute("id", "lists")

      const newList = document.createElement('div')
      newList.setAttribute("id", document.getElementById("new-list-title").value)
      newList.innerHTML = `<h2>${document.getElementById("new-list-title").value}</h2>`

      allLists.appendChild(newList)
      appContainer.appendChild(allLists)
    }

    else {

      const currentLists = document.getElementById("lists")
      const newList = document.createElement('div')
      newList.setAttribute("id", document.getElementById("new-list-title").value)
      newList.innerHTML = document.getElementById("new-list-title").value


      currentLists.appendChild(newList)


    }
  })

});
