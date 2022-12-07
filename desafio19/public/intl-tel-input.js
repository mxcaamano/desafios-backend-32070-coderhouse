const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

phoneInputField.addEventListener('blur', (event) => {
    process(event);
  });

const info = document.querySelector(".alert-info");
const error = document.querySelector(".alert-error");

function process(event) {
 event.preventDefault();

 const phoneNumber = phoneInput.getNumber();

 info.style.display = "none";
 error.style.display = "none";

 const data = new URLSearchParams();
 data.append("phone", phoneNumber);

 fetch("https://intl-tel-input-9350.twil.io/lookup", {
 method: "POST",
 body: data,
 })
 .then((response) => response.json())
 .then((json) => {
    phoneInputField.value = phoneNumber
    //  if (json.success) {
    //     info.style.display = "";
    //     info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
    //  } else {
    //  console.log(json.error);
    //      error.style.display = "";
    //      error.innerHTML = `Invalid phone number.`;
    //  }
 })
 .catch((err) => {
     error.style.display = "";
     error.innerHTML = `Something went wrong: ${err}`;
 });
 }