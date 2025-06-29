// ====================== DOM ELEMENTS ====================== //
// Get all the input fields and the form from the HTML
const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// ====================== FORM SUBMISSION HANDLER ====================== //
form.addEventListener("submit", function (e) {
  // Prevent the form from reloading the page
  e.preventDefault();

  // Step 1: Check if all required fields are filled
  const isRequiredValid = checkRequired([username, email, password, confirmPassword]);

  // Assume form is valid only if required fields are filled
  let formValid = isRequiredValid;

  // Step 2: If required fields are valid, check further validations
  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);        // Username: 3–15 chars
    const isEmailValid = checkEmail(email);                      // Email format check
    const isPasswordValid = checkLength(password, 6, 25);        // Password: 6–25 chars
    const isPasswordsMatch = checkPasswordMatch(password, confirmPassword); // Match check

    // Final form validation check
    formValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }

  // Step 3: If all validations pass, show success and reset form
  if (formValid) {
    alert('Registration successful');

    // Delay reset for UX (e.g., showing success styling briefly)
    setTimeout(() => {
      form.reset(); // Clear input fields

      // Reset all form styles and error messages
      document.querySelectorAll(".form-group").forEach(group => {
        group.className = "form-group"; // Remove error/success classes
        group.querySelector("small").style.visibility = "hidden"; // Hide message
      });
    }, 1000);
  }
});

// ====================== VALIDATION FUNCTIONS ====================== //

/**
 * Check if all required fields are filled
 * @param {Array} inputArray - List of input elements
 * @returns {boolean} - True if all fields are non-empty
 */
function checkRequired(inputArray) {
  let isValid = true;

  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      // If input is empty, show error
      showError(input, `${getFieldName(input)} is required`);
      isValid = false;
    } else {
      // Input is filled, show success
      showSuccess(input);
    }
  });

  return isValid;
}

/**
 * Convert input ID to readable field name for messages
 * Example: confirmPassword → Confirm password
 * @param {HTMLElement} input - Input field
 * @returns {string} - Formatted field name
 */
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1).replace(/([A-Z])/g, ' $1');
}

/**
 * Show an error message below the input field
 * @param {HTMLElement} input - Input with error
 * @param {string} message - Message to display
 */
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error"; // Add error class
  const small = formGroup.querySelector('small');
  small.innerText = message; // Set message text
  small.style.visibility = 'visible'; // Make message visible
}

/**
 * Mark input field as valid (success)
 * @param {HTMLElement} input - Validated input
 */
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success"; // Add success class
  const small = formGroup.querySelector('small');
  small.innerText = ''; // Clear any old messages
  small.style.visibility = 'hidden'; // Hide the message
}

/**
 * Validate input length is within a range
 * @param {HTMLElement} input - Input field
 * @param {number} min - Minimum allowed length
 * @param {number} max - Maximum allowed length
 * @returns {boolean} - True if input length is valid
 */
function checkLength(input, min, max) {
  const value = input.value.trim();

  if (value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    return false;
  } else if (value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

/**
 * Check if the email address is valid
 * @param {HTMLElement} input - Email input field
 * @returns {boolean} - True if email matches regex pattern
 */
function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = re.test(input.value.trim());

  if (!isValid) {
    showError(input, 'Please enter a valid email address');
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

/**
 * Check if password and confirm password match
 * @param {HTMLElement} passwordInput - Password input
 * @param {HTMLElement} confirmInput - Confirm password input
 * @returns {boolean} - True if passwords are equal
 */
function checkPasswordMatch(passwordInput, confirmInput) {
  if (passwordInput.value !== confirmInput.value) {
    showError(confirmInput, 'Passwords do not match');
    return false;
  } else {
    showSuccess(confirmInput);
    return true;
  }
}
