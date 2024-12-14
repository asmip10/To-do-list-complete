const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');
const taskInput = document.querySelector('#task-input');

const tasks = [];

document.querySelector('button').addEventListener('click',(e)=>{
    e.preventDefault();
    addTask();
    console.log(tasks);
    
});


function addTask() {
    const _task = taskInput.value.trim();
    taskList.insertAdjacentHTML('beforeend',

        ` 
        <li>
            <div class="task">
                <p>${_task}</p>
                <button class="edit">edit</button>
                <button class="delete">delete</button>
            </div>
        </li>
        `
    );
    tasks.push({task:_task})
    taskInput.value = '';
}