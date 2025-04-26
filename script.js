let todo = document.getElementById("todo");
let showTodo = document.getElementById("showTodo");
let errorMsg = document.getElementById("errorMsg");
let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
let currentEditIndex;
let modal = document.getElementById("modal");
let close = document.getElementsByClassName("close")[0];
let editInput = document.getElementById("editInput");


function checkInput(event) {
    let key = event.key;
    if (key === "Enter") {
        addTodo()
    }
}

function searchTodo() {
    let search = document.getElementById("search").value.toLowerCase();
    let filteredTodos = allTodos.filter(todo => todo.toLowerCase().includes(search));
    showTodo.innerHTML = '';

    for(index=0; index < filteredTodos.length; index++) {
        const elements = filteredTodos[index];

        showTodo.innerHTML += `
        <li onclick='markTodo(${index})' class="text-white bg-[#3674B5] rounded-lg py-4 px-10 my-3 flex items-center justify-between">
            <p>${elements}</p>
            <div class="flex gap-8">
                <button onclick='editTodo(${index})'>
                    <img src="assets/edit.svg" class="opacity-60">
                </button>
                <button onclick='delTodo(${index})'>
                    <img src="assets/icons8.svg" class="opacity-60">
                </button>
            </div>
        </li>
        `
    }
    if (filteredTodos.length === 0) {
        showTodo.innerHTML = `<p class="text-center">No results found</p>`
    }
}

function addTodo() {
    if(todo.value==''){
        errorMsg.style.display = 'inline'
    }
    else {
        errorMsg.style.display = 'none'
        allTodos.push(todo.value);
        displayTodo();
        updateLocalStorage();
        todo.value = '';
    }
}

function editTodo(index) {
    currentEditIndex = index;

    modal.style.display = 'block'
    close.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function saveTodo() {
    if (editInput.value) {
        allTodos[currentEditIndex] = editInput.value;
        updateLocalStorage();
    } 
        displayTodo();
        modal.style.display = "none";
}

function delTodo(index) {
    allTodos.splice(index, 1);
    updateLocalStorage();
    displayTodo();
}

function markTodo(index) {
    let todoItem = showTodo.children[index];
    if (todoItem.classList.contains("bg-[#3674B5]")) {
        todoItem.classList.remove("bg-[#3674B5]");
        todoItem.classList.add("bg-blue-400");
        todoItem.classList.add("line-through");
    } else {
        todoItem.classList.remove("line-through");
        todoItem.classList.remove("bg-blue-400");
        todoItem.classList.add("bg-[#3674B5]");
    }
}



function displayTodo() {
    showTodo.innerHTML = ''
    for(index=0; index < allTodos.length; index++) {
        const elements = allTodos[index];

        showTodo.innerHTML +=`
        <li onclick='markTodo(${index})' class="text-white bg-[#3674B5] rounded-lg py-3 px-10 my-3 flex items-center justify-between">
            <p>${elements}</p>
            <div class="flex gap-8">
                <button onclick='editTodo(${index})'>
                    <img src="assets/edit.svg" class="opacity-60">
                </button>
                <button onclick='delTodo(${index})'>
                    <img src="assets/icons8.svg" class="opacity-60">
                </button>
            </div>
        </li>
        `
    }
}

function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

displayTodo()