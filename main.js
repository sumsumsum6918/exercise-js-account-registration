const clickElement = (labelName) => {
  const inputElement = document.getElementById(`${labelName}-input`);
  const labelElement = document.getElementById(`${labelName}-label`);

  if (!labelElement.classList.contains("show")) {
    inputElement.focus();
    labelElement.classList.add("show");
  } else return;
};

const form = document.querySelector("form");
const nameInputElement = document.getElementById("name-input");
const usernameInputElement = document.getElementById("username-input");
const emailInputElement = document.getElementById("email-input");
const passwordInputElement = document.getElementById("password-input");
const confirmInputElement = document.getElementById("confirm-password-input");
const submitButton = document.querySelector(".sign-up-button");

let pwValidation = false;

form.addEventListener("focusout", (event) => {
  if (event.target.type === "submit" || event.target.type === "button") return;
  const id = event.target.id;
  const targetElement = id.substring(0, id.lastIndexOf("-input"));
  const warningElement = document.getElementById(`${targetElement}-warning`);

  if (event.target.value && warningElement.classList.contains("show")) {
    warningElement.classList.remove("show");
  } else if (!event.target.value) {
    warningElement.classList.add("show");
  }
  toggleSubmitEnabled();
});

function toggleRed(element) {
  element.classList.add("red");
  element.classList.remove("green");
}
function toggleGreen(element) {
  element.classList.add("green");
  element.classList.remove("red");
}

passwordInputElement.addEventListener("input", () => {
  validatePassword();

  toggleSubmitEnabled();
});

confirmInputElement.addEventListener("input", () => {
  checkPassword();
  toggleSubmitEnabled();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const registrationData = {
    name: nameInputElement.value,
    username: usernameInputElement.value,
    email: emailInputElement.value,
    password: passwordInputElement.value,
  };
  console.log(registrationData);
});

function validatePassword() {
  const length = passwordInputElement.value.length;
  if (length < 8 && length > 0) {
    toggleRed(passwordInputElement);
  } else if (length >= 8) {
    toggleGreen(passwordInputElement);
    if (confirmInputElement.value) {
      checkPassword();
    }
  }
}

function toggleSubmitEnabled() {
  if (pwValidation) {
    submitButton.classList.add("submit");
    submitButton.type = "submit";
  } else if (!pwValidation) {
    submitButton.classList.remove("submit");
    submitButton.type = "button";
  }
}
function checkPassword() {
  if (confirmInputElement.value !== passwordInputElement.value) {
    toggleRed(confirmInputElement);
    pwValidation = false;
  } else if (confirmInputElement.value === passwordInputElement.value) {
    toggleGreen(confirmInputElement);
    pwValidation = true;
  }
}
