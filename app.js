// Define UI variables
const form = document.querySelector('#task-form');             // Task Form
const taskList = document.querySelector('.collection');       // ul(Where data will be displayed)
const clearBtn = document.querySelector('.clear-tasks');     // Clear task
const filter = document.querySelector('#filter');           // Filter Button
const taskInput = document.querySelector('#task');         // New Task Input

// Load Event Listeners (User Defined)
loadEventListeners();

// Load Event Listeners:function()
 
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask); // When submit is pressed submit event is fired and the specified method is executed
    
    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear Task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter Task event
    filter.addEventListener('keyup', filterTask);
}

// Get task from local storage
function getTasks() {
    let tasks;
    // Check wether local Storage is empty
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

     // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create textNode (i.e task which will append to the list and will be displayed) and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    });
}

// addTask()

function addTask(e) {
    
    // If empty task submitted : validation
    if (taskInput.value === '') {
        alert('Add a task');
    }

    else {
        // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create textNode (i.e task which will append to the list and will be displayed) and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);


    // Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = '';
        
    }
    
    
    e.preventDefault();
    
}

// Store task in local storage
function storeTaskInLocalStorage(task) {
    let tasks;

    // Check wether local Storage is empty
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // Assigning values to tasks from 'task' which is passed from function
    tasks.push(task);

    // Storing the value to local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// removeTask()

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure')) {
            
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// removeTaskFromLocalStorage()
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    // Check wether local Storage is empty
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clearTasks()

function clearTasks() {
    // taskList.innerHTML = '';

    // 2nd way

    while (taskList.firstChild)
    {                    
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from local storage
    clearTaskFromLocalStorage();
}

// Clear Task from Local Storage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// filterTask()

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}





