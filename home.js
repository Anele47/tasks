// HOME PAGE

const previewTasks = document.getElementById("previewTasks");

if(previewTasks){

  function showTasks(){

    previewTasks.innerHTML = "";

    let completed = 0;

    const currentUser = localStorage.getItem("currentUser");

const tasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

    tasks.forEach(task => {

      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      if(task.completed){
        completed++;
        taskDiv.style.textDecoration = "line-through";
        taskDiv.style.color = "gray";
      }

      taskDiv.innerHTML = task.text;

      previewTasks.appendChild(taskDiv);

    });

    let progress = 0;

if (totalTasks > 0) {
    progress = Math.round((completedTasks / totalTasks) * 100);
}


    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = tasks.length - completed;
    document.getElementById("progressPercentage").textContent = progress + "%";

  }

  showTasks();

}
const currentUser = localStorage.getItem("currentUser");

const savedTasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

const totalTasks = savedTasks.length;

const completedTasks = savedTasks.filter(task => task.completed).length;

const pendingTasks = savedTasks.filter(task => !task.completed).length;

 let progressPercentage = 0;

if (totalTasks > 0) {
    progressPercentage = Math.round((completedTasks / totalTasks) * 100);
}

document.getElementById("totalTasks").textContent = totalTasks;

document.getElementById("completedTasks").textContent = completedTasks;

document.getElementById("pendingTasks").textContent = pendingTasks;

document.getElementById("progressPercentage").textContent= progressPercentage + "%";



async function loadQuote() {

  const quote =
  document.getElementById("quote");

  quote.textContent =
  "Loading quote...";

  try {

    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    const data = await response.json();

    quote.textContent =
      `"${data.quote}" - ${data.author}`;

  }

  catch(error) {

    quote.textContent =
      "Failed to load quote.";

  }

}

loadQuote();

window.addEventListener("DOMContentLoaded", () => {

  const savedTheme =
    localStorage.getItem("theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  const savedFontSize =
    localStorage.getItem("fontSize") || "Medium";

  document.body.classList.remove(
    "small-font",
    "medium-font",
    "large-font"
  );

  if (savedFontSize === "Small") {
    document.body.classList.add("small-font");
  }
  else if (savedFontSize === "Large") {
    document.body.classList.add("large-font");
  }
  else {
    document.body.classList.add("medium-font");
  }

});
