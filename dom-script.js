const form = document.querySelector('.add-list-form');
const taskList = document.getElementById('task-list');
let localTaskArray;

if (localStorage.getItem('tasks')) {
  localTaskArray = JSON.parse(localStorage.getItem('tasks'));
} else {
  localTaskArray = [];
}

localStorage.setItem('tasks', JSON.stringify(localTaskArray));

// function displayLocaltask() {

//   const li = document.createElement('li');
//   li.
// }


// create delete button
function createDeleteButton() {
  const deleteButton = document.createElement('button');

  deleteButton.className = 'delete-btn';
  deleteButton.appendChild(document.createTextNode('delete'));
  return deleteButton;
}


function addItemToList(event) {
  event.preventDefault();
  const newTask = form.getElementsByTagName('input');
  const newTaskTag = document.createElement('li');
  const newTaskTextnode = document.createTextNode(newTask[0].value);
  newTaskTag.appendChild(newTaskTextnode);

  // delete button
  const deleteButton = createDeleteButton();
  
  newTaskTag.appendChild(deleteButton);
  taskList.appendChild(newTaskTag);
}

function completeTask(event) {
  if (event.target.localName === 'li') {
    const strike = document.createElement('s');
    const text = event.target.textContent.replace('X', '');
    strike.appendChild(document.createTextNode(text));
    const li = document.createElement('li');
    li.appendChild(strike);
    taskList.removeChild(event.target);
    const deletebtn = createDeleteButton();
    li.appendChild(deletebtn);
    taskList.appendChild(li);
  }
}


function removeItemFromList(event) {
  if (event.target.classList.contains('delete-btn')) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure want to delete the task?')) {
      const task = event.target.parentElement;
      taskList.removeChild(task);
      console.log('inside delete');
    }
  }
}

// Event Listeners
form.addEventListener('submit', addItemToList);
taskList.addEventListener('click', removeItemFromList);
taskList.addEventListener('click', completeTask);
