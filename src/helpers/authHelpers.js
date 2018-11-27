import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#tasksPage').show();
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('#navbar-button-logout').show();
    } else {
      $('#tasksPage').hide();
      $('#auth').show();
      $('#navbar-button-auth').hide();
      $('#navbar-button-logout').hide();
    }
  });
};

export default checkLoginStatus;
