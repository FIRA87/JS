// Находим нужные элементы  (теги) на странице
const formTodo = document.querySelector('#newTaskFrom');
const input = document.querySelector('#addNewTask');
const tasksList = document.querySelector('#list-group');

// Загрузить данные
loadData();

// 1.Добавление новой задачи
// отслеживаем отправку формы

addEventListener('submit', (event) => {
  event.preventDefault(); // отменяем стандартное поведение при отправкее формы (перезагрузка страницы)

  // 
  const taskText = input.value;

  // Формируем разметку для новой задачи
  const taskHTML = `
  	<li class="list-group-item d-flex justify-content-between">
  	  <span contenteditable="true" class="task-title">${taskText}  </span> </div >
      <button type="button" data-action="ready"	class="btn btn-light align-self-end"> Готово </button> 
      <button type = "button"	data-action="delete-task"	class="btn btn-light align-self-end"> Удалить </button>
       </div> 
       </li>
  
  `;

  // Добавляем новую задачу на страницу
  // в тег ul добавляем новый тег li с текстом задачи
  tasksList.insertAdjacentHTML('afterbegin', taskHTML);

  // Скрывать или показывать запись о том что список дел пуст
  toggleEmptyListItem();

  // очиҳаем поле добавления новой задачи
  input.value = '';

  // Возвраҳаем фокус на поле ввода после добавления новой задачи
  input.focus();

  // сохранить данные
  saveData()
})


// 2. Кнопки "ГОТОВО" и "УДАЛИТЬ"
tasksList.addEventListener('click', (event) => {

  // Проверяем что клик произошел по кнопке удалить
  if (event.target.getAttribute('data-action') == 'delete-task') {
    console.log('DELETE');

    // Находим родительский тег <li> по классу list-group-item и удаляем его
    event.target.closest('li').remove();

    // Скрывать или показывать запись о том что список дел пуст
    toggleEmptyListItem();

    // сохранить данные
    saveData()

  }
  // Проверяем что клик произошел по кнопке "Готово"
  else if (event.target.getAttribute('data-action') == 'ready') {

    // Находим родительский тег
    const parentElement = event.target.closest('li.list-group-item');

    // Находим тег span и добавляем к нему дополнительный класс  task-title--done
    parentElement.querySelector('span.task-title').classList.add('task-title--done');

    // Убираем у тега span атрибут contenteditable
    parentElement.querySelector('span.task-title').setAttribute('contenteditable', 'false');

    //  Перемещаем запись в конец списка
    tasksList.insertAdjacentElement('beforeend', parentElement);

    // Удалить кнопку "готово" и "удалить"
    parentElement.querySelector('button[data-action="ready"]').remove();


    // сохранить данные
    saveData()

  }

});

// функция сокрытия или показа сообщение "список дел пуст"
function toggleEmptyListItem() {
  if (tasksList.children.length > 1) {
    document.querySelector('#empty-list-item').style.display = "none";
  } else {
    document.querySelector('#empty-list-item').style.display = "block";
  }

}

// Функция сохранение данных
function saveData() {
  localStorage.setItem('todoList', tasksList.innerHTML);
}

// Функция загрузки данных
function loadData() {
  if (localStorage.getItem('todoList')) {

    tasksList.innerHTML = localStorage.getItem('todoList');


  } else {
    console.log('Нет данных для загрузки!');
  }
}

// Сохраняем данные localStorage
//localStorage.setItem('name', 'Fira');

// Получаем данные из localStorage
//localStorage.getItem('name');