function saveTodoList() {
  localStorage.setItem(TODOLIST_KEY+"_"+loginInfoObj[USER_ID], JSON.stringify(userTodoListObj));
}

function removeTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  userTodoListObj = userTodoListObj.filter(toDo => String(toDo.id) !== String(li.id));
  saveTodoList();
}

function addTodo(newTodo) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.classList.add("todo");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.classList.add("btn-delete");
  button.innerText = "X";
  button.addEventListener("click", removeTodo);
  li.appendChild(span);
  li.appendChild(button);
  
  const toDoList = document.querySelector(".todo-list");
  toDoList.appendChild(li);
}

function onTodoFormSubmit(event) {
  event.preventDefault();

  const inputTodo = document.getElementById("input-todo");
  const newTodo = inputTodo.value;
  inputTodo.value = "";
  const newTodoObj = {
    id: "t"+String(Date.now()),
    text: newTodo,
  };
  userTodoListObj.push(newTodoObj);
  addTodo(newTodoObj);
  saveTodoList();
}

function getTodoTitle() {
  const todoTitle = document.querySelector(".todo-title");

  todoTitle.innerText = `${loginInfoObj[USER_LOGINID]}님, TO DO LIST.`;
  
  const formTodolist = document.getElementById("form-todolist");
  formTodolist.addEventListener("submit", onTodoFormSubmit);
}

function getTodoList() {
  const todoListArr = localStorage.getItem(TODOLIST_KEY+"_"+loginInfoObj[USER_ID]);

  const toDoList = document.querySelector(".todo-list");
  toDoList.innerHTML = "";
  
  if(todoListArr !== null) {
    const parsedTodoList = JSON.parse(todoListArr);
    userTodoListObj = parsedTodoList;
    parsedTodoList.forEach(addTodo);
  }
}