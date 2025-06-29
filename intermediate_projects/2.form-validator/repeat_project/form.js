// DOM elements
const form = document.getElementById('form-container');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

form.addEventListener("submit",e => {
  e.preventDefault();

  // 1.Get trimmed input values
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  // Validate fields
  const isUsernameValid = validateUsername(usernameValue);
  const isEmailValid = validateEmail(emailValue);
  const isPasswordValid = validatePassword(passwordValue);
  const isConfirmPasswordValid = validateConfirmPassword(passwordValue,confirmPasswordValue);

  // Only proceed if 
  if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid){
    alert("Registration successfull!")

    setTimeout(() => {
      form.reset(); // Clear input fields
      
      // Reset all form styles and error messages
      document.querySelectorAll(".form-group").forEach(group => {
        group.classList.remove("success","error");
        const errorMessage = group.querySelector("small");
        errorMessage.textContent = "";
        errorMessage.style.visibility = "hidden";
      })

    }, 1000);
  };

});

function validateUsername(usernameValue){
  // Get the small element for error messages
  const usernameError = username.parentElement.querySelector('small');

  // Check if empty
  if (usernameValue === ""){
    username.parentElement.classList.remove("success");
    username.parentElement.classList.add("error");
    usernameError.textContent = "Username is required";
    return false
  }

  // Check minimum length
  else if (usernameValue.length < 3){
    username.parentElement.classList.remove("success");
    username.parentElement.classList.add("error");
    usernameError.textContent = "Username must be atleast 3 characers";
    return false
  }

  // If valid
  else {
    username.parentElement.classList.add("success");
    username.parentElement.classList.remove("error");
    usernameError.textContent = '';
    return true
  }
};

function validateEmail(emailValue){
  // Get the small element for error messages
  const emailError = email.parentElement.querySelector('small');

  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if empty
  if (emailValue === ""){
    email.parentElement.classList.remove("success");
    email.parentElement.classList.add("error");
    emailError.textContent = "Email is required";
    return false;
  }

  // Check valid format
  else if(!emailRegex.test(emailValue)){
    email.parentElement.classList.remove("success");
    email.parentElement.classList.add("error");
    emailError.textContent = "Please enter a valid email";
    return false;
  }

  // If valid
  else {
    email.parentElement.classList.add("success");
    email.parentElement.classList.remove("error");
    emailError.textContent = "";
    return true;
  }
};

function validatePassword(passwordValue){
  // Get small element
  const passwordError = password.parentElement.querySelector('small');

  // Regex for: at least 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;

  if (passwordValue === ""){
    password.parentElement.classList.remove("success");
    password.parentElement.classList.add("error");
    passwordError.textContent = "Password is required";
    return false;
  }

  // Check minimum length
  else if (passwordValue.length < 8){
    password.parentElement.classList.add("error");
    password.parentElement.classList.remove("success");
    passwordError.textContent = "Password must be atleast 8 characters";
    return false;
  }
  
  // Check complexity
  else if (!passwordRegex.test(passwordValue)){
    password.parentElement.classList.add("error");
    password.parentElement.classList.remove("success");
    passwordError.textContent = "Must contain 1 uppercase, 1 lowercase, and 1 number";
    return false;
  }

  // If valid
  else{
    password.parentElement.classList.add("success");
    password.parentElement.classList.remove("error");
    passwordError.textContent = "";
    return true
  }
};

function validateConfirmPassword(passwordValue,confirmPasswordValue){
  // Get small element
  const confirmPasswordError = confirmPassword.parentElement.querySelector("small");

  // If empty
  if (confirmPasswordValue === ""){
    confirmPassword.parentElement.classList.add("error");
    confirmPassword.parentElement.classList.remove("success");
    confirmPasswordError.textContent = "Please confirm your password";
    return false;
  }

  else if (passwordValue !== confirmPasswordValue){
    confirmPassword.parentElement.classList.add("error");
    confirmPassword.parentElement.classList.remove("success");
    confirmPasswordError.textContent = "Passwords do not match";
    return false;
  }

  // Valid
  else {
    confirmPassword.parentElement.classList.add("success");
    confirmPassword.parentElement.classList.remove("error");
    confirmPasswordError.textContent = "";
    return true;
  }
};