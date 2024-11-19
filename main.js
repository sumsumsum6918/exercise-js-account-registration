const clickElement = (labelName) => {
  const inputElement = document.getElementById(`${labelName}-input`);
  const labelElement = document.getElementById(`${labelName}-label`);

  inputElement.focus();
  if (!labelElement.classList.contains("show")) {
    labelElement.classList.add("show");
  }
};

const form = document.querySelector("form");
const nameInputElement = document.getElementById("name-input");
const usernameInputElement = document.getElementById("username-input");
const emailInputElement = document.getElementById("email-input");
const passwordInputElement = document.getElementById("password-input");
const confirmInputElement = document.getElementById("confirm-password-input");
const submitButton = document.querySelector(".sign-up-button");

form.addEventListener("focusout", (event) => {
  if (["submit", "button"].includes(event.target.type)) return;
  const id = event.target.id;
  const targetElement = id.substring(0, id.lastIndexOf("-input"));
  const warningElement = document.getElementById(`${targetElement}-warning`);

  if (event.target.value) {
    warningElement.classList.remove("show");
  } else if (!event.target.value) {
    warningElement.classList.add("show");
  }
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

function toggleRed(element) {
  element.classList.add("red");
  element.classList.remove("green");
}
function toggleGreen(element) {
  element.classList.add("green");
  element.classList.remove("red");
}

function validatePassword() {
  const length = passwordInputElement.value.length;
  if (length < 8 && length > 0) {
    toggleRed(passwordInputElement);
    return "password";
  } else if (length >= 8) {
    toggleGreen(passwordInputElement);
  }
}

function validatePasswordConfirmation() {
  if (!confirmInputElement.value) return "confirmation";
  if (confirmInputElement.value !== passwordInputElement.value) {
    toggleRed(confirmInputElement);
    return "confirmation";
  } else if (confirmInputElement.value === passwordInputElement.value) {
    toggleGreen(confirmInputElement);
  }
}

function toggleSubmitEnabled(shouldEnable) {
  if (shouldEnable) {
    submitButton.classList.add("submit");
    submitButton.type = "submit";
  } else if (!shouldEnable) {
    submitButton.classList.remove("submit");
    submitButton.type = "button";
  }
}

function validateForm() {
  const passwordValidationError = validatePassword();
  const confirmationValidationError = validatePasswordConfirmation();
  const shouldEnableSubmit =
    !passwordValidationError && !confirmationValidationError;
  toggleSubmitEnabled(shouldEnableSubmit);
}

document.addEventListener("input", () => {
  validateForm();
});
