let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskCounter = JSON.parse(localStorage.getItem("taskCounter")) || [];

const inputField = document.querySelector(".input-field input");
const addButton = document.querySelector(".input-field button");
const todoList = document.getElementById("todo-list");
const totalTasksElement = document.querySelector(".box p");
const deleteAllButton = document.querySelector(".box button");

const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("taskCounter", JSON.stringify(taskCounter));
};

const updateTaskCount = () => {
  totalTasksElement.textContent = `Total task: ${tasks.length}`;
};

const renderTasks = () => {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = task.completed ? "complete" : "done";
    taskDiv.dataset.taskId = task.id;

    const checkIcon = task.completed ? "images/check green.png" : "images/check (2).png";
    const checkButtonIcon = task.completed ? "images/check green.png" : "images/check (1).png";
    const checkButtonTitle = task.completed ? "Mark as uncompleted" : "Mark as completed";

    taskDiv.innerHTML = `
      <img src="${checkIcon}" alt="" width="30px" height="30px" />
      <p class="donee" style="${task.completed ? "color: green; text-decoration: line-through;" : ""}">${task.text}</p>
      <input type="image" title="${checkButtonTitle}" class="toggle-btn" src="${checkButtonIcon}" alt="" />
      <input type="image" title="Edit this task" class="edit-btn" src="images/edit.png" alt="Edit" />
      <input type="image" title="Delete this task" class="delete-btn" src="images/delete.png" alt="" />
    `;

    taskDiv
      .querySelector(".toggle-btn")
      .addEventListener("click", () => toggleTask(task.id));
    taskDiv
      .querySelector(".edit-btn")
      .addEventListener("click", () => editTask(task.id));
    taskDiv
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteTask(task.id));

    todoList.appendChild(taskDiv);
  });
};

const addTask = () => {
  const taskText = inputField.value;
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  const task = {
    id: ++taskCounter,
    text: taskText,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  saveToLocalStorage();
  renderTasks();
  updateTaskCount();
  inputField.value = "";
};

const toggleTask = (id) => {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveToLocalStorage();
    renderTasks();
  }
};

const deleteTask = (id) => {
  tasks = tasks.filter((t) => t.id !== id);
  saveToLocalStorage();
  renderTasks();
  updateTaskCount();
};

const editTask = (id) => {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    const newText = prompt("Edit your task:", task.text);
    if (newText !== null && newText !== "") {
      task.text = newText;
      saveToLocalStorage();
      renderTasks();
    }
  }
};

const deleteAllTasks = () => {
  if (tasks.length === 0) {
    alert("No tasks to delete!");
    return;
  }
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveToLocalStorage();
    renderTasks();
    updateTaskCount();
  }
};

addButton.addEventListener("click", addTask);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
deleteAllButton.addEventListener("click", deleteAllTasks);

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  updateTaskCount();
});

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("darkmode");
}

const insidedark = () => {
  const indark = document.querySelector(".container");
  indark.classList.toggle("indarkmode");
}

document.getElementById("toggledark").addEventListener("click", toggleDarkMode);
document.getElementById("toggledark").addEventListener("click", insidedark);
