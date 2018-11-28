import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
        $('#tasksPage').hide();
      }).catch((err) => {
        console.error('you are still logged in', err);
      });
    } else {
      $('#auth').hide();
      $('#tasksPage').show();
    }
  });
};

const createNavbar = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">GTD</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" id="navbar-button-auth">Authentication</a>
        </li>
        <div class="form-inline my-2 my-lg-0">
          <input id="inputField" class="form-control mr-sm-2" type="addTask" placeholder="Add New Task" aria-label="AddTask">
        </div>
        <li class="nav-item">
        <a class="nav-link" id="navbar-button-logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  `;
  $('#navbar').html(domString);
  navbarEvents();
};

export default createNavbar;
