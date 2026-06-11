 const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginBtn = document.getElementById("loginbtn");

function showRegister() {
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
}

function showLogin() {
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
}

 const forgotLink = document.getElementById("forgotLink");

        forgotLink.addEventListener("click", function(event){

            event.preventDefault();

            const email = prompt("Enter your email address:");

            if(email){

                const message = document.getElementById("message");

                message.style.display = "block";

                message.textContent =
                    "Password reset link sent to " + email;
            }
        });
// Local Storage

const currentUser =
localStorage.getItem("currentUser");

let tasks =
JSON.parse(
localStorage.getItem("tasks_" + currentUser)
) || [];

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

let users = JSON.parse(localStorage.getItem("users")) || [];

const registerBtn = document.getElementById("registerBtn");

function registerUser(name, email, password) {

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
        user => user.email === email
    );

    if (userExists) {
        alert("User already exists!");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Account created successfully!");
}

registerBtn.addEventListener("click", () => {

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(name === "" || email === "" || password === ""){
        alert("Please fill in all fields");
        return;
    }

    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    registerUser(name, email, password);

    showLogin(); // switch back to login form
});

loginBtn.addEventListener("click", () => {

    const email =
        document.querySelector("#loginForm input[type='email']").value;

    const password =
        document.querySelector("#loginForm input[type='password']").value;

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.email === email &&
             u.password === password
    );

    if(user){

        localStorage.setItem(
            "currentUser",
            email
        );

        window.location.href = "home.html";

    }else{
        alert("Invalid email or password");
    }
});

