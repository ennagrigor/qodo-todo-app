document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const themeSwitch = document.getElementById('theme-switch');
    

    // Theme switching logic
    function setTheme(mode) {
        const themeLabel = document.getElementById('theme-label');
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeSwitch) themeSwitch.classList.add('active');
            if (themeLabel) themeLabel.textContent = 'Dark Mode';
        } else {
            document.body.classList.remove('dark-mode');
            if (themeSwitch) themeSwitch.classList.remove('active');
            if (themeLabel) themeLabel.textContent = 'Light Mode';
        }
        localStorage.setItem('theme', mode);
    }
    function toggleTheme() {
        const isDark = document.body.classList.contains('dark-mode');
        setTheme(isDark ? 'light' : 'dark');
        
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' ? 'dark' : 'light');
    if (themeSwitch) themeSwitch.onclick = toggleTheme;

    // Create error message element
    let errorMsg = document.createElement('div');
    errorMsg.id = 'error-msg';
    errorMsg.style.color = 'red';
    errorMsg.style.margin = '8px 0';
    form.parentNode.insertBefore(errorMsg, form.nextSibling);
    

    const MAX_LENGTH = 250;

    let todos = [];
    
    // Load todos from localStorage if available
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
    try {
    todos = JSON.parse(savedTodos);
    } catch (e) {
    todos = [];
    }
    }
    
    // Save todos from localStorage if available
    function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');

        if (todo.editing) {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = todo.text;
            editInput.className = 'edit-input';
            editInput.addEventListener('input', function(e) {
                if (editInput.value.length > MAX_LENGTH) {
                    showError('Task cannot exceed 250 characters.');
                    editInput.value = editInput.value.slice(0, MAX_LENGTH);
                } else {
                    clearError();
                }
            });
            editInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    saveEdit(idx, editInput.value);
                } else if (e.key === 'Escape') {
                    cancelEdit(idx);
                }
            });
            li.appendChild(editInput);
            editInput.focus();
        } else {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleComplete(idx));
            li.appendChild(checkbox);

            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = todo.text;
            li.appendChild(span);
        }

        const actions = document.createElement('div');
        actions.className = 'action-btns';

        if (todo.editing) {
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.onclick = () => saveEdit(idx, li.querySelector('.edit-input').value);
            actions.appendChild(saveBtn);

            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.onclick = () => cancelEdit(idx);
            actions.appendChild(cancelBtn);
        } else {
            const editBtn = document.createElement('button');
            editBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.69 2.86a2.1 2.1 0 0 1 2.97 2.97l-9.6 9.6-3.3.33.33-3.3 9.6-9.6Zm1.56 4.53-2.04-2.04-9.6 9.6-.18 1.8 1.8-.18 9.6-9.6Zm-10.6 8.5 1.8-.18-.18 1.8-1.8.18.18-1.8Z" fill="#00c6fb"/></svg>`;
            editBtn.title = 'Edit';
            editBtn.onclick = () => startEdit(idx);
            actions.appendChild(editBtn);

            const delBtn = document.createElement('button');
            delBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V3h4a1 1 0 1 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5H3a1 1 0 1 1 0-2h4V2Zm7 3H5v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5Zm-5 2a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0V7Z" fill="#ff5c5c"/></svg>`;
            delBtn.title = 'Delete';
            delBtn.onclick = () => deleteTodo(idx);
            actions.appendChild(delBtn);
        }

        li.appendChild(actions);
        list.appendChild(li);
    });
    saveTodos(); // Save todos after rendering (after any change)
}

    function showError(msg) {
        errorMsg.textContent = msg;
    }
    function clearError() {
        errorMsg.textContent = '';
    }

    // Add ToDo to list
    function addTodo(text) {
    todos.push({ text, completed: false, editing: false });
    renderTodos();
    }
    
    // Delete ToDo from list
    function deleteTodo(idx) {
    todos.splice(idx, 1);
    renderTodos();
    }
    
    function toggleComplete(idx) {
    todos[idx].completed = !todos[idx].completed;
    renderTodos();
    }
    
    function startEdit(idx) {
    todos[idx].editing = true;
    renderTodos();
    }
    
    // Textbox validations on save
    function saveEdit(idx, newText) {
    const trimmed = newText.trim();
    if (trimmed === '') {
    showError('Task cannot be empty or just spaces.');
    return;
    }
    if (trimmed.length > 250) {
    showError('Task cannot exceed 250 characters.');
    return;
    }
    todos[idx].text = trimmed;
    todos[idx].editing = false;
    clearError();
    renderTodos();
    }
    
    function cancelEdit(idx) {
    todos[idx].editing = false;
    renderTodos();
    }

    // Textbox validations on submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const value = input.value;
        const trimmed = value.trim();
        if (trimmed === '') {
            showError('Task cannot be empty or just spaces.');
            return;
        }
        if (trimmed.length > 250) {
            showError('Task cannot exceed 250 characters.');
            return;
        }
        addTodo(trimmed);
        input.value = '';
        clearError();
    });

    // Limit input to 250 characters in the input box
    input.addEventListener('input', function() {
        if (input.value.length > MAX_LENGTH) {
            showError('Task cannot exceed 250 characters.');
            input.value = input.value.slice(0, MAX_LENGTH);
        } else {
            clearError();
        }
    });

    renderTodos();
});
