(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
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

let a = 0;

const ham = document.querySelector(".ham");
const manu = document.querySelector(".manu");

ham.addEventListener("click", () => {
  if (a === 0) {
    manu.classList.remove("hidden");
    a = 1;
  } else {
    manu.classList.add("hidden");
    a = 0;
  }
});