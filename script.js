// Data Management
let data = {
    projects: [],
    tasks: [],
    personnel: [],
    materials: [],
    activityLog: []
};

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('constructionAgenda');
    if (savedData) {
        data = JSON.parse(savedData);
    }
    updateUI();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('constructionAgenda', JSON.stringify(data));
    updateUI();
}

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        this.classList.add('active');
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    updateSelectOptions();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.querySelectorAll('form').forEach(form => form.reset());
    
    // Reset hidden fields and titles
    document.getElementById('project-id').value = '';
    document.getElementById('task-id').value = '';
    document.getElementById('personnel-id').value = '';
    document.getElementById('material-id').value = '';
    
    document.getElementById('project-modal-title').textContent = 'Nuevo Proyecto';
    document.getElementById('task-modal-title').textContent = 'Nueva Tarea';
    document.getElementById('personnel-modal-title').textContent = 'Nuevo Personal';
    document.getElementById('material-modal-title').textContent = 'Nuevo Material';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Update select options in forms
function updateSelectOptions() {
    // Update project selects
    const projectSelects = document.querySelectorAll('#task-project, #material-project');
    projectSelects.forEach(select => {
        select.innerHTML = '<option value="">Seleccionar proyecto</option>';
        data.projects.forEach(project => {
            select.innerHTML += `<option value="${project.id}">${project.name}</option>`;
        });
    });

    // Update personnel select
    const personnelSelect = document.getElementById('task-assignee');
    personnelSelect.innerHTML = '<option value="">Sin asignar</option>';
    data.personnel.filter(p => p.status === 'active').forEach(person => {
        personnelSelect.innerHTML += `<option value="${person.id}">${person.name}</option>`;
    });
}

// Projects Management
function saveProject(event) {
    event.preventDefault();
    
    const projectId = document.getElementById('project-id').value;
    const projectData = {
        name: document.getElementById('project-name').value,
        client: document.getElementById('project-client').value,
        location: document.getElementById('project-location').value,
        startDate: document.getElementById('project-start-date').value,
        endDate: document.getElementById('project-end-date').value,
        budget: parseFloat(document.getElementById('project-budget').value),
        status: document.getElementById('project-status').value,
        description: document.getElementById('project-description').value
    };

    if (projectId) {
        // Editar proyecto existente
        const index = data.projects.findIndex(p => p.id === parseInt(projectId));
        if (index !== -1) {
            data.projects[index] = { ...data.projects[index], ...projectData, updatedAt: new Date().toISOString() };
            addActivityLog('Proyecto actualizado: ' + projectData.name);
            triggerN8nWebhook('project_updated', data.projects[index]);
        }
    } else {
        // Crear nuevo proyecto
        const project = {
            id: Date.now(),
            ...projectData,
            createdAt: new Date().toISOString()
        };
        data.projects.push(project);
        addActivityLog('Nuevo proyecto creado: ' + project.name);
        triggerN8nWebhook('project_created', project);
    }

    saveData();
    closeModal('project-modal');
}

function editProject(id) {
    const project = data.projects.find(p => p.id === id);
    if (project) {
        document.getElementById('project-id').value = project.id;
        document.getElementById('project-name').value = project.name;
        document.getElementById('project-client').value = project.client;
        document.getElementById('project-location').value = project.location;
        document.getElementById('project-start-date').value = project.startDate;
        document.getElementById('project-end-date').value = project.endDate;
        document.getElementById('project-budget').value = project.budget;
        document.getElementById('project-status').value = project.status;
        document.getElementById('project-description').value = project.description || '';
        document.getElementById('project-modal-title').textContent = 'Editar Proyecto';
        openModal('project-modal');
    }
}

function deleteProject(id) {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
        const project = data.projects.find(p => p.id === id);
        data.projects = data.projects.filter(p => p.id !== id);
        data.tasks = data.tasks.filter(t => t.projectId !== id);
        data.materials = data.materials.filter(m => m.projectId !== id);
        addActivityLog('Proyecto eliminado: ' + project.name);
        saveData();
    }
}

function updateProjectStatus(id, newStatus) {
    const project = data.projects.find(p => p.id === id);
    if (project) {
        project.status = newStatus;
        addActivityLog('Estado del proyecto actualizado: ' + project.name);
        saveData();
    }
}

// Tasks Management
function saveTask(event) {
    event.preventDefault();
    
    const taskId = document.getElementById('task-id').value;
    const taskData = {
        title: document.getElementById('task-title').value,
        projectId: document.getElementById('task-project').value,
        assigneeId: document.getElementById('task-assignee').value,
        priority: document.getElementById('task-priority').value,
        deadline: document.getElementById('task-deadline').value,
        status: document.getElementById('task-status').value,
        description: document.getElementById('task-description').value
    };

    if (taskId) {
        // Editar tarea existente
        const index = data.tasks.findIndex(t => t.id === parseInt(taskId));
        if (index !== -1) {
            data.tasks[index] = { ...data.tasks[index], ...taskData, updatedAt: new Date().toISOString() };
            addActivityLog('Tarea actualizada: ' + taskData.title);
            triggerN8nWebhook('task_updated', data.tasks[index]);
        }
    } else {
        // Crear nueva tarea
        const task = {
            id: Date.now(),
            ...taskData,
            createdAt: new Date().toISOString()
        };
        data.tasks.push(task);
        addActivityLog('Nueva tarea creada: ' + task.title);
        triggerN8nWebhook('task_created', task);
    }

    saveData();
    closeModal('task-modal');
}

function editTask(id) {
    const task = data.tasks.find(t => t.id === id);
    if (task) {
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-project').value = task.projectId || '';
        document.getElementById('task-assignee').value = task.assigneeId || '';
        document.getElementById('task-priority').value = task.priority;
        document.getElementById('task-deadline').value = task.deadline;
        document.getElementById('task-status').value = task.status;
        document.getElementById('task-description').value = task.description || '';
        document.getElementById('task-modal-title').textContent = 'Editar Tarea';
        updateSelectOptions();
        openModal('task-modal');
    }
}

function deleteTask(id) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        const task = data.tasks.find(t => t.id === id);
        data.tasks = data.tasks.filter(t => t.id !== id);
        addActivityLog('Tarea eliminada: ' + task.title);
        saveData();
    }
}

function updateTaskStatus(id, newStatus) {
    const task = data.tasks.find(t => t.id === id);
    if (task) {
        task.status = newStatus;
        addActivityLog('Estado de tarea actualizado: ' + task.title);
        saveData();
    }
}

function filterTasks() {
    const filter = document.getElementById('task-filter').value;
    renderTasks(filter);
}

// Personnel Management
function savePersonnel(event) {
    event.preventDefault();
    
    const personnelId = document.getElementById('personnel-id').value;
    const personnelData = {
        name: document.getElementById('personnel-name').value,
        role: document.getElementById('personnel-role').value,
        phone: document.getElementById('personnel-phone').value,
        email: document.getElementById('personnel-email').value,
        specialty: document.getElementById('personnel-specialty').value,
        salary: parseFloat(document.getElementById('personnel-salary').value),
        status: document.getElementById('personnel-status').value
    };

    if (personnelId) {
        // Editar personal existente
        const index = data.personnel.findIndex(p => p.id === parseInt(personnelId));
        if (index !== -1) {
            data.personnel[index] = { ...data.personnel[index], ...personnelData, updatedAt: new Date().toISOString() };
            addActivityLog('Personal actualizado: ' + personnelData.name);
            triggerN8nWebhook('personnel_updated', data.personnel[index]);
        }
    } else {
        // Crear nuevo personal
        const person = {
            id: Date.now(),
            ...personnelData,
            createdAt: new Date().toISOString()
        };
        data.personnel.push(person);
        addActivityLog('Nuevo personal agregado: ' + person.name);
        triggerN8nWebhook('personnel_created', person);
    }

    saveData();
    closeModal('personnel-modal');
}

function editPersonnel(id) {
    const person = data.personnel.find(p => p.id === id);
    if (person) {
        document.getElementById('personnel-id').value = person.id;
        document.getElementById('personnel-name').value = person.name;
        document.getElementById('personnel-role').value = person.role;
        document.getElementById('personnel-phone').value = person.phone || '';
        document.getElementById('personnel-email').value = person.email || '';
        document.getElementById('personnel-specialty').value = person.specialty || '';
        document.getElementById('personnel-salary').value = person.salary;
        document.getElementById('personnel-status').value = person.status;
        document.getElementById('personnel-modal-title').textContent = 'Editar Personal';
        openModal('personnel-modal');
    }
}

function deletePersonnel(id) {
    if (confirm('¿Estás seguro de eliminar este personal?')) {
        const person = data.personnel.find(p => p.id === id);
        data.personnel = data.personnel.filter(p => p.id !== id);
        addActivityLog('Personal eliminado: ' + person.name);
        saveData();
    }
}

function updatePersonnelStatus(id, newStatus) {
    const person = data.personnel.find(p => p.id === id);
    if (person) {
        person.status = newStatus;
        addActivityLog('Estado de personal actualizado: ' + person.name);
        saveData();
    }
}

// Materials Management
function saveMaterial(event) {
    event.preventDefault();
    
    const materialId = document.getElementById('material-id').value;
    const materialData = {
        name: document.getElementById('material-name').value,
        category: document.getElementById('material-category').value,
        quantity: parseFloat(document.getElementById('material-quantity').value),
        unit: document.getElementById('material-unit').value,
        price: parseFloat(document.getElementById('material-price').value),
        supplier: document.getElementById('material-supplier').value,
        projectId: document.getElementById('material-project').value
    };

    if (materialId) {
        // Editar material existente
        const index = data.materials.findIndex(m => m.id === parseInt(materialId));
        if (index !== -1) {
            data.materials[index] = { ...data.materials[index], ...materialData, updatedAt: new Date().toISOString() };
            addActivityLog('Material actualizado: ' + materialData.name);
        }
    } else {
        // Crear nuevo material
        const material = {
            id: Date.now(),
            ...materialData,
            createdAt: new Date().toISOString()
        };
        data.materials.push(material);
        addActivityLog('Nuevo material agregado: ' + material.name);
    }

    saveData();
    closeModal('material-modal');
}

function editMaterial(id) {
    const material = data.materials.find(m => m.id === id);
    if (material) {
        document.getElementById('material-id').value = material.id;
        document.getElementById('material-name').value = material.name;
        document.getElementById('material-category').value = material.category;
        document.getElementById('material-quantity').value = material.quantity;
        document.getElementById('material-unit').value = material.unit;
        document.getElementById('material-price').value = material.price;
        document.getElementById('material-supplier').value = material.supplier || '';
        document.getElementById('material-project').value = material.projectId || '';
        document.getElementById('material-modal-title').textContent = 'Editar Material';
        updateSelectOptions();
        openModal('material-modal');
    }
}

function deleteMaterial(id) {
    if (confirm('¿Estás seguro de eliminar este material?')) {
        const material = data.materials.find(m => m.id === id);
        data.materials = data.materials.filter(m => m.id !== id);
        addActivityLog('Material eliminado: ' + material.name);
        saveData();
    }
}

function updateMaterialQuantity(id, newQuantity) {
    const material = data.materials.find(m => m.id === id);
    if (material) {
        material.quantity = parseFloat(newQuantity);
        addActivityLog('Cantidad de material actualizada: ' + material.name);
        saveData();
    }
}

// Activity Log
function addActivityLog(message) {
    data.activityLog.unshift({
        message: message,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 activities
    if (data.activityLog.length > 50) {
        data.activityLog = data.activityLog.slice(0, 50);
    }
}

// UI Update Functions
function updateUI() {
    updateDashboard();
    renderProjects();
    renderTasks();
    renderPersonnel();
    renderMaterials();
    renderReports();
}

function updateDashboard() {
    // Update stats
    document.getElementById('active-projects').textContent = 
        data.projects.filter(p => p.status === 'in-progress').length;
    document.getElementById('pending-tasks').textContent = 
        data.tasks.filter(t => t.status === 'pending').length;
    document.getElementById('active-personnel').textContent = 
        data.personnel.filter(p => p.status === 'active').length;
    document.getElementById('total-materials').textContent = data.materials.length;

    // Update activity log
    const activityList = document.getElementById('recent-activity-list');
    if (data.activityLog.length > 0) {
        activityList.innerHTML = data.activityLog.slice(0, 5).map(activity => `
            <div class="activity-item">
                <span>${activity.message}</span>
                <span class="time">${formatDate(activity.timestamp)}</span>
            </div>
        `).join('');
    } else {
        activityList.innerHTML = '<p class="no-data">No hay actividad reciente</p>';
    }
}

function renderProjects() {
    const projectsList = document.getElementById('projects-list');
    if (data.projects.length === 0) {
        projectsList.innerHTML = '<p class="no-data">No hay proyectos registrados</p>';
        return;
    }

    projectsList.innerHTML = data.projects.map(project => `
        <div class="card">
            <div class="card-header">
                <div>
                    <div class="card-title">${project.name}</div>
                    <div class="card-subtitle">${project.client}</div>
                </div>
                <span class="card-status status-${project.status}">${getStatusLabel(project.status)}</span>
            </div>
            <div class="card-body">
                <div class="card-info">
                    <span>📍 Ubicación:</span>
                    <strong>${project.location}</strong>
                </div>
                <div class="card-info">
                    <span>📅 Inicio:</span>
                    <strong>${formatDate(project.startDate)}</strong>
                </div>
                <div class="card-info">
                    <span>📅 Fin:</span>
                    <strong>${formatDate(project.endDate)}</strong>
                </div>
                <div class="card-info">
                    <span>💰 Presupuesto:</span>
                    <strong>$${project.budget.toLocaleString()}</strong>
                </div>
            </div>
            <div class="card-actions">
                <button onclick="editProject(${project.id})" class="btn btn-sm btn-secondary">✏️ Editar</button>
                <select onchange="updateProjectStatus(${project.id}, this.value)" class="btn btn-sm btn-secondary">
                    <option value="planning" ${project.status === 'planning' ? 'selected' : ''}>Planificación</option>
                    <option value="in-progress" ${project.status === 'in-progress' ? 'selected' : ''}>En Progreso</option>
                    <option value="completed" ${project.status === 'completed' ? 'selected' : ''}>Completado</option>
                    <option value="on-hold" ${project.status === 'on-hold' ? 'selected' : ''}>En Espera</option>
                </select>
                <button onclick="deleteProject(${project.id})" class="btn btn-sm btn-danger">Eliminar</button>
            </div>
        </div>
    `).join('');
}

function renderTasks(filter = 'all') {
    const tasksList = document.getElementById('tasks-list');
    let filteredTasks = data.tasks;

    if (filter !== 'all') {
        filteredTasks = data.tasks.filter(t => t.status === filter);
    }

    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '<p class="no-data">No hay tareas registradas</p>';
        return;
    }

    tasksList.innerHTML = filteredTasks.map(task => {
        const project = data.projects.find(p => p.id === task.projectId);
        const assignee = data.personnel.find(p => p.id === task.assigneeId);
        
        return `
            <div class="task-item priority-${task.priority}">
                <div class="task-info">
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">
                        🏢 ${project ? project.name : 'Sin proyecto'} | 
                        👷 ${assignee ? assignee.name : 'Sin asignar'} | 
                        📅 ${formatDate(task.deadline)}
                    </div>
                    <div>
                        <span class="task-status ${task.status}">${getStatusLabel(task.status)}</span>
                        <span style="font-size: 0.8em; color: #6c757d;">Prioridad: ${getPriorityLabel(task.priority)}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button onclick="editTask(${task.id})" class="btn btn-sm btn-secondary">✏️ Editar</button>
                    <select onchange="updateTaskStatus(${task.id}, this.value)" class="btn btn-sm btn-secondary">
                        <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pendiente</option>
                        <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>En Progreso</option>
                        <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completada</option>
                    </select>
                    <button onclick="deleteTask(${task.id})" class="btn btn-sm btn-danger">Eliminar</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderPersonnel() {
    const personnelList = document.getElementById('personnel-list');
    if (data.personnel.length === 0) {
        personnelList.innerHTML = '<p class="no-data">No hay personal registrado</p>';
        return;
    }

    personnelList.innerHTML = data.personnel.map(person => `
        <div class="card">
            <div class="card-header">
                <div>
                    <div class="card-title">${person.name}</div>
                    <div class="card-subtitle">${person.role}</div>
                </div>
                <span class="card-status status-${person.status}">${person.status === 'active' ? 'Activo' : 'Inactivo'}</span>
            </div>
            <div class="card-body">
                <div class="card-info">
                    <span>📞 Teléfono:</span>
                    <strong>${person.phone || 'No registrado'}</strong>
                </div>
                <div class="card-info">
                    <span>📧 Email:</span>
                    <strong>${person.email || 'No registrado'}</strong>
                </div>
                <div class="card-info">
                    <span>🔧 Especialidad:</span>
                    <strong>${person.specialty || 'No especificada'}</strong>
                </div>
                <div class="card-info">
                    <span>💰 Salario Diario:</span>
                    <strong>$${person.salary.toLocaleString()}</strong>
                </div>
            </div>
            <div class="card-actions">
                <button onclick="editPersonnel(${person.id})" class="btn btn-sm btn-secondary">✏️ Editar</button>
                <select onchange="updatePersonnelStatus(${person.id}, this.value)" class="btn btn-sm btn-secondary">
                    <option value="active" ${person.status === 'active' ? 'selected' : ''}>Activo</option>
                    <option value="inactive" ${person.status === 'inactive' ? 'selected' : ''}>Inactivo</option>
                </select>
                <button onclick="deletePersonnel(${person.id})" class="btn btn-sm btn-danger">Eliminar</button>
            </div>
        </div>
    `).join('');
}

function renderMaterials() {
    const materialsList = document.getElementById('materials-list');
    if (data.materials.length === 0) {
        materialsList.innerHTML = '<p class="no-data">No hay materiales registrados</p>';
        return;
    }

    materialsList.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                    <th>Proveedor</th>
                    <th>Proyecto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${data.materials.map(material => {
                    const project = data.projects.find(p => p.id === material.projectId);
                    const total = material.quantity * material.price;
                    return `
                        <tr>
                            <td>${material.name}</td>
                            <td>${getCategoryLabel(material.category)}</td>
                            <td>
                                <input type="number" value="${material.quantity}" 
                                       onchange="updateMaterialQuantity(${material.id}, this.value)"
                                       style="width: 80px; padding: 5px;">
                                ${material.unit}
                            </td>
                            <td>$${material.price.toLocaleString()}</td>
                            <td>$${total.toLocaleString()}</td>
                            <td>${material.supplier || 'No especificado'}</td>
                            <td>${project ? project.name : 'Sin asignar'}</td>
                            <td>
                                <button onclick="editMaterial(${material.id})" class="btn btn-sm btn-secondary">✏️ Editar</button>
                                <button onclick="deleteMaterial(${material.id})" class="btn btn-sm btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function renderReports() {
    // Project Summary
    const projectSummary = document.getElementById('project-summary');
    if (data.projects.length > 0) {
        const totalBudget = data.projects.reduce((sum, p) => sum + p.budget, 0);
        const completedProjects = data.projects.filter(p => p.status === 'completed').length;
        
        projectSummary.innerHTML = `
            <div class="card-info">
                <span>Total Proyectos:</span>
                <strong>${data.projects.length}</strong>
            </div>
            <div class="card-info">
                <span>Completados:</span>
                <strong>${completedProjects}</strong>
            </div>
            <div class="card-info">
                <span>En Progreso:</span>
                <strong>${data.projects.filter(p => p.status === 'in-progress').length}</strong>
            </div>
            <div class="card-info">
                <span>Presupuesto Total:</span>
                <strong>$${totalBudget.toLocaleString()}</strong>
            </div>
        `;
    } else {
        projectSummary.innerHTML = '<p class="no-data">No hay datos para mostrar</p>';
    }

    // Task Summary
    const taskSummary = document.getElementById('task-summary');
    if (data.tasks.length > 0) {
        taskSummary.innerHTML = `
            <div class="card-info">
                <span>Total Tareas:</span>
                <strong>${data.tasks.length}</strong>
            </div>
            <div class="card-info">
                <span>Pendientes:</span>
                <strong>${data.tasks.filter(t => t.status === 'pending').length}</strong>
            </div>
            <div class="card-info">
                <span>En Progreso:</span>
                <strong>${data.tasks.filter(t => t.status === 'in-progress').length}</strong>
            </div>
            <div class="card-info">
                <span>Completadas:</span>
                <strong>${data.tasks.filter(t => t.status === 'completed').length}</strong>
            </div>
        `;
    } else {
        taskSummary.innerHTML = '<p class="no-data">No hay datos para mostrar</p>';
    }

    // Material Costs
    const materialCosts = document.getElementById('material-costs');
    if (data.materials.length > 0) {
        const totalCost = data.materials.reduce((sum, m) => sum + (m.quantity * m.price), 0);
        const categoryCosts = {};
        
        data.materials.forEach(material => {
            const cost = material.quantity * material.price;
            categoryCosts[material.category] = (categoryCosts[material.category] || 0) + cost;
        });

        materialCosts.innerHTML = `
            <div class="card-info">
                <span>Costo Total Materiales:</span>
                <strong>$${totalCost.toLocaleString()}</strong>
            </div>
            ${Object.entries(categoryCosts).map(([category, cost]) => `
                <div class="card-info">
                    <span>${getCategoryLabel(category)}:</span>
                    <strong>$${cost.toLocaleString()}</strong>
                </div>
            `).join('')}
        `;
    } else {
        materialCosts.innerHTML = '<p class="no-data">No hay datos para mostrar</p>';
    }
}

// Helper Functions
function formatDate(dateString) {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getStatusLabel(status) {
    const labels = {
        'planning': 'Planificación',
        'in-progress': 'En Progreso',
        'completed': 'Completado',
        'on-hold': 'En Espera',
        'pending': 'Pendiente',
        'active': 'Activo',
        'inactive': 'Inactivo'
    };
    return labels[status] || status;
}

function getPriorityLabel(priority) {
    const labels = {
        'low': 'Baja',
        'medium': 'Media',
        'high': 'Alta',
        'urgent': 'Urgente'
    };
    return labels[priority] || priority;
}

function getCategoryLabel(category) {
    const labels = {
        'cemento': 'Cemento',
        'acero': 'Acero',
        'madera': 'Madera',
        'ceramicos': 'Cerámicos',
        'pinturas': 'Pinturas',
        'electricos': 'Eléctricos',
        'fontanería': 'Fontanería',
        'otros': 'Otros'
    };
    return labels[category] || category;
}

// n8n Webhook Integration
function triggerN8nWebhook(eventType, data) {
    const n8nWebhookURL = 'http://localhost:5678/webhook/agenda-obras';
    
    const payload = {
        eventType: eventType,
        timestamp: new Date().toISOString(),
        data: data,
        source: 'agenda-obras-app'
    };

    fetch(n8nWebhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            console.error('Error al enviar webhook a n8n:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error de conexión con n8n:', error);
    });
}

// Sincronizar todos los datos con n8n
function syncAllDataToN8n() {
    const n8nWebhookURL = 'http://localhost:5678/webhook/agenda-obras';
    
    const payload = {
        eventType: 'full_sync',
        timestamp: new Date().toISOString(),
        data: data,
        source: 'agenda-obras-app'
    };

    fetch(n8nWebhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            addActivityLog('Datos sincronizados con n8n correctamente');
            alert('✅ Datos sincronizados con PostgreSQL correctamente');
        } else {
            console.error('Error al sincronizar con n8n:', response.statusText);
            alert('❌ Error al sincronizar datos con n8n');
        }
    })
    .catch(error => {
        console.error('Error de conexión con n8n:', error);
        alert('❌ Error de conexión con n8n. Verifica que n8n esté funcionando.');
    });
}

// Data Export/Import Functions
function exportData() {
    const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        data: data
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `agenda-obras-${new Date().toISOString().split('T')[0]}.json`;
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
    addActivityLog('Datos exportados correctamente');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (importedData.data && typeof importedData.data === 'object') {
                // Confirmar sobrescritura
                if (confirm('¿Estás seguro de importar estos datos? Se sobrescribirán los datos actuales.')) {
                    data = importedData.data;
                    saveData();
                    addActivityLog('Datos importados correctamente');
                    alert('✅ Datos importados correctamente');
                }
            } else {
                throw new Error('Formato de archivo inválido');
            }
        } catch (error) {
            alert('❌ Error al importar datos: ' + error.message);
        }
    };

    reader.readAsText(file);
    event.target.value = ''; // Reset file input
}

// QR Generator Functions
function generateQR() {
    const url = document.getElementById('qr-url-input').value.trim();
    const loading = document.getElementById('qr-loading');
    const error = document.getElementById('qr-error');
    const success = document.getElementById('qr-success');
    const qrImage = document.getElementById('qr-image');

    // Reset estados
    qrImage.classList.remove('active');
    error.classList.remove('active');
    success.classList.remove('active');
    loading.classList.add('active');

    if (!url) {
        loading.classList.remove('active');
        error.textContent = '❌ Por favor ingresa una URL válida';
        error.classList.add('active');
        return;
    }

    // Validar URL básica
    try {
        new URL(url);
    } catch (e) {
        loading.classList.remove('active');
        error.textContent = '❌ URL inválida. Asegúrate de incluir http:// o https://';
        error.classList.add('active');
        return;
    }

    // Detectar si es URL local y dar advertencia
    if (url.includes('192.168.') || url.includes('localhost') || url.includes('127.0.0.1')) {
        loading.classList.remove('active');
        error.innerHTML = '⚠️ URL LOCAL detectada.<br><br>Para que el QR funcione desde el móvil:<br>1. Asegúrate de que el móvil esté en la misma red WiFi<br>2. Inicia el servidor local: <code>iniciar-servidor.bat</code><br>3. O usa una URL pública (GitHub Pages, Netlify)';
        error.classList.add('active');
        
        // Generar el QR de todos modos pero con advertencia
        setTimeout(() => {
            generateQRInternal(url);
        }, 2000);
        return;
    }

    // Si es URL pública, generar QR sin advertencias
    generateQRInternal(url);
}

function generateQRInternal(url) {
    const loading = document.getElementById('qr-loading');
    const error = document.getElementById('qr-error');
    const success = document.getElementById('qr-success');
    const qrImage = document.getElementById('qr-image');

    // Usar API más confiable para generar QR
    const qrAPI = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;

    // Crear imagen con manejo de errores mejorado
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = function() {
        qrImage.src = qrAPI;
        loading.classList.remove('active');
        qrImage.classList.add('active');
        success.classList.add('active');
        
        // Si es URL local, agregar instrucciones adicionales
        if (url.includes('192.168.') || url.includes('localhost')) {
            success.innerHTML = '✅ QR generado (URL local).<br><br>⚠️ IMPORTANTE: El móvil debe estar en la misma red WiFi y el servidor local debe estar iniciado.';
        }
    };

    img.onerror = function() {
        loading.classList.remove('active');
        // Intentar con API alternativa
        generateQRAlternative(url);
    };

    // Timeout por si la API no responde
    setTimeout(() => {
        if (loading.classList.contains('active')) {
            loading.classList.remove('active');
            generateQRAlternative(url);
        }
    }, 10000);

    img.src = qrAPI;
}

function generateQRAlternative(url) {
    const loading = document.getElementById('qr-loading');
    const error = document.getElementById('qr-error');
    const qrImage = document.getElementById('qr-image');
    const success = document.getElementById('qr-success');

    // Usar API alternativa más confiable
    const alternativeAPI = `https://quickchart.io/qr?text=${encodeURIComponent(url)}&size=300&margin=2`;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = function() {
        qrImage.src = alternativeAPI;
        qrImage.classList.add('active');
        success.classList.add('active');
    };

    img.onerror = function() {
        // Tercera opción: generar QR localmente con biblioteca
        generateQRLocal(url);
    };

    img.src = alternativeAPI;
}

function generateQRLocal(url) {
    const loading = document.getElementById('qr-loading');
    const error = document.getElementById('qr-error');
    const qrImage = document.getElementById('qr-image');
    const success = document.getElementById('qr-success');

    // Opción de respaldo: Usar una API más simple
    const fallbackAPI = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&ecc=L`;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = function() {
        qrImage.src = fallbackAPI;
        qrImage.classList.add('active');
        success.classList.add('active');
    };

    img.onerror = function() {
        loading.classList.remove('active');
        error.textContent = '❌ Error al generar el QR. Verifica tu conexión a internet e intenta nuevamente.';
        error.classList.add('active');
    };

    img.src = fallbackAPI;
}

function detectCurrentURL() {
    const currentURL = window.location.href;
    document.getElementById('qr-url-input').value = currentURL;
    
    if (currentURL.startsWith('http://') || currentURL.startsWith('https://')) {
        generateQR();
    } else {
        alert('📍 La URL actual es local. Para acceso desde móvil, necesitas:\n\n1. Desplegar la app en GitHub Pages, Netlify o Vercel\n2. O usar tu IP local con un servidor HTTP');
    }
}

function testLocalIP() {
    const input = document.getElementById('qr-url-input');
    input.value = 'http://192.168.0.244:8000'; // IP fija del usuario
    
    // Verificar si el servidor está iniciado
    fetch('http://192.168.0.244:8000', { mode: 'no-cors' })
        .then(() => {
            generateQR();
            alert('✅ IP fija configurada: 192.168.0.244\n\n✅ Servidor detectado funcionando\n\nPara que funcione:\n1. Asegúrate de que el móvil esté en la misma red WiFi\n2. Escanea el QR generado');
        })
        .catch(() => {
            alert('⚠️ IP fija configurada: 192.168.0.244\n\n❌ Servidor NO detectado\n\nPara que funcione:\n1. Ejecuta: iniciar-servidor.bat\n2. Asegúrate de que el móvil esté en la misma red WiFi\n3. Luego genera el QR nuevamente');
        });
}

function downloadQR() {
    const qrImage = document.getElementById('qr-image');
    const link = document.createElement('a');
    link.download = 'agenda-obras-qr.png';
    link.href = qrImage.src;
    link.click();
}

function printQR() {
    const qrImage = document.getElementById('qr-image');
    const url = document.getElementById('qr-url-input').value;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Imprimir QR - Agenda de Obras</title>
            <style>
                body { 
                    text-align: center; 
                    padding: 20px; 
                    font-family: Arial, sans-serif;
                }
                h1 { 
                    color: #667eea; 
                    margin-bottom: 10px;
                }
                img { 
                    max-width: 400px; 
                    margin: 20px auto;
                    border: 5px solid #667eea;
                    border-radius: 10px;
                }
                .url {
                    background: #f8f9fa;
                    padding: 10px;
                    border-radius: 5px;
                    margin: 20px auto;
                    max-width: 500px;
                    word-break: break-all;
                }
                .instructions {
                    background: #e7f3ff;
                    padding: 15px;
                    border-radius: 10px;
                    margin: 20px auto;
                    max-width: 500px;
                    text-align: left;
                }
            </style>
        </head>
        <body>
            <h1>📱 Escanea para instalar Agenda de Obras</h1>
            <img src="${qrImage.src}">
            <div class="url"><strong>URL:</strong> ${url}</div>
            <div class="instructions">
                <h3>📋 Instrucciones:</h3>
                <ol>
                    <li>Abre la cámara de tu móvil</li>
                    <li>Escanea este código QR</li>
                    <li>Instala la app como PWA</li>
                </ol>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Initialize
loadData();