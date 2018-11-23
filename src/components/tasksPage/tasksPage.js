import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';

const printTasks = (tasksArray) => {
  let taskString = '';
  tasksArray.forEach((task) => {
    if (tasksArray.length) {
      taskString += `
        <div data-id=${task.id} class="card text-dark bg-light mb-3 m-2" style="max-width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${task.task}</h5>
            <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
            <button class="btn btn-warning edit-btn">Edit</button>
            <button class="btn btn-success done-btn">Done!</button>
          </div>
        </div>
      `;
      $('#tasks').html(taskString);
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
