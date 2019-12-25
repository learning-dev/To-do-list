/* eslint-disable guard-for-in */
const form = document.querySelector('.add-list-form');
const taskList = document.getElementById('task-list');
let localTaskStore;

if (localStorage.getItem('tasks')) {
  localTaskStore = JSON.parse(localStorage.getItem('tasks'));
} else {
  localTaskStore = {};
}

const setLocally = () => {
  localStorage.setItem('tasks', JSON.stringify(localTaskStore));
};

// create delete button
function createDeleteButton() {
  const deleteButton = document.createElement('button');

  deleteButton.className = 'delete-btn';
  deleteButton.appendChild(document.createTextNode('delete'));
  return deleteButton;
}

function displayLocaltasks() {
  Object.keys(localTaskStore).forEach((task) => {
    const li = document.createElement('li');

    // eslint-disable-next-line no-restricted-syntax

    if (localTaskStore[task] === true) {
      const strike = document.createElement('s');
      strike.appendChild(document.createTextNode(task));
      li.appendChild(strike);
    } else {
      li.appendChild(document.createTextNode(task));
    }
    const delBtn = createDeleteButton();
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
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


  // store locally
  localTaskStore[newTask[0].value] = false;
  setLocally();
}

function completeTask(event) {
  if (event.target.localName === 'li') {
    const strike = document.createElement('s');
    const text = event.target.textContent.replace('delete', '');
    strike.appendChild(document.createTextNode(text));
    const li = document.createElement('li');
    li.appendChild(strike);
    taskList.removeChild(event.target);
    const deletebtn = createDeleteButton();
    li.appendChild(deletebtn);
    taskList.appendChild(li);

    // mark it as complete in local storage
    localTaskStore[text] = true;
    setLocally();
  }
}


function removeItemFromList(event) {
  if (event.target.classList.contains('delete-btn')) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure want to delete the task?')) {
      const task = event.target.parentElement;
      taskList.removeChild(task);

      // remove from local storage
      const text = task.innerText.replace('delete', '');
      delete localTaskStore[text];
      setLocally();
    }
  }
}

// display local items if any
displayLocaltasks();
setLocally();
// Event Listeners
form.addEventListener('submit', addItemToList);
taskList.addEventListener('click', removeItemFromList);
taskList.addEventListener('click', completeTask);
