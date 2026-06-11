window.onload = function(){

   const currentUser =
localStorage.getItem("currentUser");

const users =
JSON.parse(localStorage.getItem("users")) || [];

const user =
users.find(u => u.email === currentUser);

if(user){

    document.getElementById("profileName")
    .textContent = user.name;

    document.getElementById("profileEmail")
    .textContent = user.email;

} 

    document.getElementById("aboutMe")
    .textContent =
    localStorage.getItem("about") || "No bio added yet";

    const image =
    localStorage.getItem("profileImage");

    if(image){

        document.getElementById("profileImage")
        .src = image;

    }

    /* TASK STATISTICS */

    const tasks =
JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

const total = tasks.length;

const completed =
tasks.filter(task => task.completed).length;

const rate =
total > 0
? ((completed / total) * 100).toFixed(1)
: 0;

document.getElementById("totalTasks")
.textContent = total;

document.getElementById("completedTasks")
.textContent = completed;

document.getElementById("completionRate")
.textContent = rate + "%";

};