import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import tasksPageStuff from '../tasksPage/tasksPage';

const formBuilder = (task) => {
  const form = `
    <div class="form-group">
    <label for="form-task-name">Task:</label>
    <input type="text" class="form-control" value="${task.task}" id="form-task-name" placeholder="Enter task">
  </div>
  `;
  return form;
};

const gettingTaskFromForm = () => {
  const task = {
    task: $('#form-task-name').val(),
    isCompleted: false,
  };
  return task;
};

const buildAddForm = () => {
  const emptyTask = {
    task: '',
  };
  let domString = '<h2>Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button id="add-task">Save New Task</button>';
  $('#add-edit-task').html(domString).show();
  $('#tasksPage').hide();
};

const addNewTask = () => {
  const newTask = gettingTaskFromForm();
  tasksData.addNewTask(newTask)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#tasksPage').show();
      tasksPageStuff.initializeTasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  tasksData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h2>Edit Task</h2>';
      domString += formBuilder(singleTask);
      domString += `<button id="edit-task" data-single-edit-id=${singleTask.id}>Save Task</button>`;
      $('#add-edit-task').htmlo(domString).show();
      $('#tasksPage').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateTask = (e) => {
  const updatedTask = gettingTaskFromForm();
  const taskId = e.target.dataset.singleEditId;
  tasksData.updateTask(updatedTask, taskId)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#tasksPage').show();
      tasksPageStuff.initializeTasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-task', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);

export default buildAddForm;
