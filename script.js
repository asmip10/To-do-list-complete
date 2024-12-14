const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

let tasks = []; // Ahora las tareas se guardan en un array en memoria

displayTasks(tasks); // Mostrar la lista vacía al inicio

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    displayTasks(tasks);
    taskInput.value = '';
}

function displayTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
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
        if (task.completed) {
            taskTextSpan.classList.add('completed');
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';

        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            displayTasks(tasks); // No es necesario guardar en localStorage
        });

        editBtn.addEventListener('click', () => {
            editInput.style.display = 'inline';
            taskTextSpan.style.display = 'none';
            editInput.focus();
        });

        editInput.addEventListener('blur', () => {
            task.text = editInput.value;
            displayTasks(tasks); // No es necesario guardar en localStorage
        });
        editInput.addEventListener("keyup", (event) => {
          if (event.key === "Enter") {
            task.text = editInput.value;
            displayTasks(tasks);
          }
        })

        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            displayTasks(tasks); // No es necesario guardar en localStorage
        });

        li.appendChild(checkbox);
        li.appendChild(editInput);
        li.appendChild(taskTextSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    displayTasks(tasks);
});