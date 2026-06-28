console.log("JS carregou");
const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const todolist = document.getElementById("todolist");
const pagination = document.getElementById("pagination");

let todos = [];
const ItemsPerPage = 3;
let currentPage = 1;

addBtn.addEventListener("click", async () => {
  const task = todoInput.value.trim();
  if (task === "") {
    showErrorMessage("Please enter a task");
    return;
  }

      await fetch("http://localhost:8080/tasks", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            nome: task
          })
      })

  todoInput.value = "";
  currentPage = 1;
  fetchTodos();
});

function renderTodos() {
  todolist.innerHTML = "";

  const start = (currentPage - 1) * ItemsPerPage;
  const end = start + ItemsPerPage;
  const currentTodos = todos.slice(start, end);

  currentTodos.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "todo item";

    const taskText = document.createElement("span");
    taskText.className = "todo-text";
    taskText.textContent = task.nome; // vem da API

    const dateSpan = document.createElement("small");
    dateSpan.textContent = " - " + new Date(task.dataCriacao).toLocaleString(); // vem da API

    li.appendChild(taskText);
    li.appendChild(dateSpan);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      editTask(start + index, li, taskText);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
      if(confirm("Tem certeza que deseja excluir essa task?")){
        try {
          await fetch(`http://localhost:8080/tasks/${task.id}`, { method: 'DELETE' });
          fetchTodos();
        } catch(error){
          console.error("Erro ao deletar", error)
        }
      }
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todolist.appendChild(li);
  });
}

function renderPagination() {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(todos.length / ItemsPerPage);

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

function editTask(index, li, taskText) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = todos[index].nome; // vem da API
  input.className = "todo-text";

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Save";

  li.innerHTML = "";
  li.appendChild(input);
  li.appendChild(saveBtn);

  saveBtn.addEventListener("click", () => {
    const updatedTask = input.value.trim();
    if (updatedTask !== "") {
     fetch(`http://localhost:8080/tasks/${todos[index].id}`, {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({
          nome : updatedTask
        })
      })
    } else {
      showErrorMessage("Task cannot be empty.");
    }
  });
}

function showErrorMessage(message) {
  const errorMessage = document.querySelector(".error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 3000);
}

async function fetchTodos() {
  try{
    const resposta = await fetch('http://localhost:8080/tasks');

    if (!resposta.ok){
      throw new Error(`Erro no servidor: ${resposta.status}`);
    }
    const tasks = await resposta.json();
    todos = tasks;

    todolist.innerHTML = "";

    if(tasks.length === 0) {
      todolist.innerHTML = "<li style='text-align:center'>Nenhuma task cadastrada.</li>";
    }

    renderTodos();
    renderPagination();
  }
   catch (error) {
    console.error("Erro ao listar tasks:", error);
    alert("Não foi possível carregar as tasks. Verifique se o servidor está ligado.");
  }
}
fetchTodos();
