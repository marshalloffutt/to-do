import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
        $('#tasks').hide();
        $('#done').hide();
      }).catch((err) => {
        console.error('you are still logged in', err);
      });
    } else if (e.target.id === 'navbar-button-tasks') {
      $('auth').hide();
      $('#done').hide();
      $('#tasks').show();
      $('#logout').show();
    } else if (e.target.id === 'navbar-button-done') {
      $('auth').hide();
      $('#tasks').hide();
      $('#done').show();
      $('#logout').show();
    } else {
      $('#auth').show();
      $('#tasks').hide();
      $('#done').hide();
    }
  });
};

const createNavbar = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">GTD</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" id="navbar-button-auth">Authentication</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="navbar-button-tasks">Tasks</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="navbar-button-done">Done</a>
      </li>    
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
