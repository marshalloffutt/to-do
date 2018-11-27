import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';

const printTasks = (tasksArray) => {
  let taskString = '';
  tasksArray.forEach((task) => {
    if (tasksArray.length) {
      if (task.isCompleted === false) {
        taskString += `
        <div id="${task.id}" data-id=${task.id} class="card text-dark bg-light mb-3 m-2" style="max-width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${task.task}</h5>
          <input class="form-check-input" type="checkbox" value="${task.id}" id="done" data-complete-id=${task.id}>
          <label class="form-check-label" for="done">
              Done
          </label>
          <button class="btn btn-danger delete-btn" data-delete-id=${task.id}><i class="fa fa-trash"></i></button>
          <button class="btn btn-warning edit-btn" data-edit-id=${task.id}><i class="far fa-edit"></i></button>
        </div>
      </div>
        `;
        $('#tasks').html(taskString);
      }
    } else {
      taskString += '<p>You have no open tasks.</p>';
      $('#tasks').html(taskString);
    }
  });
};

const tasksPage = () => {
  tasksData.getAllTasks()
    .then((tasksArray) => {
      printTasks(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  tasksData.deleteTask(idToDelete)
    .then(() => {
      tasksPage();
    })
    .catch((error) => {
      console.error('error in deleting task', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-btn', deleteTask);
};

const initializeTasksPage = () => {
  tasksPage();
  bindEvents();
};

export default initializeTasksPage;
