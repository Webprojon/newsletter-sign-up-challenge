"use strict";

// Selectors
const container = document.querySelector(".form__field");
const formInput = document.querySelector(".email__input");
const submitBtn = document.querySelector(".submit__btn");
const errorMessage = document.querySelector(".error__message");

// Events & Functions
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInput(inputValue) {
  if (inputValue.trim() !== "") {
    // Validations for non-empty input
    submitBtn.classList.add("active__btn");
    submitBtn.removeAttribute("disabled");

    if (emailRegex.test(inputValue)) {
      errorMessage.style.display = "none";
      formInput.classList.remove("invalid-input");
    } else {
      errorMessage.style.display = "block";
      formInput.classList.add("invalid-input");
    }
  } else {
    // Validations for empty input
    submitBtn.classList.remove("active__btn");
    errorMessage.style.display = "none";
    formInput.classList.remove("invalid-input");
  }
}

formInput.addEventListener("input", function () {
  validateInput(formInput.value);
});

submitBtn.addEventListener("click", function () {
  let email = formInput.value;
  if (emailRegex.test(email)) {
    setTimeout(() => {
      if (container) {
        let children = container.children;
        for (let i = 0; i < children.length; i++) {
          children[i].style.display = "none";
          children[i].classList.remove("details__feature");
          children[i].classList.remove("image__feature");
        }
      }
      container.style.width = "20rem";
      container.style.height = "21rem";

      const containerDetails = document.createElement("div");
      containerDetails.classList.add("container__details");
      const modalMurkup = `
    <div class="modal__murkup">
    <img height="40vh" src=${"./images/icon-list.svg"} alt="icon img" />
    <h2 class="markup__heading">Thanks for subscribing!</h2>
     <p class="markup__desc">A confirmation email has been sent
      to <span class="email__span">${email}</span> . 
      Please open it and click the button inside to confirm your subscription.
      </p>
      <button class="submit__btn">Dismiss message</button>
    </div>
    `;
      container.insertAdjacentHTML("beforeend", modalMurkup);
      container.appendChild(containerDetails);
    }, 1000);

    submitBtn.classList.remove("active__btn");
    formInput.classList.remove("invalid-input");
  } else {
    errorMessage.style.display = "block";
    formInput.classList.add("invalid-input");
  }
});
