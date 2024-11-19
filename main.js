const clickElement = (labelName) => {
  const inputElement = document.getElementById(`${labelName}-input`);
  const labelElement = document.getElementById(`${labelName}-label`);
  console.log(inputElement);
  console.log(labelElement);
  if (labelElement) {
    labelElement.focus();
  }
};
