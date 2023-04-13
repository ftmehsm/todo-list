const todoinput = document.querySelector("input");
const addbtn= document.querySelector("#todo-button");
const todoList = document.querySelector(".todo-list");
const filter= document.querySelector("#filter-todo");

addbtn.addEventListener("click" , addtodo);
todoList.addEventListener("click" , deleteComplete);
filter.addEventListener("click" , filterTodo);
window.addEventListener("click" , (event)=>{event.preventDefault()});
document.addEventListener("DOMContentLoaded" , getTodos)


//work with buttons//
function addtodo(event){
    event.preventDefault();
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");

    const newtodo= document.createElement("li");
    newtodo.innerText = todoinput.value ; 
    
    saveLocalTodo(todoinput.value)

    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);
    todoinput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'><i>"
    completedButton.classList.add("check-btn");
    tododiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML= "<i class='fas fa-trash'><i>";
    trashButton.classList.add("trash-btn");
    tododiv.appendChild(trashButton);

    todoList.appendChild(tododiv);
}

function deleteComplete(event){
    const item = event.target;
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.remove();
        removeLocalTodo(todo);

    }if(item.classList[0] === "check-btn"){
        item.parentElement.classList.toggle("completed");
    }
}
  
//work with filter section//
function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
         switch(event.target.value){
            case "all":
               todo.style.display = "flex";
               break;
            case "completed" :
                if(todo.classList.contains("completed")){
                    todo.style.display= "flex";
                }else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(todo.classList.contains("completed")){
                    todo.style.display= "none"
                }else{
                    todo.style.display = "flex";
                }
                break;
         }
    })
}

//work with localstorage//
function removeLocalTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex) , 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
}


function saveLocalTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    todos.forEach(function(todo){

    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");

    const newtodo= document.createElement("li");
    newtodo.innerText = todo ; 

    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'><i>"
    completedButton.classList.add("check-btn");
    tododiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML= "<i class='fas fa-trash'><i>";
    trashButton.classList.add("trash-btn");
    tododiv.appendChild(trashButton);

    todoList.appendChild(tododiv);
    })
}

