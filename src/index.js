import 'bootstrap';
import './index.scss';
// import $ from 'jquery';
import createNavbar from './components/navbar/navbar';

const initializeApp = () => {
  createNavbar();
};

initializeApp();
