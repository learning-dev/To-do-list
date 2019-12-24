const form = document.querySelector('.add-list');
const taskList = document.getElementById('task-list');


function addItemToList(event) {
  event.preventDefault();
  const newTask = form.getElementsByTagName('input');
  const newTaskTag = document.createElement('li');
  const newTaskTextnode = document.createTextNode(newTask[0].value);
  newTaskTag.appendChild(newTaskTextnode);

  taskList.appendChild(newTaskTag);
}

form.addEventListener('submit', addItemToList);
