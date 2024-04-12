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
        console.log(a);

  } else {
    manu.classList.add("hidden");
    a = 0;
  }
});

document.addEventListener("click", (event) => {
  if (!manu.contains(event.target) && !ham.contains(event.target)) {
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

document.addEventListener("click", (event) => {
  if (!manu2.contains(event.target) && !ham2.contains(event.target)) {
    manu2.classList.add("hidden");
    b = 0;
  }
});

//...................................................

const searchicon = document.querySelector(".search-icon");
const searchhide = document.querySelector(".search-hide");
const bb = document.querySelector(".navbar-nav");
let x = 0
searchicon.addEventListener("click", ()=>{
  if (x === 0) {
    searchhide.classList.remove("search-hide2");
    bb.classList.add("hidden");
    ham2.classList.add("hidden")
    x = 1;
    
  } else {
    searchhide.classList.add("search-hide2");
    bb.classList.remove("hidden");
    x = 0;
  }
  
})


const del = document.querySelector(".delet-btn");
const delPop = document.querySelector(".delete-pop");

del.addEventListener("click", () => {
  delPop.classList.add("lift");
});
