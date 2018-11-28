import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import initializeTasksPage from '../tasksPage/tasksPage';

const formBuilder = (task) => {
  const form = `
    <div class="form-group">
    <label for="form-task-name">Task:</label>
    <input type="text" class="form-control" value="${task.task}" id="form-task-name" placeholder="Enter task">
  </div>
  `;
  return form;
};

const gettingTaskFromEdit = (task) => {
  const editedTask = {
    task,
    isCompleted: false,
  };
  return editedTask;
};

const gettingTaskFromInputField = () => {
  const task = {
    task: $('#inputField').val(),
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
  const newTask = gettingTaskFromInputField();
  tasksData.addNewTask(newTask)
    .then(() => {
      initializeTasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const editTaskField = (e) => {
  const idToEdit = e.target.dataset.editId;
  const stuff = $(e.target).closest('.test').siblings('.card-title')[0];
  const divHtml = $(e.target).closest('.test').siblings('.card-title')[0].innerText;
  const editableText = `<input type="text" data-input-id="${idToEdit}"class="input" value="${divHtml}"/>`;
  $(stuff).replaceWith(editableText);
};

const updateTask = (taskId) => {
  console.log(taskId);
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
        });
    })
    .catch((error) => {
      console.error('error in finishing task', error);
    });
};

$('body').on('keyup', '#inputField', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    addNewTask();
    $('#inputField').val('');
  }
});

$('body').on('keyup', '.input', (e) => {
  if (e.keyCode === 13) {
    const editedText = e.target.value;
    const editId = e.target.dataset.inputId;
    tasksData.updateTask(gettingTaskFromEdit(editedText), editId)
      .then(() => {
        initializeTasksPage();
      });
  }
});

$('body').on('click', '.edit-btn', editTaskField);
$('body').on('click', '#edit-task', updateTask);
$('body').on('click', '#finish-task', finishTask);

export default buildAddForm;
