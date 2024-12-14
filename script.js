const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

let tasks = [];

addTaskBtn.addEventListener('click',addTask);

function addTask(){
    const taskText = taskInput.value.trim();
    if(taskText === '') return;

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    displayTasks(tasks);
    taskInput.value='';
}

function displayTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach((task,index) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = task.text;
        editInput.style.display = 'none';

        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = task.text;
        if(task.completed) taskTextSpan.classList.add('completed');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';

        checkbox.addEventListener('change',() => {
            task.completed = checkbox.checked;
            displayTasks(tasks);
        });

        editBtn.addEventListener('click',() => {
            editInput.style.display = 'inline';
            taskTextSpan.style.display = 'none';
            editInput.focus();
        });

        editInput.addEventListener('blur',()=>{
            task.text = editInput.value;
            displayTasks(tasks);
        });

        editInput.addEventListener("keyup", (event) => {
            if(event.key === 'Enter') {
                task.text = editInput.value;
                displayTasks(tasks);
            }
        });

        deleteBtn.addEventListener('click',() => {
            tasks.splice(index,1);
            displayTasks(tasks);
        });

        li.appendChild(checkbox);
        li.appendChild(editInput);
        li.appendChild(taskTextSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}



taskInput.addEventListener("keyup",(event) => {
    if(event.key === 'Enter') {
        addTask();
    }
});

clearCompletedBtn.addEventListener('click',() => {
    tasks = tasks.filter(task => !task.completed);
    displayTasks(tasks);
});
