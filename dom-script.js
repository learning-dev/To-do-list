const form = document.querySelector('.add-list');
const taskList = document.getElementById('task-list');


function addItemToList(event) {
  event.preventDefault();
  const newTask = form.getElementsByTagName('input');
  const newTaskTag = document.createElement('li');
  const newTaskTextnode = document.createTextNode(newTask[0].value);
  newTaskTag.appendChild(newTaskTextnode);

  // delete button
  const deleteButton = document.createElement('button');

  deleteButton.className = 'delete-btn';
  deleteButton.appendChild(document.createTextNode('X'));

  newTaskTag.appendChild(deleteButton);
  taskList.appendChild(newTaskTag);
}


function removeItemFromList(event) {
  if (event.target.classList.contains('delete-btn')) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure want to delete the task?')) {
      const task = event.target.parentElement;
      taskList.removeChild(task);
    }
  }
}


// Event Listeners
form.addEventListener('submit', addItemToList);
taskList.addEventListener('click', removeItemFromList);
