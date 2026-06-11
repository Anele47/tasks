// TASK PAGE
//Task Javascript

const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const dueDate = document.getElementById("dueDate");

let currentFilter = "all";

const taskList = document.getElementById("taskList");

const currentUser = localStorage.getItem("currentUser");

let tasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

if (!currentUser) {
  window.location.href = "index.html";
}

/* ADD TASK */

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

 const task = {
  id: Date.now(),
  text: taskText,
  dueDate: dueDate.value,
  completed: false,
  important: prioritySelect.value === "important",
};

  tasks.push(task);

  saveTasks();

  taskInput.value = "";

  dueDate.value = "";

  displayTasks();
});

/* DISPLAY TASKS */

function displayTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  /* SEARCH */

  const searchValue = searchInput.value.toLowerCase();

  filteredTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(searchValue),
  );

  /* FILTER */

  if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  }

  if (currentFilter === "pending") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  if (currentFilter === "important") {
    filteredTasks = filteredTasks.filter((task) => task.important);
  }

  /* SHOW TASKS */

  filteredTasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    const taskName = document.createElement("div");
    taskName.classList.add("task-name");

    if (task.completed) {
      taskName.classList.add("completed");
    }

    if (task.important) {
      taskName.classList.add("important");
    }

    if (
  task.dueDate &&
  new Date(task.dueDate) < new Date() &&
  !task.completed
) {
  taskCard.classList.add("overdue");
}

    taskName.textContent = task.text;

    taskInfo.appendChild(taskName);

const dateText = document.createElement("small");

if (task.dueDate) {
  dateText.textContent = `Due: ${task.dueDate}`;
} else {
  dateText.textContent = "No due date";
}

taskInfo.appendChild(dateText);

    /* BUTTONS */

    const taskButtons = document.createElement("div");
    taskButtons.classList.add("task-buttons");

    /* COMPLETE BUTTON */

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete-btn");

    completeBtn.addEventListener("click", () => {
  task.completed = !task.completed;

  if (task.completed) {
    task.completedDate = new Date().toISOString();
  } else {
    task.completedDate = null;
  }

  saveTasks();
  displayTasks();
});

    /* EDIT BUTTON */

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", () => {
      const updatedTask = prompt("Edit task:", task.text);

      if (updatedTask !== null && updatedTask.trim() !== "") {
        task.text = updatedTask;
        saveTasks();
        displayTasks();
      }
    });

    /* DELETE BUTTON */

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();

      displayTasks();
    });

    taskButtons.appendChild(completeBtn);
    taskButtons.appendChild(editBtn);
    taskButtons.appendChild(deleteBtn);

    taskCard.appendChild(taskInfo);
    taskCard.appendChild(taskButtons);

    taskList.appendChild(taskCard);
  });
}

/* SEARCH + FILTER EVENTS */

searchInput.addEventListener("input", displayTasks);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    displayTasks();
  });
});

function saveTasks() {
  localStorage.setItem(
    "tasks_" + currentUser,
    JSON.stringify(tasks)
);
}

function loadTasks() {

  tasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
  ) || [];

  displayTasks();
}

loadTasks();

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  const savedFontSize = localStorage.getItem("fontSize") || "Medium";

  document.body.classList.remove("small-font", "medium-font", "large-font");

  if (savedFontSize === "Small") {
    document.body.classList.add("small-font");
  } else if (savedFontSize === "Large") {
    document.body.classList.add("large-font");
  } else {
    document.body.classList.add("medium-font");
  }
});


