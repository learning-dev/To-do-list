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
console.log('localtask', localTaskStore);


// create delete button
function createDeleteButton() {
  const deleteButton = document.createElement('button');

  deleteButton.className = 'delete-btn';
  deleteButton.appendChild(document.createTextNode('delete'));
  return deleteButton;
}


// function addItem(){
//   todos.push({text: "something", status: false})
//   localStorage.setItem(todos, todos)
//   domRefresh()

// }

function domRefresh() {
  // delete the whole list
  const listElement = document.getElementById('task-list');
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
  // runs a for loop
  Object.keys(localTaskStore).forEach((task) => {
    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');

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

  const taskText = document.querySelector('input').value;
  console.log('text', taskText);

  localTaskStore[taskText] = false;
  localStorage.setItem('tasks', JSON.stringify(localTaskStore));

  domRefresh();

}

function checkTask(event) {
  if (event.target.localName === 'li') {
    const strike = document.createElement('s');
    const strLength = event.target.textContent.length;
    const text = event.target.textContent.slice(0, strLength - 'delete'.length);
    strike.appendChild(document.createTextNode(text));
    const li = document.createElement('li');
    li.appendChild(strike);
    li.setAttribute('draggable', 'true');
    taskList.removeChild(event.target);
    const deletebtn = createDeleteButton();
    li.appendChild(deletebtn);
    taskList.appendChild(li);

    // mark it as complete in local storage
    localTaskStore[text] = true;
    setLocally();
  }
}

function uncheckTask(event) {
  if (event.target.localName === 's') {
    const text = event.target.innerText;
    const parent = event.target.parentElement;
    parent.setAttribute('draggable', 'true');
    parent.removeChild(event.target);
    const deleteBtn = parent.childNodes[0];
    parent.insertBefore(document.createTextNode(text), deleteBtn);

    // set locally
    localTaskStore[text] = false;
    setLocally();
  }
}


function removeItemFromList(event) {
  if (event.target.classList.contains('delete-btn')) {
    // eslint-disable-next-line no-restricted-globals

    const task = event.target.parentElement;
    taskList.removeChild(task);

    // remove from local storage
    const text = task.innerText.replace('delete', '');
    delete localTaskStore[text];
    setLocally();
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
