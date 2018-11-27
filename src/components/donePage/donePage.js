import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import './donePage.scss';

const printCompletedTasks = (tasksArray) => {
  let taskString = '';
  tasksArray.forEach((task) => {
    if (tasksArray.length) {
      if (task.isCompleted === true) {
        taskString += `
        <div id="${task.id}" data-id=${task.id} class="card text-dark bg-light mb-3 m-2" style="max-width: 18rem;">
        <div class="card-body">
          <h5 class="card-title donezo">${task.task}</h5>
        </div>
      </div>
        `;
        $('#done').html(taskString);
      }
    } else {
      taskString += '<p>You have no completed tasks.</p>';
      $('#done').html(taskString);
    }
  });
};

const donePage = () => {
  tasksData.getAllTasks()
    .then((tasksArray) => {
      printCompletedTasks(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const initializeDonePage = () => {
  donePage();
};

export default initializeDonePage;
