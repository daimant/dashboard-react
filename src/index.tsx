import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './Redux/store';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>,
  document.getElementById('root')
);

reportWebVitals(); // google analise your veb
