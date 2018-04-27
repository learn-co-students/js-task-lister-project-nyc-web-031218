listId = 0

class List {
  constructor(title){
    this.title = title
    this.id = listId++
     // () => {
    const appContainer = document.getElementById('app-content')
    const listContainer = document.createElement('div')
    listContainer.setAttribute("id", "lists")
    const newList = document.createElement('div')
    newList.innerHTML = `<h2>${this.title}</h2>`
    listContainer.appendChild(newList)
    appContainer.appendChild(listContainer)
    // }


  }
}

//   <div id="lists">
// <!-- begin list 1 -->
//   <div>
//     <h2>doughnuts
//       <button data-title="doughnuts" class="delete-list">
//         X
//       </button>
//     </h2>
//
//     </ul>
//   </div>
// <!--end list 1  -->
//   // your code here
// }
// <ul>
//     <li>
//     Task: mocha
//     <button data-list-title="doughnuts" data-task-name="mocha" class="delete-task">
//         X
//     </button>
//     <br>
//     Priority: low
//   </li>
//   <li>
//     Task: chocolate
//     <button data-list-title="doughnuts" data-task-name="chocolate" class="delete-task">
//       X
//     </button>
//     <br>
//     Priority: high
//   </li>
// </ul>
