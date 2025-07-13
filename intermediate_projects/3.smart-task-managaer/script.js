const themeBtn = document.getElementById('themeToggle');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');

  if(document.body.classList.contains('dark')){
    themeBtn.textContent = "☀️ Light Mode";
  }else{
    themeBtn.textContent = "🌙 Dark Mode";
  };

});

taskForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task === ""){
    alert("Please enter a task!")
    return
  };


})