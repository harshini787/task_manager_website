const API = window.location.origin;

let token = localStorage.getItem("token");

function createNotificationContainer() {
    let container = document.getElementById("notification");

    if (!container) {
        container = document.createElement("div");
        container.id = "notification";
        container.className = "notification-banner";
        document.body.appendChild(container);
    }

    return container;
}

function showNotification(message, type = "success") {
    const container = createNotificationContainer();

    container.textContent = message;
    container.className = `notification-banner ${type} show`;

    setTimeout(() => {
        container.classList.remove("show");
    }, 3000);
}

async function registerUser(){

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch(`${API}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await response.json();

    if (response.ok) {
        showNotification(data.message || 'Registered successfully', 'success');
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    } else {
        showNotification(data.detail || data.message || 'Registration failed', 'error');
    }
}

async function loginUser(){

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${API}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token",data.access_token);
        showNotification('Login successful', 'success');
        setTimeout(() => {
            window.location.href = "tasks.html";
        }, 1000);
    } else {
        showNotification(data.detail || data.message || 'Login failed', 'error');
    }
}

async function createTask(){

    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    await fetch(`${API}/tasks/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
        body:JSON.stringify({
            title,
            description
        })
    });

    loadTasks();
}

async function loadTasks(completed=null){

    let url = `${API}/tasks/`;

    if(completed !== null){
        url += `?completed=${completed}`;
    }

    const response = await fetch(url,{
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    });

    const tasks = await response.json();

    const taskContainer = document.getElementById("tasks");

    taskContainer.innerHTML = "";

    tasks.forEach(task=>{

        const div = document.createElement("div");

        div.classList.add("task");

        if(task.completed){
            div.classList.add("completed");
        }

        div.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>

            <button onclick="completeTask(${task.id})">
                Complete
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        taskContainer.appendChild(div);
    });
}

async function completeTask(id){

    await fetch(`${API}/tasks/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
        body:JSON.stringify({
            completed:true
        })
    });

    loadTasks();
}

async function deleteTask(id){

    await fetch(`${API}/tasks/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    });

    loadTasks();
}

function logoutUser(){

    localStorage.removeItem("token");

    window.location.href = "login.html";
}

if(window.location.pathname.includes("tasks.html")){
    loadTasks();
}