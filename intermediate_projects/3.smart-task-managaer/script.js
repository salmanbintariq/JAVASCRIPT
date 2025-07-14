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

  const taskItem = document.createElement('li');

  const taskText = document.createElement("span");
  taskText.textContent = task;

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="ri-edit-box-line"></i>Edit';
  editBtn.className = "edit-btn"

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="ri-delete-bin-fill"></i>Delete';
  deleteBtn.className = "delete-btn"

  taskItem.appendChild(taskText);
  taskItem.appendChild(editBtn);
  taskItem.appendChild(deleteBtn);

  taskList.appendChild(taskItem)

  taskInput.value = "";

  // Delete Button Logic
  deleteBtn.addEventListener('click',()=>{
    if(confirm("Delete this task?")){
      taskItem.remove();
    }
  });

  // Edit Button Logic
  editBtn.addEventListener('click',()=>{
    const newValue = prompt("Edit your task:",taskText.textContent);

    if(newValue !== null && newValue.trim() !== ""){
      taskText.textContent = newValue.trim();
    }
  });
});

