import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './Redux/store';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

reportWebVitals(); // google analise your veb
