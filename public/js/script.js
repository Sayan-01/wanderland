(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
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
const screen = document.querySelector(".screen")

ham.addEventListener("click", () => {
  if (a === 0) {
    manu.classList.remove("hidden");
    a = 1;
  } else {
    manu.classList.add("hidden");
    a = 0;
  }
});

const del = document.querySelector(".delet-btn");
const delPop = document.querySelector(".delete-pop")

del.addEventListener("click", () => {
  delPop.classList.add("lift")
})