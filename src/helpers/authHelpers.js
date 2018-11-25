import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#tasksPage').show();
      $('#donePage').hide();
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('#navbar-button-tasks').show();
      $('#navbar-button-done').show();
      $('#navbar-button-logout').show();
    } else {
      $('#tasksPage').hide();
      $('#donePage').hide();
      $('#auth').show();
      $('#navbar-button-auth').hide();
      $('#navbar-button-tasks').hide();
      $('#navbar-button-done').hide();
      $('#navbar-button-logout').hide();
    }
  });
};

export default checkLoginStatus;
