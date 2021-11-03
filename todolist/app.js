const addForm = document.querySelector(".add");
const list = document.querySelector("ul");
const search = document.querySelector(".search input");

document.addEventListener('DOMContentLoaded', getTodos);

addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = addForm.add.value.trim();
    if (todo.length) {
        addTodo(todo);
        addForm.reset();
    }
});


list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        removeTodos(e.target.parentElement);
    }
    if (e.target.classList.contains("check")) {
        const todo = e.target.parentElement;
        todo.classList.toggle('completed');
    }
});

search.addEventListener("keyup", () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

const addTodo = (todo) => {
    // const todoDiv = document.createElement('div');
    // todoDiv.classList.add('todo');
    const html = `
            <div class="todo">
                <li class="list-group-item d-flex justify-content-between align-item-center">
                    <span>${todo}</span>
                    <i class="fas fa-check check"></i>
                    <i class="far fa-trash-alt delete"></i>
                </li>
            </div>`
    list.innerHTML += html;
    localStorageTodos(todo);
}

const filterTodos = (term) => {
    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add("filtered"));

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove("filtered"));
};

//Local Storage
function localStorageTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        const html = `
            <div class="todo">
                <li class="list-group-item d-flex justify-content-between align-item-center">
                    <span>${todo}</span>
                    <i class="fas fa-check check"></i>
                    <i class="far fa-trash-alt delete"></i>
                </li>
            </div>`
        list.innerHTML += html;
    });
}

function removeTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
