const STORAGE_KEY = "starter_tasks_v1";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const template = document.getElementById("task-item-template");
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));

let tasks = loadTasks();
let currentFilter = "all";
render();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    text,
    done: false,
  });

  input.value = "";
  saveAndRender();
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.done);
  saveAndRender();
});

for (const btn of filterButtons) {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    render();
  });
}

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  render();
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function render() {
  list.innerHTML = "";
  const visibleTasks = getVisibleTasks();

  for (const task of visibleTasks) {
    const node = template.content.firstElementChild.cloneNode(true);
    const checkbox = node.querySelector(".task-check");
    const text = node.querySelector(".task-text");
    const deleteBtn = node.querySelector(".delete-btn");

    node.dataset.testid = `task-item-${task.id}`;
    checkbox.checked = task.done;
    text.textContent = task.text;
    text.classList.toggle("done", task.done);
    deleteBtn.textContent = "Delete";

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveAndRender();
    });

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveAndRender();
    });

    list.appendChild(node);
  }

  for (const btn of filterButtons) {
    btn.classList.toggle("is-active", btn.dataset.filter === currentFilter);
  }

  const done = tasks.filter((task) => task.done).length;
  count.textContent = `${tasks.length} total, ${done} done, ${visibleTasks.length} shown`;
  clearCompletedBtn.disabled = done === 0;
}

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.done);
  }

  if (currentFilter === "done") {
    return tasks.filter((task) => task.done);
  }

  return tasks;
}
