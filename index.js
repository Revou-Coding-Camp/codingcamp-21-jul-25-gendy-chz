const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");

let todos = [];

form.onsubmit = e => {
  e.preventDefault();
  const task = todoInput.value;
  const date = dateInput.value;
  if (!task || !date) return;

  todos.push({ task, date, done: false });
  todoInput.value = "";
  dateInput.value = "";
  showTodos();
};

filterBtn.onclick = () => showTodos(true);

deleteAllBtn.onclick = () => {
  if (confirm("Remove semua task, yakin?")) {
    todos = [];
    showTodos();
  }
};

function showTodos(filter = false) {
  todoList.innerHTML = "";

  const data = filter && dateInput.value
    ? todos.filter(t => t.date === dateInput.value)
    : todos;

  if (data.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    return;
  }

  data.forEach((t, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.task}</td>
      <td>${t.date}</td>
      <td>${t.done ? "Done" : "Pending"}</td>
      <td>
        <button onclick="toggle(${i})">Verify</button>
        <button onclick="hapus(${i})">Remove</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function toggle(i) {
  todos[i].done = !todos[i].done;
  showTodos();
}

function hapus(i) {
  todos.splice(i, 1);
  showTodos();
}
