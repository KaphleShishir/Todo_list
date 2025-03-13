document.addEventListener('DOMContentLoaded', ()=>{
    const todoInput = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render saved tasks from localStorage
    tasks.forEach(task => renderTask(task));

    addTaskButton.addEventListener('click', ()=>{
        const taskText = todoInput.value.trim();
        if(taskText === "") return;

        const newTask = {
            id: Date.now(),
            completed: false,
            text: taskText
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
    });

    function renderTask(task){
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        // Delete task on button click
        li.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTask(task.id);
        });

        todoList.appendChild(li);
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        document.querySelector(`[data-id='${taskId}']`).remove();
    }

    function saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
