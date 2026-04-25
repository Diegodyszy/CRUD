console.log("JS carregou");
const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const todolist = document.getElementById("todolist");
const pagination = document.getElementById("pagination");

const todos = [];
const ItemsPerPage = 3;
let currentPage = 1;

addBtn.addEventListener("click", () =>{
  const task = todoInput.value.trim();
  if(task === "") {
    showErrorMessage("Please enter a task")
    return;
   }

   const date1 = new Date();

  todos.unshift({
    text:task,
    date1:new Date()
  });
  console.log('todos',todos);
  todoInput.value = "";
  currentPage = 1;
  renderTodos();
  renderPagination();
});

function renderTodos() {
  todolist.innerHTML = "";

  const start = (currentPage - 1) * ItemsPerPage;
  const end = start + ItemsPerPage;
  const currentTodos = todos.slice(start, end);

  currentTodos.forEach((task, index)=> {
    const li = document.createElement("li");
    li.className = "todo item";

    const taskText = document.createElement("span")
    taskText.className = "todo-text";
    taskText.textContent = task.text;

    const dateSpan = document.createElement("small");

    const formattedDate = new Date(task.date1).toLocaleString();

    dateSpan.textContent = " - " + formattedDate;

    li.appendChild(taskText);
    li.appendChild(dateSpan);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      editTask(start + index, li, taskText);   
     })

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete"
      deleteBtn.addEventListener("click", () =>{
        deleteTask(start + index);
      })

       li.appendChild(taskText);
       li.appendChild(editBtn) ;
       li.appendChild(deleteBtn);
       todolist.appendChild(li);
    });    
}

function renderPagination(){
  pagination.innerHTML = "";

  const totalPages = Math.ceil(todos.length / ItemsPerPage); // CORRIGIDO

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "pagination-btn";
    btn.textContent = i;
    btn.disabled = i === currentPage;

    btn.addEventListener("click", () => {
      currentPage = i;
      renderTodos();
      renderPagination();
    });

    pagination.appendChild(btn);
  }
}

function editTask (index, li, taskText) {

  const input = document.createElement("input"); // CORRIGIDO
  input.type = "text";
  input.value = todos[index].text; // CORRIGIDO
  input.className = "todo-text";

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn"; // CORRIGIDO
  saveBtn.textContent = "Save";

  li.innerHTML = "";
  li.appendChild(input);
  li.appendChild(saveBtn);
  

  saveBtn.addEventListener("click", () => {
    const updatedTask = input.value.trim();

    if(updatedTask !== "") {
      todos[index] = updatedTask;
      renderTodos();
    } else {
      showErrorMessage("Task cannot be empty.");
  }
})
}

function deleteTask(index) {
  todos.splice(index, 1);

  if ((currentPage - 1) * ItemsPerPage >= todos.length){ // CORRIGIDO
    currentPage = Math.max(currentPage - 1, 1);
  }

  renderTodos();
  renderPagination();
}

function showErrorMessage(message){
  const errorMessage = document.querySelector(".error-message")
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() =>{
    errorMessage.style.display = "none";
  }, 3000);
}

