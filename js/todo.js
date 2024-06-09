const host = "http://127.0.0.1:8080";
const todosContainer = document.querySelector('.todos-container');

function getTodos() {
    axios.get(`${host}/todo`)
        .then(response => {
            console.log(response.data);
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}

function renderTodos(todos) {
    todosContainer.innerHTML = ''; // todosContainer 초기화
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');
        
        const todoDetails = document.createElement('div');
        todoDetails.classList.add('todo-details');

        const todoName = document.createElement('span');
        todoName.classList.add('todo-name');
        todoName.textContent = `이름: ${todo.id},  `;

        const todoContent = document.createElement('span');
        todoContent.classList.add('todo-content');
        todoContent.textContent = `내용: ${todo.item}`;

        const todoTimestamp = document.createElement('span');
        todoTimestamp.classList.add('todo-timestamp');
        const formattedTimestamp = new Date(todo.timestamp).toLocaleString(); // 포맷팅된 타임스탬프
        todoTimestamp.textContent = `일시: ${formattedTimestamp}`;

        todoDetails.appendChild(todoName);
        todoDetails.appendChild(todoContent);
        todoDetails.appendChild(todoTimestamp);
        todoDiv.appendChild(todoDetails);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';
        deleteBtn.addEventListener('click', function () {
            deleteTodo(todo.id);
        });
        todoDiv.appendChild(deleteBtn);

        todosContainer.appendChild(todoDiv);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    getTodos();
});

const todoInput = document.querySelector('.todo-input');
const todoNameInput = document.querySelector('.todo-name-input');

todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

todoNameInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const item = todoInput.value.trim();
    const name = todoNameInput.value.trim();
    if (item === '' || name === '') return;

    const todoData = {
        id: name,
        item: item
    };

    axios.post(`${host}/todo`, todoData)
        .then(response => {
            todoInput.value = '';
            todoNameInput.value = '';
            getTodos();
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
}

function deleteTodo(id) {
    axios.delete(`${host}/todo/${id}`)
        .then(response => {
            getTodos();
        })
        .catch(error => {
            console.error('Error deleting todo:', error);
        });
}
