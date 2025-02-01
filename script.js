document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});


function addTask() {
    let subject = document.getElementById("subject").value;
    let topic = document.getElementById("topic").value;
    let deadline = document.getElementById("deadline").value;

    if (subject && topic && deadline) {
        let taskList = document.getElementById("taskList");
        let li = document.createElement("li");
        li.classList.add("task"); 
        
        
        li.innerHTML = `
            <span>${subject} - ${topic} (Deadline: ${deadline})</span>
            <button class="complete-btn" onclick="markCompleted(this)">Mark as Completed</button>
        `;
        
        taskList.appendChild(li);

        
        saveTasks();
    } else {
        alert("Please fill all fields!");
    }
}

// Mark Task as Completed
function markCompleted(button) {
    let taskItem = button.parentElement;

    // Toggle the 'completed' class
    taskItem.classList.toggle('completed');

    // Update localStorage to reflect the new state
    saveTasks();
}


function saveTasks() {
    let taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", taskList);
}


function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        document.getElementById("taskList").innerHTML = storedTasks;
    }
    
    
    const taskItems = document.querySelectorAll("#taskList li");
    taskItems.forEach(task => {
        const button = task.querySelector('.complete-btn');
        if (button) {
            button.addEventListener('click', () => markCompleted(button));
        }
    });
}
