/* eslint-disable guard-for-in */
const form = document.querySelector('.add-list-form');
const taskList = document.getElementById('task-list');
let todos;

if (localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'));
} else {
  todos = [];
}

const setLocally = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

console.log('localtask', todos);


// create delete button
function createDeleteButton() {
  const deleteButton = document.createElement('button');

  deleteButton.className = 'delete-btn';
  deleteButton.appendChild(document.createTextNode('delete'));
  return deleteButton;
}


function domRefresh() {
  // delete the whole list
  const listElement = document.getElementById('task-list');
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
  // runs a for loop
  todos.forEach((task) => {
    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');

    if (task['status'] === true) {
      const strike = document.createElement('s');
      strike.appendChild(document.createTextNode(task['text']));
      li.appendChild(strike);
    } else {
      li.appendChild(document.createTextNode(task['text']));
    }
    const delBtn = createDeleteButton();
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function addItemToList() {
  const taskText = document.querySelector('input').value;

  todos.push({ text: taskText, status: false });
  localStorage.setItem('todos', JSON.stringify(todos));

  domRefresh();
}

function checkTask(event) {
  if (event.target.localName === 'li') {
    const Tasktext = event.target.innerText.split('\n')[0];

    // mark the task as completed
    todos.forEach((task) => {
      if (task['text'] === Tasktext) {
        task['status'] = true;
      }
    });

    domRefresh();

    // mark it as complete in local storage
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

function uncheckTask(event) {
  if (event.target.localName === 's') {
    const Tasktext = event.target.innerText;

    todos.forEach((task) => {
      if (task['text'] === Tasktext) {
        task['status'] = false;
      }
    });

    domRefresh();

    // mark it as complete in local storage
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}


function removeItemFromList(event) {
  if (event.target.classList.contains('delete-btn')) {

    const Tasktext = event.target.parentElement.innerText.split('\n')[0];

    todos.forEach((task) => {
      if (task['text'] === Tasktext) {
        // get the index and remove it
        const taskIndex = todos.indexOf(task);
        todos.splice(taskIndex, 1);
      }
    });

    domRefresh();

    // mark it as complete in local storage
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

// let draggedItem;

// function dragStart (event) {
//   console.log('drag possible');
//   draggedItem = event.
//   console.log('current Item', draggedItem);
// }

// function dragEnd (event) {
//   if (draggedItem !== this) {
//     console.log(draggedItem);
//     console.log(this);
//   }
//   console.log('inside dragend');
// }


// function dragOver (event) {
//   console.log('drag Over');
//   event.preventDefault();
// }

// function dragEnter () {
//   console.log('drag Over');
//   event.preventDefault();
// }

// function drop(event) {
//   if (draggedItem !== this) {
//     console.log(draggedItem);
//     console.log(this);
//     console.log(event);
//   }
//   console.log('inside drop');
// }


// display local items if any
domRefresh();
setLocally();
// Event Listeners
form.addEventListener('submit', addItemToList);
taskList.addEventListener('click', removeItemFromList);
taskList.addEventListener('click', checkTask);
taskList.addEventListener('click', uncheckTask);


// taskList.addEventListener('dragstart', dragStart);
// taskList.addEventListener('dragend', dragEnd);
// taskList.addEventListener('dragover', dragOver);
// taskList.addEventListener('dragenter', dragEnter);
// taskList.addEventListener('drop', drop);
