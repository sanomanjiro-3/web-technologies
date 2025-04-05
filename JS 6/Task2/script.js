let todos = [];
let filter = 'all';

const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const snackbar = document.getElementById("snackbar");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  const task = {
    id: Date.now().toString(),
    title,
    completed: false,
    createdAt: new Date()
  };
  todos.push(task);
  taskInput.value = "";
  renderTodos();
  showToast(`Задача "${title}" додана`);
});

function renderTodos() {
  todoList.innerHTML = "";
  let filtered = todos;

  if (filter === "active") {
    filtered = todos.filter(t => !t.completed);
  } else if (filter === "completed") {
    filtered = todos.filter(t => t.completed);
  }

  if (filtered.length === 0) {
    todoList.innerHTML = `<li class="empty-text">Задачі відсутні.</li>`;
    return;
  }

  filtered.forEach(todo => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleTodo(todo.id);

    const titleSpan = document.createElement("span");
    titleSpan.className = "task-title";
    titleSpan.textContent = todo.title;
    titleSpan.ondblclick = () => startEditing(titleSpan, todo);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    li.append(checkbox, titleSpan, deleteBtn);
    todoList.appendChild(li);
  });
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  todo.completed = !todo.completed;
  renderTodos();
  showToast(`Задача "${todo.title}" ${todo.completed ? 'виконана' : 'відновлена'}`);
}

function deleteTodo(id) {
  const title = todos.find(t => t.id === id)?.title;
  todos = todos.filter(t => t.id !== id);
  renderTodos();
  showToast(`Задача "${title}" видалена`);
}

function setFilter(f) {
  filter = f;
  renderTodos();
}

function startEditing(titleSpan, todo) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.title;
  input.className = "edit-input";
  input.onblur = saveEdit;
  input.onkeydown = (e) => {
    if (e.key === "Enter") input.blur();
    if (e.key === "Escape") {
      renderTodos(); // скасувати редагування
    }
  };

  titleSpan.replaceWith(input);
  input.focus();

  function saveEdit() {
    const newTitle = input.value.trim();
    if (newTitle) {
      todo.title = newTitle;
      showToast(`Задача змінена на "${newTitle}"`);
    }
    renderTodos();
  }
}

function showToast(text) {
  snackbar.textContent = text;
  snackbar.className = "show";
  setTimeout(() => snackbar.className = snackbar.className.replace("show", ""), 2500);
}
