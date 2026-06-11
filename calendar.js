document.addEventListener("DOMContentLoaded", function () {

    const calendarEl = document.getElementById("calendar");
    const taskList = document.getElementById("taskList");
    const upcomingTasks = document.getElementById("upcomingTasks");

    // Get tasks from localStorage

    const currentUser = localStorage.getItem("currentUser");

const tasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

    // Convert tasks to FullCalendar events
    const events = tasks.map(task => ({
    title: task.text,
    date: task.dueDate
}));

    // Create Calendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",

        events: events,

        dateClick: function (info) {

            const selectedDate = info.dateStr;

            const dateTasks = tasks.filter(task =>
                task.dueDate === selectedDate
            );

            taskList.innerHTML = "";

            if (dateTasks.length === 0) {

                taskList.innerHTML =
                    "<li>No tasks due on this date.</li>";

            } else {

                dateTasks.forEach(task => {

                    const li = document.createElement("li");
                    li.textContent = task.text;

                    taskList.appendChild(li);

                });

            }
        }
    });

    calendar.render();

    // Display Upcoming Tasks
    displayUpcomingTasks();

    function displayUpcomingTasks() {

        upcomingTasks.innerHTML = "";

        const today = new Date();

        const todayString = new Date().toISOString().split("T")[0];

const upcoming = tasks.filter(task =>
    task.dueDate && task.dueDate >= todayString
);

        upcoming.sort((a, b) =>
            new Date(a.dueDate) - new Date(b.dueDate)
        );

        if (upcoming.length === 0) {

            upcomingTasks.innerHTML =
                "<li>No upcoming tasks.</li>";

            return;
        }

        upcoming.forEach(task => {

            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${task.text}</strong><br>
                Due: ${task.dueDate}
            `;

            upcomingTasks.appendChild(li);

        });
    }

});