  const theme =
      document.getElementById("theme");

    /* THEME */

    theme.addEventListener("change", () => {

      if(theme.value === "light"){
        document.body.classList.add("light-mode");
      }
      else{
        document.body.classList.remove("light-mode");
      }

    });

    /* SAVE SETTINGS */

    function saveSettings(){

      localStorage.setItem(
        "username",
        document.getElementById("username").value
      );

      localStorage.setItem(
        "email",
        document.getElementById("email").value
      );

      localStorage.setItem(
        "theme",
        theme.value
      );

      localStorage.setItem(
        "fontSize",
        document.getElementById("fontSize").value
      );

      localStorage.setItem(
        "emailNotify",
        document.getElementById("emailNotify").checked
      );

      localStorage.setItem(
        "taskReminder",
        document.getElementById("taskReminder").checked
      );

      localStorage.setItem(
        "desktopNotify",
        document.getElementById("desktopNotify").checked
      );

      localStorage.setItem(
        "showCompleted",
        document.getElementById("showCompleted").checked
      );

      localStorage.setItem(
        "animations",
        document.getElementById("animations").checked
      );

      localStorage.setItem(
        "autosave",
        document.getElementById("autosave").checked
      );

      localStorage.setItem(
        "twofactor",
        document.getElementById("twofactor").checked
      );

      localStorage.setItem(
        "remember",
        document.getElementById("remember").checked
      );

      applyFontSize(
        document.getElementById("fontSize").value
      );

      const message =
        document.getElementById("message");

      message.style.display = "block";

      setTimeout(() => {
        message.style.display = "none";
      },3000);

    }

    /* LOAD SETTINGS */

    window.onload = function(){

      document.getElementById("username").value =
        localStorage.getItem("username") || "";

      document.getElementById("email").value =
        localStorage.getItem("email") || "";

      theme.value =
        localStorage.getItem("theme") || "dark";

      document.getElementById("fontSize").value =
        localStorage.getItem("fontSize") || "Medium";

      document.getElementById("emailNotify").checked =
        localStorage.getItem("emailNotify") === "true";

      document.getElementById("taskReminder").checked =
        localStorage.getItem("taskReminder") === "true";

      document.getElementById("desktopNotify").checked =
        localStorage.getItem("desktopNotify") === "true";

      document.getElementById("showCompleted").checked =
        localStorage.getItem("showCompleted") !== "false";

      document.getElementById("animations").checked =
        localStorage.getItem("animations") !== "false";

      document.getElementById("autosave").checked =
        localStorage.getItem("autosave") !== "false";

      document.getElementById("twofactor").checked =
        localStorage.getItem("twofactor") === "true";

      document.getElementById("remember").checked =
        localStorage.getItem("remember") === "true";

      /* APPLY THEME */

      if(theme.value === "light"){
        document.body.classList.add("light-mode");
      }

      applyFontSize(
  document.getElementById("fontSize").value
);

    }

    function applyFontSize(size) {

  document.body.classList.remove(
    "small-font",
    "medium-font",
    "large-font"
  );

  if(size === "Small"){
    document.body.classList.add("small-font");
  }
  else if(size === "Large"){
    document.body.classList.add("large-font");
  }
  else{
    document.body.classList.add("medium-font");
  }

}

function saveProfile(){

    localStorage.setItem(
        "name",
        document.getElementById("name").value
    );

    localStorage.setItem(
        "email",
        document.getElementById("email").value
    );

    localStorage.setItem(
        "about",
        document.getElementById("about").value
    );

    alert("Profile Saved");
}

document.getElementById("image")
.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(){

        localStorage.setItem(
            "profileImage",
            reader.result
        );

    };

    reader.readAsDataURL(file);

});