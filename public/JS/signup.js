    // Show/Hide Password
    const showHiddenPass = (inputId, iconId) => {
      const input = document.getElementById(inputId),
        icon = document.getElementById(iconId);

      icon.addEventListener("click", () => {
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("ri-eye-line");
        icon.classList.toggle("ri-eye-off-line");
      });
    };

    showHiddenPass("signup-pass", "signup-eye");

 // JavaScript for Bootstrap validation
 (function () {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

