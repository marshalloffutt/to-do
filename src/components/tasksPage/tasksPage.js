import $ from 'jquery';
import getAllTasks from '../../helpers/data/tasksData';

const printTasks = (tasksArray) => {
  let taskString = '';
  tasksArray.forEach((task) => {
    if (tasksArray.length) {
      taskString += `
        <div data-id=${task.id} class="card text-dark bg-light mb-3" style="max-width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${task.task}</h5>
            <button class="btn btn-danger">Delete</button>
            <button class="btn btn-warning">Edit</button>
            <button class="btn btn-success">Done!</button>
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
  getAllTasks()
    .then((tasksArray) => {
      printTasks(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

export default tasksPage;
