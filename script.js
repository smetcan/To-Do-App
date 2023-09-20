// Bekleyen görevleri ve tamamlanan görevleri depolamak için kullanacağımız dizi
let pendingTasks = [];
let completedTasks = [];

// Sayfa yüklendiğinde localStorage'dan verileri al
window.onload = function () {
    loadTasks();
};

// Görev ekleme fonksiyonu
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Lütfen bir görev girin.");
        return;
    }

    pendingTasks.push(taskText);
    saveTasks();
    taskInput.value = "";

    // Görevleri listeye ekle
    displayTasks();

    // Eklendikten sonra inputa odaklan
    taskInput.focus();
}

// Klavyeden "Enter" tuşuna basıldığında da "addTask" fonksiyonunu çalıştır
document.getElementById("taskInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Görevleri gösterme fonksiyonu
function displayTasks() {
    const pendingTasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");

    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    pendingTasks.forEach(function (task, index) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${task} 
            <button onclick="completeTask(${index})">Tamamlandı</button>
            <button onclick="deleteTask(${index}, 'pending')">Sil</button>
        `;
        pendingTasksList.appendChild(listItem);
    });

    completedTasks.forEach(function (task, index) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${task}
            <button onclick="deleteTask(${index}, 'completed')">Sil</button>
        `;
        completedTasksList.appendChild(listItem);
    });
}

// Görevi tamamlama fonksiyonu
function completeTask(index) {
    const task = pendingTasks[index];
    completedTasks.push(task);
    pendingTasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Görevi silme fonksiyonu
function deleteTask(index, type) {
    if (type === "pending") {
        pendingTasks.splice(index, 1);
    } else if (type === "completed") {
        completedTasks.splice(index, 1);
    }
    saveTasks();
    displayTasks();
}

// Görevleri localStorage'a kaydetme fonksiyonu
function saveTasks() {
    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// Görevleri localStorage'dan yükleme fonksiyonu
function loadTasks() {
    const storedPendingTasks = localStorage.getItem("pendingTasks");
    const storedCompletedTasks = localStorage.getItem("completedTasks");

    if (storedPendingTasks) {
        pendingTasks = JSON.parse(storedPendingTasks);
    }

    if (storedCompletedTasks) {
        completedTasks = JSON.parse(storedCompletedTasks);
    }

    displayTasks();
}

// Görevleri temizleme fonksiyonu
function clearTasks() {
    pendingTasks = [];
    completedTasks = [];
    saveTasks();
    displayTasks();
}
