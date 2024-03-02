function getTodoTitle() {
  const todoTitle = document.querySelector(".todo-title");

  todoTitle.innerText = `${loginInfoObj[USER_LOGINID]}님, TO DO LIST.`;
}

function getTodoList() {
  const todoListArr = localStorage.getItem(TODOLIST_KEY);

  console.log(todoListArr[loginInfoObj[USER_ID]]);
}