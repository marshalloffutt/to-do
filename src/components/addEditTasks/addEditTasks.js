import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import initializeTasksPage from '../tasksPage/tasksPage';
import initializeDonePage from '../donePage/donePage';

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
      initializeTasksPage();
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
      domString += `<button class="btn btn-success" id="edit-task" data-single-edit-id=${singleTask.id}>Save Changes</button>`;
      $('#add-edit-task').html(domString).show();
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
      initializeTasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const finishTask = (e) => {
  const idToComplete = e.target.dataset.completeId;
  tasksData.getSingleTask(idToComplete)
    .then((singleTask) => {
      const finishedTask = {
        task: singleTask.task,
        isCompleted: true,
      };
      tasksData.updateTask(finishedTask, idToComplete)
        .then(() => {
          initializeTasksPage();
          initializeDonePage();
        });
    })
    .catch((error) => {
      console.error('error in finishing task', error);
    });
};

$('body').on('click', '#add-task', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);
$('body').on('click', '.done-btn', finishTask);

export default buildAddForm;
