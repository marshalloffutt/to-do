import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import initializeTasksPage from '../tasksPage/tasksPage';

const formBuilder = (task) => {
  const form = `
    <div class="form-group">
    <label for="form-task-name">Task:</label>
    <input type="text" class="form-control" value="${task.name}" id="form-task-name" placeholder="Enter task">
  </div>
  `;
  return form;
};

const gettingTaskFromForm = () => {
  const task = {
    name: $('#form-task-name').val(),
    isCompleted: false,
  };
  return task;
};

const buildAddForm = () => {
  const emptyTask = {
    name: '',
    isCompleted: false,
  };
  let domString = '<h2>Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button id="add=task">Save New Task</button>';
  $('#add-edit-task').html(domString).show();
  $('#tasks').hide();
};

const addNewTask = () => {
  const newTask = gettingTaskFromForm();
  tasksData.addNewTask(newTask)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#tasks').show();
      initializeTasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-task', addNewTask);

export default buildAddForm;
