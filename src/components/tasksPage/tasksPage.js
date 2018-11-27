import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import './tasksPage.scss';

const printTasks = (tasksArray) => {
  let taskString = '';
  tasksArray.forEach((task) => {
    if (task.isCompleted === false) {
      taskString += `
        <div id="${task.id}" data-id=${task.id} class="card text-dark bg-light mb-3 m-2" style="max-width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${task.task}</h5>
          <input class="form-check-input" type="checkbox" value="${task.id}" id="finish-task" data-complete-id=${task.id}>
          <label class="form-check-label" for="finish-task">
              Done
          </label>
          <button class="btn btn-danger delete-btn" data-delete-id=${task.id}><i class="fa fa-trash"></i></button>
          <button class="btn btn-warning edit-btn" data-edit-id=${task.id}><i class="far fa-edit"></i></button>
        </div>
      </div>
        `;
      $('#tasks').html(taskString);
    }
  });
};

const printFinishedTasks = (tasksArray) => {
  let taskString = '';
  tasksArray.forEach((task) => {
    if (task.isCompleted === true) {
      taskString += `
          <div id="${task.id}" data-id=${task.id} class="card text-dark bg-light mb-3 m-2" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title donezo">${task.task}</h5>
            </div>
          </div>
        `;
    } $('#completed').html(taskString);
  });
};

const tasksPage = () => {
  tasksData.getAllTasks()
    .then((tasksArray) => {
      printTasks(tasksArray);
      printFinishedTasks(tasksArray);
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
