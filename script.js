document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    taskList.forEach(task => {
        renderTaskList(task);
    });

    addTaskBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        taskList.push(newTask);
        saveTasks();
        console.log(taskList);

        todoInput.value = "";
        renderTaskList(newTask);
    });

    function renderTaskList(task){
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) li.classList.add("completed");
        li.innerHTML = `
            <span>${task.text}</span>
            <span><input type="checkbox" ${task.completed ? 'checked' : ''}/></span>
            <button>Delete</button>
        `;
        li.querySelector('input').addEventListener('click', (e) => {
            e.stopPropagation();
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector('button').addEventListener('click', (e) =>{
            e.stopPropagation();
            taskList = taskList.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        })

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }
});