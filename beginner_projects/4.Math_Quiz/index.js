const quizForm = document.getElementById("quiz-form");
const inputElement = document.getElementById("inputNumber");
const btn = document.getElementById("submitbtn");
const questions = document.getElementById("question");
const scoreElement = document.getElementById('score');
const resetBtn = document.getElementById('resetbtn');

let score=Number(localStorage.getItem("score")) || 0;
let currentQuestion={}; // Will hold the current question and correct answer

scoreElement.innerText=score; // Display Initial Score

// Generate Question function
const generateQuestion = ()=>{
  //Generate Two numbers between 1 and 20
  const num1 = Math.floor(Math.random()*10)+1;
  const num2 = Math.floor(Math.random()*10)+1;

  const operators=["+","-","x","÷"];
  const randomOpertor=operators[Math.floor(Math.random()*operators.length)];

  let questionText;
  let answer;

  switch(randomOpertor){
    case "+":
    questionText = `Q. What is ${num1} + ${num2}`;
    answer = num1 + num2;
    break; 
    
    case "-":
    if(num1 >= num2){
      questionText = `Q. What is ${num1} - ${num2}`;
      answer = num1 - num2;
    }else{
      questionText = `Q. What is ${num2} - ${num1}`;
      answer = num2 - num1;
    }  
    break;

    case "x":
    questionText = `Q. What is ${num1} x ${num2}`;
    answer = num1 * num2;
    break;

    case "÷":
    const dividend = num1 * num2  
    questionText = `Q. What is ${dividend} ÷ ${num2}`;
    answer = dividend / num2;
    break;

  }

  // Store question and show it
  currentQuestion={
    question: questionText,
    answer: answer};

  questions.innerText= currentQuestion.question;

};



quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const useranswer = Number(inputElement.value);
  if (useranswer=== currentQuestion.answer){
    score++;
  }else if(score>0){
    score--;
  }
  scoreElement.innerText=score;
  localStorage.setItem("score",score);

  inputElement.value = ""; //Clear input after each submit

  // Load next question
  generateQuestion();
});

//DOMContentLoaded means: “Run this code when the HTML page is fully loaded.”
// Show a random question when the page loads
window.addEventListener('DOMContentLoaded',generateQuestion);


// Reset Score
resetBtn.addEventListener('click',()=>{
  localStorage.setItem("score",0)
  score=0;
  scoreElement.innerText=score;
})