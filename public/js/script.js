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


let b = 0;
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

window.addEventListener("scroll", () => {
  // Check if the menu is currently visible
  if (a === 1) {
    // Hide the menu when scrolling occurs
    manu.classList.add("hidden");
    a = 0;
  }
});

// Event listener for document click
document.addEventListener("click", (event) => {
  // Check if the clicked element is not the menu or ham
  if (!manu.contains(event.target) && !ham.contains(event.target)) {
    // Hide menu on document click
    manu.classList.add("hidden");
    a = 0;
  }
});


const ham2 = document.querySelector(".ham2");
const manu2 = document.querySelector(".manu2");

ham2.addEventListener("click", () => {
  if (b === 0) {
    manu2.classList.remove("hidden");
    b = 1;
  } else {
    manu2.classList.add("hidden");
    b = 0;
  }
});

//...................................................

const del = document.querySelector(".delet-btn");
const delPop = document.querySelector(".delete-pop")

del.addEventListener("click", () => {
  delPop.classList.add("lift")
})