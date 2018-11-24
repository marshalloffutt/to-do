import firebase from 'firebase/app';
import 'bootstrap';
import $ from 'jquery';

import apiKeys from '../db/apiKeys.json';

import createNavbar from './components/navbar/navbar';
import loginButton from './components/auth/auth';
import checkLoginStatus from './helpers/authHelpers';
import tasksPageStuff from './components/tasksPage/tasksPage';
import buildAddForm from './components/addEditTasks/addEditTasks';

import './index.scss';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  checkLoginStatus();
  loginButton();
  tasksPageStuff.initializeTasksPage();
  $('#show-task-form').on('click', buildAddForm);
};

initializeApp();
