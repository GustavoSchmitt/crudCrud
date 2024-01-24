// Iniciar o relógio e atualizar a cada segundo
setInterval(updateClock, 1000);

// Carregar tarefas ao carregar a página
window.onload = () => {
  fetchTasks();
  updateClock();
};

function createElement(tag, attributes = {}, content) {
  const element = document.createElement(tag);
  element.textContent = content

  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });

  return element;
}

function cleanForm() {
  const taskInput = document.getElementById('task');
  const categoryInput = document.getElementById('category');
  const dateInput = document.getElementById('date');

  taskInput.value = '';
  categoryInput.value = 'trabalho';
  dateInput.value = '';
}

function openEditModal(taskId, currentText, currentCategory, currentDate) {
  const divModal = document.getElementById('divModal')
  const editModal = createElement('div', {
    id: 'editModal',
    class: 'modal',
  });
  editModal.onclick = (event) => closeModalOnClickOutside(event)

  const modalContent = createElement('div', {
    class: 'modal-content',
  });
  modalContent.onclick = (event) => event.stopPropagation()

  const closeButton = createElement('button', {
    type: 'button',
    class: 'btn btn-danger fw-bold'
  },
    'X'
  );
  closeButton.onclick = () => cancelEdit()

  const form = createElement('form', { id: 'editForm'});
  form.onsubmit = (event) => submitEditForm(event)

  const labelTask = createElement('label', { for: 'editTask' }, 'Editar Tarefa:');
  const inputTask = createElement('input', { type: 'text', id: 'editTask', value: currentText, required: true });

  const labelCategory = createElement('label', { for: 'editCategory' }, 'Editar Categoria:');
  const selectCategory = createElement('select', { id: 'editCategory', required: true });

  const categories = ['trabalho', 'estudo', 'domesticas', 'lazer', 'saude', 'atividade-fisica'];
  categories.forEach(category => {
    const option = createElement('option', { value: category }, category.charAt(0).toUpperCase() + category.slice(1));
    selectCategory.appendChild(option);
  });

  const labelDate = createElement('label', { for: 'editDate' }, 'Editar Data:');
  const inputDate = createElement('input', { type: 'date', id: 'editDate', value: currentDate, required: true });

  const hiddenTaskId = createElement('input', { type: 'hidden', id: 'editTaskId', value: taskId });

  const buttonSubmit = createElement('button', {
    type: 'submit',
    class: 'btn btn-success fw-bold'

  }, 'Salvar');


  form.append(
    labelTask,
    inputTask,
    selectCategory,
    labelDate,
    inputDate,
    hiddenTaskId,
    buttonSubmit
  );

  modalContent.append(closeButton, form);

  editModal.append(modalContent);

  // Adiciona a modal ao corpo do documento
  divModal.append(editModal);

  // Exibir a modal de edição
  editModal.style.display = 'flex';
}


function cancelEdit() {
  // Implementação do serviço para cancelar a edição
  const editModal = document.getElementById('editModal');
  if (editModal) {
    editModal.style.display = 'none';
    editModal.parentNode.removeChild(editModal);
  }
}

function closeEditModal() {
  const editModal = document.getElementById('editModal');
  editModal.style.display = 'none';
}


function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  const hour = createElement('h2', {
    class: 'fw-bold'
  })

  const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = now.toLocaleDateString(undefined, dateOptions);

  const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedTime = now.toLocaleTimeString(undefined, timeOptions);

  clockElement.textContent = `${formattedDate}`;
  clockElement.append(hour)
  hour.textContent = formattedTime
}


function formatDate(dateString) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-br', options);
}