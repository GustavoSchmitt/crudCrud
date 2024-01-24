const chave = '6b112eb458064bf3a2a6f2478228a92f/tasks';
const apiUrl = `https://crudcrud.com/api/${chave}`;



function fetchTasks() {
    const taskList = document.getElementById('taskList');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            taskList.innerHTML = '';
            data.forEach(task => {
                const listItem = document.createElement('li');
                listItem.textContent = `Tarefa: ${task.text}, Categoria: ${task.category}, Data: ${formatDate(task.date)}`;

                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.onclick = () => openEditModal(task._id, task.text, task.category, task.date);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.onclick = () => deleteTask(task._id);

                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);
                taskList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erro ao buscar tarefas:', error));
}

function submitEditForm(event) {
    event.preventDefault();

    const editTaskInput = document.getElementById('editTask');
    const editCategoryInput = document.getElementById('editCategory');
    const editDateInput = document.getElementById('editDate');
    const editTaskIdInput = document.getElementById('editTaskId');

    const newText = editTaskInput.value.trim();
    const newCategory = editCategoryInput.value;
    const newDate = editDateInput.value;
    const taskId = editTaskIdInput.value;

    if (newText === '') {
        alert('Por favor, insira uma tarefa válida.');
        return;
    }

    fetch(`${apiUrl}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText, category: newCategory, date: newDate }),
    })
        .then(response => {
            if (response.ok) {
                console.log('Tarefa atualizada com sucesso.');
                closeEditModal();
                fetchTasks();
            } else {
                console.error('Erro ao atualizar tarefa.');
            }
        })
        .catch(error => console.error('Erro ao atualizar tarefa:', error));
}

function deleteTask(taskId) {
    fetch(`${apiUrl}/${taskId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                console.log('Tarefa excluída com sucesso.');
                fetchTasks();
            } else {
                console.error('Erro ao excluir tarefa.');
            }
        })
        .catch(error => console.error('Erro ao excluir tarefa:', error));
}

function postTask(data){
    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Tarefa criada:', data);
        cleanForm()
        fetchTasks();
      })
      .catch(error => console.error('Erro ao criar tarefa:', error));
}