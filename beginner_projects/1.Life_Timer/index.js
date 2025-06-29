let isDOBOpen = false;
let dateOfBirth;
const settingIconEl = document.querySelector('#settingIcon');
const settingContentEl = document.querySelector('#settingContent');
const initialContentEl = document.querySelector('#initialContent');
const afterContentEl = document.querySelector('#afterContent');
const dobButton = document.querySelector('#dobBtn');
const dobInputEl = document.querySelector('#dobinput');

const yearEl = document.querySelector('#year');
const monthEl = document.querySelector('#month');
const dayEl = document.querySelector('#day');
const hourEl = document.querySelector('#hour');
const minuteEl = document.querySelector('#minute');
const secondEl = document.querySelector('#second');

// Initialize interval variable
let ageInterval = null;

// Load saved DOB and start timer if exists
window.addEventListener('DOMContentLoaded', () => {
    const savedDOB = localStorage.getItem('dob');
    if (savedDOB) {
        dateOfBirth = savedDOB;
        dobInputEl.value = savedDOB;
        initialContentEl.classList.add('hide');
        afterContentEl.classList.remove('hide');
        updateAge(); // Update immediately
        ageInterval = setInterval(updateAge, 1000); // Start interval
    }
});

// Format numbers to two digits
const twoDigitNum = (number) => {
    return number > 9 ? number : `0${number}`;
};

// Toggle settings visibility
const toggleDOB = () => {
    settingContentEl.classList.toggle('hide');
    isDOBOpen = !isDOBOpen;
};

//------- Set DOB and start timer-------
const setDOB = () => {
    const newDOB = dobInputEl.value.trim();
    
    if (!newDOB || isNaN(new Date(newDOB).getTime())) {
        alert("Please enter a valid date");
        return;
    }
    
    // Clear previous interval
    if (ageInterval) {
        clearInterval(ageInterval);
    }
    
    dateOfBirth = newDOB;
    localStorage.setItem('dob', dateOfBirth);
    
    initialContentEl.classList.add('hide');
    afterContentEl.classList.remove('hide');
    
    updateAge(); // Update immediately
    ageInterval = setInterval(updateAge, 1000); // Start new interval
};

//--------- Calculate and display age------
const updateAge = () => {
    if (!dateOfBirth) return;

    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const dateDiff = currentDate - birthDate;

    // Calculate time units
    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 30.44)) % 12);
    const day = Math.floor((dateDiff / (1000 * 60 * 60 * 24)) % 30);
    const hour = Math.floor((dateDiff / (1000 * 60 * 60)) % 24);
    const minute = Math.floor((dateDiff / (1000 * 60)) % 60);
    const second = Math.floor((dateDiff / 1000) % 60);

    // Update DOM elements
    yearEl.textContent = twoDigitNum(year);
    monthEl.textContent = twoDigitNum(month);
    dayEl.textContent = twoDigitNum(day);
    hourEl.textContent = twoDigitNum(hour);
    minuteEl.textContent = twoDigitNum(minute);
    secondEl.textContent = twoDigitNum(second);
};

// Event listeners
settingIconEl.addEventListener('click', toggleDOB);
dobButton.addEventListener('click', setDOB);