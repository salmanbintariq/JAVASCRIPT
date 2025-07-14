const themeBtn = document.getElementById('themeToggle');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

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

  createTaskItem(task);
  saveTasksToLocalStorage();
  taskInput.value = "";
});

// Add task function
function createTaskItem(taskTextStr, isCompleted = false) {
  const taskItem = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = taskTextStr;

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="ri-edit-box-line"></i> Edit';
  editBtn.className = "edit-btn";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="ri-delete-bin-fill"></i> Delete';
  deleteBtn.className = "delete-btn";

  taskItem.appendChild(taskText);
  taskItem.appendChild(editBtn);
  taskItem.appendChild(deleteBtn);

  if (isCompleted) taskItem.classList.add("completed");

  // Event Listeners
  taskText.addEventListener("click", () => {
    taskItem.classList.toggle("completed");
    saveTasksToLocalStorage();
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Delete this task?")) {
      taskItem.remove();
      saveTasksToLocalStorage();
    }
  });

  editBtn.addEventListener("click", () => {
    const newValue = prompt("Edit your task:", taskText.textContent);
    if (newValue && newValue.trim() !== "") {
      taskText.textContent = newValue.trim();
      saveTasksToLocalStorage();
    }
  });

  taskList.appendChild(taskItem);
}


// Save to localstorage
function saveTasksToLocalStorage(){
  const allTasks = []

  taskList.querySelectorAll('li').forEach((li) => {
    const taskText = li.querySelector('span').textContent;
    const isCompleted = li.classList.contains('completed');
    allTasks.push({task:taskText, completed:isCompleted});
  });

  localStorage.setItem("tasks",JSON.stringify(allTasks))
}

// Load tasks from localstorage
function loadTasksFromLoacalStorage(){
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(taskObj => {
    createTaskItem(taskObj.task, taskObj.completed);
  });
}

loadTasksFromLoacalStorage();