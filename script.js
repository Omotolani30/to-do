var todo = document.getElementById("todo");
var showTodo = document.getElementById("showTodo");
var errorMsg = document.getElementById("errorMsg");
var allTodos = JSON.parse(localStorage.getItem("todos")) || []


function checkInput(event) {
    let key = event.key;
    if (key === "Enter") {
        addTodo()
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
    let edit = prompt("Kindly fill in your edit", allTodos[index])
    if (edit) {
        allTodos[index] = edit;
        displayTodo();
        updateLocalStorage();
    }
    else {
        displayTodo();
    }
}

function delTodo(index){
    let confirmation = confirm("Do you still want to proceed?")
    if (confirmation) {
        allTodos.splice(index, 1)
        displayTodo();
        updateLocalStorage();
    } else {
        displayTodo();
    }
}

function displayTodo() {
    showTodo.innerHTML = ''
    for(index=0; index < allTodos.length; index++) {
        const elements = allTodos[index];

        showTodo.innerHTML += `
        <li class="text-white bg-blue-600 rounded-lg py-4 px-10 my-3 flex items-center justify-between">
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