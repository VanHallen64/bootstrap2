import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Application from './application';

// import i18n (needs to be bundled ;))
import './i18n';

ReactDOM.render(
  <Suspense fallback={<h1>Loading...</h1>}>
  <Application />
  </Suspense>,
  document.getElementById('app')
);
